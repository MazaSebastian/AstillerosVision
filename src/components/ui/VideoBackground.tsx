"use client";

import { useRef, useEffect } from "react";

interface VideoBackgroundProps {
  src: string;
  fadeDuration?: number;
}

export default function VideoBackground({ src, fadeDuration = 1.5 }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const overlay = fadeOverlayRef.current;
    if (!video || !overlay) return;

    let rafId: number;

    const tick = () => {
      if (video.duration) {
        const { currentTime, duration } = video;
        let overlayOpacity = 0;
        if (currentTime < fadeDuration) {
          overlayOpacity = 1 - currentTime / fadeDuration;
        } else if (currentTime > duration - fadeDuration) {
          overlayOpacity = 1 - (duration - currentTime) / fadeDuration;
        }
        overlay.style.opacity = String(overlayOpacity);
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [fadeDuration]);

  return (
    <div className="fixed inset-0 -z-20">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover blur-[4px] scale-105"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-dark-950/80" />
      <div ref={fadeOverlayRef} className="absolute inset-0 bg-black" style={{ opacity: 1 }} />
    </div>
  );
}
