import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import type { HeroMedia } from '../../config/media.ts';
import { NeuralCanvas } from './NeuralCanvas.tsx';

type Variant = 'hero' | 'subtle' | 'band';

interface VideoBackdropProps {
  /** The page's own video and/or photo, from src/config/media.ts */
  media: HeroMedia;
  /**
   * hero   – home hero: brightest, nebula glow, left-weighted veil
   * subtle – inner-page heroes: even veil so centred copy stays crisp
   * band   – full-bleed cinematic strip
   */
  variant?: Variant;
  /** CSS object-position, to frame the subject. */
  focus?: string;
  neural?: boolean;
  scanline?: boolean;
  /** Brand duotone tint over the footage (default on for photos). */
  tint?: boolean;
  /** Override how strongly the footage shows through (0–1). */
  opacity?: number;
}

const MEDIA_OPACITY: Record<Variant, number> = { hero: 0.5, subtle: 0.8, band: 0.7 };

/**
 * Multi-layer backdrop modelled on the Bluenxt digital business card:
 * footage (video, or photo with a slow drift) → brand tint → veil & nebulae
 * → cyber grid → neural canvas → scanline. Parent must be
 * `relative isolate overflow-hidden`.
 */
export const VideoBackdrop: React.FC<VideoBackdropProps> = ({
  media,
  variant = 'subtle',
  focus = 'center',
  neural = false,
  scanline = false,
  tint,
  opacity,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(media.image);
  const mediaOpacity = opacity ?? MEDIA_OPACITY[variant];
  const userPaused = useRef(false);
  const hasVideo = !!media.video && !videoFailed;
  const useTint = tint ?? !hasVideo;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      userPaused.current = true;
      video.pause();
      setPaused(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (userPaused.current) return;
        if (entry.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.05 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [hasVideo]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => undefined);
      setPaused(false);
    } else {
      userPaused.current = true;
      video.pause();
      setPaused(true);
    }
  };

  const filter = 'saturate(1.15) contrast(1.06)';

  return (
    <>
      <div
        aria-hidden="true"
        className={`fx-backdrop fx-backdrop--${variant} absolute inset-0 -z-10 overflow-hidden pointer-events-none`}
      >
        {hasVideo ? (
          <video
            ref={videoRef}
            className="fx-video absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: focus, opacity: mediaOpacity, filter }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={media.poster}
            onError={() => setVideoFailed(true)}
          >
            <source
              src={media.video}
              type={media.video!.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
              onError={() => setVideoFailed(true)}
            />
          </video>
        ) : (
          !imgFailed && (
            <img
              src={imgSrc}
              alt=""
              decoding="async"
              fetchPriority="high"
              onLoad={() => setImgLoaded(true)}
              onError={() =>
                media.imageFallback && imgSrc !== media.imageFallback ? setImgSrc(media.imageFallback) : setImgFailed(true)
              }
              className={`ken-burns absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${imgLoaded ? '' : 'opacity-0'}`}
              style={{
                objectPosition: focus,
                filter: `${filter} grayscale(0.2)`,
                opacity: imgLoaded ? mediaOpacity : 0,
              }}
            />
          )
        )}

        {useTint && <div className="fx-tint absolute inset-0" />}
        <div className="fx-overlay absolute inset-0" />
        <div className="fx-grid absolute inset-0" />
        {neural && <NeuralCanvas density={variant === 'hero' ? 1 : 0.6} />}
        {scanline && <div className="fx-scanline" />}
        <div className="fx-fade-bottom absolute inset-x-0 bottom-0 h-40" />
      </div>

      {hasVideo && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? 'Play background video' : 'Pause background video'}
          className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/60 border border-white/15 backdrop-blur-md text-slate-300 hover:text-white hover:border-cyan-400/50 flex items-center justify-center transition-colors"
        >
          {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </button>
      )}
    </>
  );
};
