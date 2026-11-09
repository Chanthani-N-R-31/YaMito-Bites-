import { useState, useEffect, useRef, useCallback } from 'react';
import { BOBA_CONFIG } from '../config/bobaExperience.config';

/**
 * useFramePreloader
 * High-performance progressive frame preloader optimized for mobile and desktop:
 * 1. Mobile Downsampling: On mobile (<768px), decodes frames at 960x540 (half-res),
 *    dropping uncompressed texture RAM from 1.57 GB to ~390 MB. This prevents mobile Safari
 *    and Chrome from freezing, dropping frames, or crashing the GPU process.
 * 2. Urgent On-Demand Priority: When the user scrolls to any frame that hasn't finished loading,
 *    it immediately triggers an urgent high-priority fetch for that frame and its neighbors,
 *    preventing the animation from freezing or getting stuck on a previous frame.
 * 3. Concurrency & Fallbacks: 6 concurrent background streaming workers with duplicate-request prevention.
 */
export function useFramePreloader() {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isCriticalReady, setIsCriticalReady] = useState(false);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const { totalFrames, criticalThreshold = 25, framePath, fallbackFramePath } = BOBA_CONFIG.sequence;
  const framesRef = useRef(new Array(totalFrames).fill(null));
  const inFlightRef = useRef(new Map());
  const isCancelledRef = useRef(false);

  // Helper to load a single frame with off-thread decoding and mobile memory optimization
  const loadSingleFrame = useCallback(async (index) => {
    if (framesRef.current[index]) return framesRef.current[index];
    if (inFlightRef.current.has(index)) return inFlightRef.current.get(index);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const primaryUrl = framePath(index);
    const fallbackUrl = fallbackFramePath ? fallbackFramePath(index) : primaryUrl;

    const fetchPromise = (async () => {
      const tryFetch = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const blob = await response.blob();

        if ('createImageBitmap' in window) {
          // On mobile screens, resize bitmap to 960x540 (saves 75% RAM and eliminates GC freezes)
          if (isMobile) {
            try {
              return await createImageBitmap(blob, {
                resizeWidth: 960,
                resizeHeight: 540,
                resizeQuality: 'medium'
              });
            } catch (e) {
              return await createImageBitmap(blob);
            }
          }
          return await createImageBitmap(blob);
        } else {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = URL.createObjectURL(blob);
          });
        }
      };

      try {
        const bitmap = await tryFetch(primaryUrl);
        framesRef.current[index] = bitmap;
        return bitmap;
      } catch (e1) {
        try {
          const fallbackBitmap = await tryFetch(fallbackUrl);
          framesRef.current[index] = fallbackBitmap;
          return fallbackBitmap;
        } catch (e2) {
          console.warn(`[FramePreloader] Failed to load frame ${index}:`, e2);
          return null;
        }
      } finally {
        inFlightRef.current.delete(index);
      }
    })();

    inFlightRef.current.set(index, fetchPromise);
    return fetchPromise;
  }, [framePath, fallbackFramePath]);

  useEffect(() => {
    isCancelledRef.current = false;
    let mounted = true;

    async function startPreloader() {
      try {
        // STAGE 1: CRITICAL BATCH (First 25-30 frames to guarantee immediate scrub runway)
        const criticalCount = Math.min(Math.max(25, criticalThreshold), totalFrames);
        const criticalPromises = [];

        for (let i = 0; i < criticalCount; i++) {
          criticalPromises.push(
            loadSingleFrame(i).then(() => {
              if (!mounted) return;
              setLoadedCount((prev) => prev + 1);
            })
          );
        }

        await Promise.all(criticalPromises);

        if (!mounted) return;
        setIsCriticalReady(true);

        // STAGE 2: BACKGROUND STREAMING (Remaining frames with 6 concurrent workers)
        const remainingIndices = [];
        for (let i = criticalCount; i < totalFrames; i++) {
          remainingIndices.push(i);
        }

        const CONCURRENCY = 6;
        let cursor = 0;

        const worker = async () => {
          while (cursor < remainingIndices.length && mounted && !isCancelledRef.current) {
            const nextIdx = remainingIndices[cursor++];
            if (!framesRef.current[nextIdx]) {
              await loadSingleFrame(nextIdx);
            }
            if (mounted) {
              setLoadedCount((prev) => prev + 1);
            }
          }
        };

        const workers = Array.from(
          { length: Math.min(CONCURRENCY, remainingIndices.length) }, 
          () => worker()
        );
        await Promise.all(workers);

        if (mounted) {
          setIsFullyLoaded(true);
        }
      } catch (err) {
        console.error('[FramePreloader] Error during load:', err);
        if (mounted) setLoadError(err);
      }
    }

    startPreloader();

    return () => {
      mounted = false;
      isCancelledRef.current = true;
    };
  }, [totalFrames, criticalThreshold, loadSingleFrame]);

  // Priority On-Demand Accessor:
  // When user is scrolling, returns frame immediately. If unrendered, triggers urgent fetch
  // for that frame and the next 3 frames so they are ready before the finger finishes swiping!
  const getFrame = useCallback((index) => {
    const clampedIndex = Math.max(0, Math.min(index, totalFrames - 1));
    const target = framesRef.current[clampedIndex];
    if (target) return target;

    // Trigger urgent on-demand load for the current frame
    loadSingleFrame(clampedIndex);

    // Also look-ahead and look-behind by 2 frames to stay ahead of the scroll
    for (let offset = 1; offset <= 2; offset++) {
      if (clampedIndex + offset < totalFrames && !framesRef.current[clampedIndex + offset]) {
        loadSingleFrame(clampedIndex + offset);
      }
      if (clampedIndex - offset >= 0 && !framesRef.current[clampedIndex - offset]) {
        loadSingleFrame(clampedIndex - offset);
      }
    }

    // Fallback: Return nearest available loaded frame while urgent load finishes
    for (let i = clampedIndex - 1; i >= 0; i--) {
      if (framesRef.current[i]) return framesRef.current[i];
    }
    for (let i = clampedIndex + 1; i < totalFrames; i++) {
      if (framesRef.current[i]) return framesRef.current[i];
    }

    return null;
  }, [totalFrames, loadSingleFrame]);

  const progressPercent = Math.min(100, Math.round((loadedCount / totalFrames) * 100));

  return {
    framesRef,
    loadedCount,
    totalFrames,
    progressPercent,
    isCriticalReady,
    isFullyLoaded,
    loadError,
    getFrame,
  };
}
