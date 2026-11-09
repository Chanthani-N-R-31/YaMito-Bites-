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

  // Map scroll progress (0..0.85) to frame indices (0..totalFrames - 1)
  // Leaves 15% scroll runway at the bottom so the final exploded reveal holds and is fully viewed
  // without the next section prematurely covering it!
  const rawFrameIndex = useTransform(scrollYProgress, [0, 0.85], [0, totalFrames - 1], { clamp: true });
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

    // Responsive non-clipping framing:
    // Ensures the straw, dome lid, exploding boba/shards, and cup base
    // are NEVER cut off at the top or bottom on any screen resolution!
    const isMobilePortrait = canvas.width < 768 * dpr && canvas.height > canvas.width;

    let scale, renderW, renderH, dx, dy;

    if (isMobilePortrait) {
      // Mobile portrait: fit height 100% and center horizontally
      scale = canvas.height / imgH;
      renderW = Math.round(imgW * scale);
      renderH = Math.round(imgH * scale);
      dx = Math.round((canvas.width - renderW) * 0.5);
      dy = 0;
    } else {
      // Landscape desktop/laptop:
      // Provide clearance below the navbar and above the bottom edge
      // so neither the straw tip nor the cup bottom base is ever clipped!
      const topClearance = Math.round(28 * dpr);
      const bottomClearance = Math.round(20 * dpr);
      const availableHeight = canvas.height - topClearance - bottomClearance;

      scale = Math.min(canvas.width / (imgW * 0.65), availableHeight / imgH);
      renderW = Math.round(imgW * scale);
      renderH = Math.round(imgH * scale);
      dx = Math.round((canvas.width - renderW) * 0.5);
      dy = topClearance + Math.round((availableHeight - renderH) * 0.5);
    }

    // Render frame
    ctx.drawImage(img, dx, dy, renderW, renderH);

    // If there is lateral canvas space on wide landscape displays,
    // softly feather the outer edges into the studio background
    // to guarantee an invisibly seamless blend with zero harsh lines.
    if (dx > 0) {
      const featherW = Math.min(Math.round(48 * dpr), renderW * 0.08);

      // Left edge feather
      const leftGrad = ctx.createLinearGradient(dx, 0, dx + featherW, 0);
      leftGrad.addColorStop(0, bgColor);
      leftGrad.addColorStop(1, 'rgba(200, 195, 183, 0)');
      ctx.fillStyle = leftGrad;
      ctx.fillRect(dx - 1, dy, featherW + 1, renderH);

      // Right edge feather
      const rightGrad = ctx.createLinearGradient(dx + renderW - featherW, 0, dx + renderW, 0);
      rightGrad.addColorStop(0, 'rgba(200, 195, 183, 0)');
      rightGrad.addColorStop(1, bgColor);
      ctx.fillStyle = rightGrad;
      ctx.fillRect(dx + renderW - featherW, dy, featherW + 1, renderH);

      // Top / bottom gentle feather
      if (dy > 0) {
        const featherH = Math.min(Math.round(20 * dpr), dy);
        const topGrad = ctx.createLinearGradient(0, dy, 0, dy + featherH);
        topGrad.addColorStop(0, bgColor);
        topGrad.addColorStop(1, 'rgba(200, 195, 183, 0)');
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, dy - 1, canvas.width, featherH + 1);

        const bottomGrad = ctx.createLinearGradient(0, dy + renderH - featherH, 0, dy + renderH);
        bottomGrad.addColorStop(0, 'rgba(200, 195, 183, 0)');
        bottomGrad.addColorStop(1, bgColor);
        ctx.fillStyle = bottomGrad;
        ctx.fillRect(0, dy + renderH - featherH, canvas.width, featherH + 2);
      }
    }
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
