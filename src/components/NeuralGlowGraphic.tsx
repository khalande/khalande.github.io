import React, { useEffect, useRef } from 'react';

interface NeuralGlowGraphicProps {
  className?: string;
  variant?: 'brain' | 'orbit' | 'stream';
}

export const NeuralGlowGraphic: React.FC<NeuralGlowGraphicProps> = ({
  className = '',
  variant = 'brain'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate nodes
    const nodeCount = variant === 'orbit' ? 36 : 48;
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      layer: number;
      orbitAngle?: number;
      orbitDist?: number;
      pulse: number;
    }[] = [];

    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < nodeCount; i++) {
      if (variant === 'orbit') {
        const angle = (i / nodeCount) * Math.PI * 2;
        const dist = 60 + Math.random() * 140;
        nodes.push({
          x: centerX + Math.cos(angle) * dist,
          y: centerY + Math.sin(angle) * dist * 0.65,
          vx: 0,
          vy: 0,
          radius: 1.5 + Math.random() * 2.5,
          baseAlpha: 0.4 + Math.random() * 0.5,
          layer: i % 3,
          orbitAngle: angle,
          orbitDist: dist,
          pulse: Math.random() * Math.PI
        });
      } else {
        // Brain / neural cluster shape
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.pow(Math.random(), 0.7) * 160;
        const xOffset = Math.cos(angle) * dist * 1.3;
        const yOffset = Math.sin(angle) * dist * 0.9;
        nodes.push({
          x: centerX + xOffset,
          y: centerY + yOffset,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: 1.5 + Math.random() * 2.8,
          baseAlpha: 0.3 + Math.random() * 0.6,
          layer: i % 4,
          pulse: Math.random() * Math.PI
        });
      }
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Ambient radial gradient
      const radial = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.min(width, height) * 0.7
      );
      radial.addColorStop(0, 'rgba(33, 213, 237, 0.12)');
      radial.addColorStop(0.4, 'rgba(60, 131, 246, 0.08)');
      radial.addColorStop(1, 'rgba(11, 17, 30, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Update positions
      nodes.forEach((node) => {
        if (variant === 'orbit' && node.orbitAngle !== undefined && node.orbitDist !== undefined) {
          node.orbitAngle += 0.004 * (node.layer + 1);
          node.x = width / 2 + Math.cos(node.orbitAngle) * node.orbitDist;
          node.y = height / 2 + Math.sin(node.orbitAngle) * (node.orbitDist * 0.6);
        } else {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < width / 2 - 200 || node.x > width / 2 + 200) node.vx *= -1;
          if (node.y < height / 2 - 150 || node.y > height / 2 + 150) node.vy *= -1;
        }
        node.pulse += 0.03;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = variant === 'orbit' ? 85 : 75;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(60, 131, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const pulseFactor = Math.sin(node.pulse) * 0.4 + 0.8;
        const r = node.radius * pulseFactor;
        const alpha = Math.min(1, Math.max(0.2, node.baseAlpha * pulseFactor));

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(33, 213, 237, ${alpha * 0.3})`;
        ctx.fill();

        // Inner core
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 250, 252, ${alpha * 0.9})`;
        ctx.fill();
      });

      // Central core hologram ring
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 45 + Math.sin(time) * 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(33, 213, 237, 0.4)';
      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [variant]);

  return (
    <div className={`relative overflow-hidden pointer-events-none select-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
