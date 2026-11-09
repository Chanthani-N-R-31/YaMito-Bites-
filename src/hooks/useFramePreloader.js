import { useState, useEffect, useRef, useCallback } from 'react';
import { BOBA_CONFIG } from '../config/bobaExperience.config';

/**
 * useFramePreloader
 * Two-stage progressive frame loader:
 * 1. Critical Batch (first N frames): Loads with highest priority to unlock canvas interactivity.
 * 2. Background Stream (remaining frames): Streams in small concurrent chunks using createImageBitmap.
 */
export function useFramePreloader() {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isCriticalReady, setIsCriticalReady] = useState(false);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const { totalFrames, criticalThreshold, framePath, fallbackFramePath } = BOBA_CONFIG.sequence;
  const framesRef = useRef(new Array(totalFrames).fill(null));
  const isCancelledRef = useRef(false);

  // Helper to load a single frame with off-thread decoding
  const loadSingleFrame = useCallback(async (index) => {
    if (framesRef.current[index]) return framesRef.current[index];

    const primaryUrl = framePath(index);
    const fallbackUrl = fallbackFramePath ? fallbackFramePath(index) : primaryUrl;

    const tryFetch = async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      if ('createImageBitmap' in window) {
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
    }
  }, [framePath, fallbackFramePath]);

  useEffect(() => {
    isCancelledRef.current = false;
    let mounted = true;

    async function startPreloader() {
      try {
        // STAGE 1: CRITICAL BATCH (Frames 0 to threshold-1)
        const criticalCount = Math.min(criticalThreshold, totalFrames);
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

        // STAGE 2: BACKGROUND STREAMING (Remaining frames)
        const remainingIndices = [];
        for (let i = criticalCount; i < totalFrames; i++) {
          remainingIndices.push(i);
        }

        const CONCURRENCY = 4;
        let cursor = 0;

        const worker = async () => {
          while (cursor < remainingIndices.length && mounted && !isCancelledRef.current) {
            const nextIdx = remainingIndices[cursor++];
            await loadSingleFrame(nextIdx);
            if (mounted) {
              setLoadedCount((prev) => prev + 1);
            }
          }
        };

        const workers = Array.from({ length: Math.min(CONCURRENCY, remainingIndices.length) }, () => worker());
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

  // Robust accessor: Returns exact frame, or nearest available loaded frame
  const getFrame = useCallback((index) => {
    const clampedIndex = Math.max(0, Math.min(index, totalFrames - 1));
    const target = framesRef.current[clampedIndex];
    if (target) return target;

    // Search backward first
    for (let i = clampedIndex - 1; i >= 0; i--) {
      if (framesRef.current[i]) return framesRef.current[i];
    }
    // Search forward
    for (let i = clampedIndex + 1; i < totalFrames; i++) {
      if (framesRef.current[i]) return framesRef.current[i];
    }

    return null;
  }, [totalFrames]);

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

