import React, { useRef, useEffect, useCallback } from 'react';
import { useTransform, useSpring } from 'framer-motion';
import { BOBA_CONFIG } from '../../config/bobaExperience.config';

/**
 * ScrollyCanvas
 * High-performance canvas rendering engine.
 * Framed with generous top clearance so the straw, dome, and exploding boba
 * are never clipped by the navigation bar or viewport edges.
 * Seamless warm light cream studio background (#EEEBDC) matching the new 1080p frames.
 */
export default function ScrollyCanvas({ scrollYProgress, getFrame, isCriticalReady }) {
  const canvasRef = useRef(null);
  const currentFrameRef = useRef(-1);
  const rafIdRef = useRef(null);

  const { totalFrames, focalPoint } = BOBA_CONFIG.sequence;
  const { spring } = BOBA_CONFIG.scroll;
  const bgColor = BOBA_CONFIG.brand.colors.creamStudio; // #EEEBDC

  // Map scroll progress (0..1) to frame indices (0..totalFrames - 1)
  const rawFrameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);
  // Smooth spring physics for fluid momentum without snapping
  const smoothFrameIndex = useSpring(rawFrameIndex, spring);

  // Core render function with maximum sharpness settings
  const renderFrame = useCallback(() => {
    rafIdRef.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Use device pixel ratio (clamped to 2) for razor-sharp rendering on Retina displays
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (displayWidth === 0 || displayHeight === 0) return;

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    // High quality bicubic smoothing for clean rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Fill seamless warm cream studio background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Retrieve loaded frame
    const frameIndex = currentFrameRef.current >= 0 ? currentFrameRef.current : 0;
    const img = getFrame(frameIndex);

    if (!img) return;

    const imgW = img.width || BOBA_CONFIG.sequence.frameWidth;
    const imgH = img.height || BOBA_CONFIG.sequence.frameHeight;

    // True edge-to-edge screen cover: scale MUST be >= scaleX and >= scaleY
    // This guarantees renderW >= canvas.width and renderH >= canvas.height at all times,
    // completely eliminating side gaps, pillars, and letterboxing across all displays.
    const scale = Math.max(canvas.width / imgW, canvas.height / imgH);

    const renderW = Math.round(imgW * scale);
    const renderH = Math.round(imgH * scale);

    // Horizontal centering: (canvas.width - renderW) is <= 0, centering horizontal overflow symmetrically
    const dx = Math.round((canvas.width - renderW) * 0.5);

    // Vertical positioning:
    // When screen is wider than 16:9 (e.g. desktop/laptop), renderH is taller than canvas.height.
    // We pin dy close to 0 so the straw, dome lid, and cup are always gracefully in view.
    let dy = 0;
    if (canvas.height > renderH) {
      dy = Math.round((canvas.height - renderH) * 0.5);
    } else {
      dy = Math.max(Math.round((canvas.height - renderH) * 0.15), Math.round(-25 * dpr * scale));
    }

    // Render frame edge-to-edge
    ctx.drawImage(img, dx, dy, renderW, renderH);
  }, [getFrame, bgColor]);

  const requestRender = useCallback(() => {
    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(renderFrame);
    }
  }, [renderFrame]);

  // Framer Motion spring listener
  useEffect(() => {
    const unsubscribe = smoothFrameIndex.on('change', (latest) => {
      const nextIndex = Math.max(0, Math.min(Math.round(latest), totalFrames - 1));
      if (nextIndex !== currentFrameRef.current) {
        currentFrameRef.current = nextIndex;
        requestRender();
      }
    });

    return () => {
      unsubscribe();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [smoothFrameIndex, totalFrames, requestRender]);

  // Window resize observer
  useEffect(() => {
    const handleResize = () => {
      requestRender();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [requestRender]);

  // Initial draw
  useEffect(() => {
    if (isCriticalReady) {
      currentFrameRef.current = 0;
      requestRender();
    }
  }, [isCriticalReady, requestRender]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover select-none pointer-events-none"
        style={{
          backgroundColor: bgColor,
        }}
      />
    </div>
  );
}
