import React, { useEffect, useRef } from 'react';

interface NeuralCanvasProps {
  className?: string;
  /** Rough node density; higher = more nodes. */
  density?: number;
  /** Max link distance in CSS px. */
  linkDistance?: number;
  /** Nodes drift toward the cursor when it is near. */
  interactive?: boolean;
}

type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: string; phase: number };
type Pulse = { from: Node; to: Node; t: number; speed: number };

/**
 * AI neural constellation with travelling data pulses.
 * Sized to its parent, pauses off-screen / in hidden tabs, and renders a single
 * still frame when the visitor prefers reduced motion.
 */
export const NeuralCanvas: React.FC<NeuralCanvasProps> = ({
  className = '',
  density = 1,
  linkDistance = 150,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let visible = true;

    const init = () => {
      const count = Math.round(
        Math.min(60, Math.max(18, (width * height) / 20000)) * density
      );
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.8 + 1,
        hue: Math.random() > 0.45 ? '#38bdf8' : '#2F6BFF',
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
      if (reduced) draw(0, false);
    };

    const draw = (time: number, move: boolean) => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (move) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          if (interactive && pointer.active) {
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            const d = Math.hypot(dx, dy);
            if (d < 180 && d > 5) {
              n.x += (dx / d) * 0.25;
              n.y += (dy / d) * 0.25;
            }
          }
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d < linkDistance) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${((1 - d / linkDistance) * 0.26).toFixed(3)})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
            if (move && pulses.length < 14 && Math.random() < 0.0008) {
              pulses.push({ from: n, to: m, t: 0, speed: 0.014 + Math.random() * 0.018 });
            }
          }
        }
        ctx.globalAlpha = move ? 0.55 + 0.45 * Math.sin(time * 0.0025 + n.phase) : 0.8;
        ctx.fillStyle = n.hue;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.t += pulse.speed;
        if (pulse.t >= 1) {
          pulses.splice(p, 1);
          continue;
        }
        const px = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.t;
        const py = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.t;
        const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
        g.addColorStop(0, 'rgba(255,255,255,0.95)');
        g.addColorStop(0.35, 'rgba(33,213,237,0.75)');
        g.addColorStop(1, 'rgba(33,213,237,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (time: number) => {
      if (visible && !document.hidden) draw(time, true);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
    };

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    resize();
    if (!reduced) {
      raf = requestAnimationFrame(loop);
      if (interactive) window.addEventListener('pointermove', onMove, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, [density, linkDistance, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
};
