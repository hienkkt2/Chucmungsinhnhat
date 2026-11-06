import React, { useEffect, useRef, useState } from 'react';

export type HeartDensity = 'gentle' | 'romantic' | 'festive' | 'off';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayOffset: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  color: string;
  type: 'heart' | 'petal' | 'sparkle';
}

interface FallingHeartsCanvasProps {
  density?: HeartDensity;
}

export const FallingHeartsCanvas: React.FC<FallingHeartsCanvasProps> = ({ density = 'romantic' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [clickParticles, setClickParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (density === 'off') {
      particlesRef.current = [];
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCounts: Record<HeartDensity, number> = {
      gentle: 20,
      romantic: 42,
      festive: 75,
      off: 0,
    };

    const count = particleCounts[density];

    const colors = [
      '#f43f5e', // rose-500
      '#fb7185', // rose-400
      '#ec4899', // pink-500
      '#f472b6', // pink-400
      '#fda4af', // rose-300
      '#fbbf24', // amber-400 (gold accents)
      '#fecdd3', // pale rose
      '#e11d48', // crimson
    ];

    const createParticle = (spawnTop: boolean = false): Particle => {
      const types: ('heart' | 'petal' | 'sparkle')[] = ['heart', 'heart', 'petal', 'petal', 'sparkle'];
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        x: Math.random() * width,
        y: spawnTop ? -20 - Math.random() * 50 : Math.random() * height,
        size: type === 'heart' ? 12 + Math.random() * 14 : type === 'petal' ? 8 + Math.random() * 10 : 3 + Math.random() * 4,
        speedY: type === 'heart' ? 0.7 + Math.random() * 1.3 : type === 'petal' ? 0.9 + Math.random() * 1.5 : 0.4 + Math.random() * 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        swayAmplitude: 20 + Math.random() * 35,
        swaySpeed: 0.015 + Math.random() * 0.02,
        swayOffset: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        opacity: 0.35 + Math.random() * 0.55,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
      };
    };

    particlesRef.current = Array.from({ length: count }, () => createParticle(false));

    // Draw functions
    const drawHeart = (c: CanvasRenderingContext2D, size: number, color: string, alpha: number) => {
      c.save();
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // Top left curve
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      // Bottom left curve
      c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.4, 0, size);
      // Bottom right curve
      c.bezierCurveTo(0, (size + topCurveHeight) / 1.4, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      // Top right curve
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    };

    const drawPetal = (c: CanvasRenderingContext2D, size: number, color: string, alpha: number) => {
      c.save();
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(size * 0.6, 0, 0, size);
      c.quadraticCurveTo(-size * 0.6, 0, 0, -size);
      c.fill();
      c.restore();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, size: number, color: string, alpha: number) => {
      c.save();
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.shadowColor = color;
      c.shadowBlur = 6;
      c.beginPath();
      c.arc(0, 0, size / 2, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    let step = 0;
    const render = () => {
      step += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.y += p.speedY;
        p.x += Math.sin(step * p.swaySpeed + p.swayOffset) * 0.6 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 40 || p.x < -60 || p.x > width + 60) {
          particlesRef.current[i] = createParticle(true);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'heart') {
          drawHeart(ctx, p.size, p.color, p.opacity);
        } else if (p.type === 'petal') {
          drawPetal(ctx, p.size, p.color, p.opacity);
        } else {
          drawSparkle(ctx, p.size, p.color, p.opacity);
        }

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [density]);

  // Handle click on screen to emit sweet heart floating ripples
  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newId = Date.now() + Math.random();
    setClickParticles((prev) => [...prev.slice(-6), { id: newId, x: e.clientX, y: e.clientY }]);
    setTimeout(() => {
      setClickParticles((prev) => prev.filter((item) => item.id !== newId));
    }, 1200);
  };

  return (
    <div
      onClick={handleScreenClick}
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {clickParticles.map((pt) => (
        <span
          key={pt.id}
          className="absolute text-xl pointer-events-none animate-ping text-rose-400 select-none"
          style={{
            left: pt.x - 12,
            top: pt.y - 12,
            animationDuration: '900ms',
          }}
        >
          💖
        </span>
      ))}
    </div>
  );
};
