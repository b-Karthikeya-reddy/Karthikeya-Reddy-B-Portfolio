"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  phase: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
  cool: boolean;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  trail: { x: number; y: number }[];
};

const FAR = 80;
const MID = 60;
const NEAR = 40;

function makeStars(
  count: number,
  width: number,
  height: number,
  size: number | [number, number],
  alpha: [number, number],
  drift: number,
): Star[] {
  return Array.from({ length: count }, () => {
    const s =
      typeof size === "number"
        ? size
        : size[0] + Math.random() * (size[1] - size[0]);
    // Diagonal drift down-right, scaled by layer
    const angle = Math.PI * 0.15 + Math.random() * 0.2;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: s,
      baseAlpha: alpha[0] + Math.random() * (alpha[1] - alpha[0]),
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.35 + Math.random() * 0.85,
      vx: Math.cos(angle) * drift,
      vy: Math.sin(angle) * drift,
      cool: Math.random() > 0.45,
    };
  });
}

function wrap(star: Star, width: number, height: number) {
  if (star.x > width + 4) star.x = -4;
  if (star.x < -4) star.x = width + 4;
  if (star.y > height + 4) star.y = -4;
  if (star.y < -4) star.y = height + 4;
}

function drawStarLayer(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  t: number,
  animate: boolean,
) {
  for (const star of stars) {
    if (animate) {
      star.x += star.vx;
      star.y += star.vy;
    }
    const twinkle = animate
      ? 0.55 + 0.45 * Math.sin(t * star.twinkleSpeed + star.phase)
      : 1;
    const alpha = star.baseAlpha * twinkle;
    ctx.fillStyle = star.cool
      ? `rgba(180, 200, 255, ${alpha})`
      : `rgba(255, 255, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let far: Star[] = [];
    let mid: Star[] = [];
    let near: Star[] = [];
    let shooting: ShootingStar | null = null;
    let nextShootAt = 0;
    let raf = 0;
    let running = true;

    let targetX = 0;
    let targetY = 0;
    let offsetX = 0;
    let offsetY = 0;

    const scheduleNextShoot = (now: number) => {
      nextShootAt = now + (8000 + Math.random() * 7000);
    };

    const spawnShootingStar = () => {
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft
        ? Math.random() * width * 0.4
        : width * 0.4 + Math.random() * width * 0.5;
      const startY = Math.random() * height * 0.35;
      const duration = 800 + Math.random() * 400; // ms
      const dist = 280 + Math.random() * 220;
      const angle = Math.PI * 0.2 + Math.random() * 0.25; // down-right-ish
      const speed = dist / (duration / 16.67); // px per frame ~60fps
      shooting = {
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : 0.85),
        vy: Math.sin(angle) * speed,
        life: duration,
        maxLife: duration,
        trail: [],
      };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      far = makeStars(FAR, width, height, 1, [0.15, 0.35], 0.1);
      mid = makeStars(MID, width, height, 1.5, [0.35, 0.55], 0.18);
      near = makeStars(NEAR, width, height, [2, 2.5], [0.55, 0.9], 0.28);
    };

    const paintStatic = () => {
      ctx.fillStyle = "#0B0E17";
      ctx.fillRect(0, 0, width, height);
      drawStarLayer(ctx, far, 0, false);
      drawStarLayer(ctx, mid, 0, false);
      drawStarLayer(ctx, near, 0, false);
    };

    const drawShootingStar = (dt: number) => {
      if (!shooting) return;
      shooting.life -= dt;
      shooting.x += shooting.vx * (dt / 16.67);
      shooting.y += shooting.vy * (dt / 16.67);
      shooting.trail.push({ x: shooting.x, y: shooting.y });
      if (shooting.trail.length > 14) shooting.trail.shift();

      const progress = 1 - shooting.life / shooting.maxLife;
      const fade =
        progress < 0.15
          ? progress / 0.15
          : progress > 0.75
            ? (1 - progress) / 0.25
            : 1;

      const trail = shooting.trail;
      if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          const a = trail[i - 1];
          const b = trail[i];
          const t = i / trail.length;
          ctx.strokeStyle = `rgba(230, 235, 255, ${0.08 + t * 0.45 * fade})`;
          ctx.lineWidth = 1 + t * 1.4;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * fade})`;
      ctx.beginPath();
      ctx.arc(shooting.x, shooting.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(180, 200, 255, ${0.35 * fade})`;
      ctx.beginPath();
      ctx.arc(shooting.x, shooting.y, 3.2, 0, Math.PI * 2);
      ctx.fill();

      if (shooting.life <= 0) shooting = null;
    };

    let lastTime = performance.now();

    const draw = (time: number) => {
      if (!running) return;
      const dt = Math.min(32, time - lastTime);
      lastTime = time;

      offsetX += (targetX - offsetX) * 0.08;
      offsetY += (targetY - offsetY) * 0.08;

      ctx.fillStyle = "#0B0E17";
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(offsetX, offsetY);

      const t = time * 0.001;
      drawStarLayer(ctx, far, t, true);
      drawStarLayer(ctx, mid, t, true);
      drawStarLayer(ctx, near, t, true);
      for (const star of far) wrap(star, width, height);
      for (const star of mid) wrap(star, width, height);
      for (const star of near) wrap(star, width, height);

      if (!shooting && time >= nextShootAt) {
        spawnShootingStar();
        scheduleNextShoot(time);
      }
      drawShootingStar(dt);

      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / width - 0.5;
      const ny = e.clientY / height - 0.5;
      targetX = -nx * 8;
      targetY = -ny * 8;
    };

    resize();

    if (reducedMotion) {
      paintStatic();
    } else {
      scheduleNextShoot(performance.now());
      raf = requestAnimationFrame(draw);
      window.addEventListener("mousemove", onMove, { passive: true });
    }

    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
