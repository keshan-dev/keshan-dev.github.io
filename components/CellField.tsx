"use client";

import { useEffect, useRef } from "react";

// Animated backdrop: a grid of isolated cells with traffic moving between
// them. Every few seconds one cell faults (orange) and is quarantined
// (dashed ring) before it recovers. Renders one still frame when the user
// prefers reduced motion, and pauses while off screen or in a hidden tab.

const CELL = 46;
const GAP = 8;
const FAULT_EVERY_MS = 3200;
const FAULT_LIFE_MS = 4200;
const PACKET_COUNT = 22;
const SIGNAL = "255, 90, 31";
const GRAIN_SIZE = 160;
const GRAIN_ALPHA = 0.16;

type Packet = { x: number; y: number; dx: number; dy: number; speed: number };
type Fault = { col: number; row: number; born: number };

export default function CellField({ className = "", grain = false }: { className?: string; grain?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let packets: Packet[] = [];
    let faults: Fault[] = [];
    let lastFault = 0;
    let frame = 0;
    let visible = true;

    const pitch = CELL + GAP;
    const grainPattern = grain ? makeGrain(ctx) : null;

    function spawnPacket(): Packet {
      const horizontal = Math.random() > 0.5;
      const dir = Math.random() > 0.5 ? 1 : -1;
      // Packets ride the gutters between cells.
      const lane = (n: number) => Math.floor(Math.random() * n) * pitch - GAP / 2;
      return horizontal
        ? { x: Math.random() * width, y: lane(rows + 1), dx: dir, dy: 0, speed: 0.6 + Math.random() * 1.2 }
        : { x: lane(cols + 1), y: Math.random() * height, dx: 0, dy: dir, speed: 0.6 + Math.random() * 1.2 };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / pitch) + 1;
      rows = Math.ceil(height / pitch) + 1;
      packets = Array.from({ length: PACKET_COUNT }, spawnPacket);
    }

    function roundRect(x: number, y: number, w: number, h: number, r: number) {
      ctx!.beginPath();
      ctx!.roundRect(x, y, w, h, r);
    }

    function draw(now: number) {
      const bg = ctx!.createRadialGradient(width * 0.62, height * 0.38, 0, width * 0.62, height * 0.38, Math.max(width, height) * 0.85);
      bg.addColorStop(0, "#1f56b8");
      bg.addColorStop(0.55, "#123c8c");
      bg.addColorStop(1, "#091a40");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, width, height);

      if (grainPattern) {
        ctx!.save();
        ctx!.globalCompositeOperation = "overlay";
        ctx!.globalAlpha = GRAIN_ALPHA;
        ctx!.fillStyle = grainPattern;
        ctx!.fillRect(0, 0, width, height);
        ctx!.restore();
      }

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          // Slow per-cell shimmer reads as "healthy and live".
          const shimmer = reduceMotion ? 0 : Math.sin(now / 1400 + c * 0.7 + r * 1.3) * 0.015;
          roundRect(c * pitch, r * pitch, CELL, CELL, 7);
          ctx!.fillStyle = `rgba(255,255,255,${0.06 + shimmer})`;
          ctx!.fill();
          ctx!.strokeStyle = "rgba(255,255,255,0.12)";
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
      }

      for (const p of packets) {
        const tail = 26;
        const grad = ctx!.createLinearGradient(p.x - p.dx * tail, p.y - p.dy * tail, p.x, p.y);
        grad.addColorStop(0, "rgba(207,224,255,0)");
        grad.addColorStop(1, "rgba(207,224,255,0.75)");
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(p.x - p.dx * tail, p.y - p.dy * tail);
        ctx!.lineTo(p.x, p.y);
        ctx!.stroke();
      }

      for (const f of faults) {
        const age = (now - f.born) / FAULT_LIFE_MS;
        const x = f.col * pitch;
        const y = f.row * pitch;
        // Rise fast, hold, fade out.
        const heat = age < 0.15 ? age / 0.15 : age > 0.7 ? 1 - (age - 0.7) / 0.3 : 1;
        ctx!.save();
        ctx!.shadowColor = `rgba(${SIGNAL},${0.9 * heat})`;
        ctx!.shadowBlur = 28;
        roundRect(x, y, CELL, CELL, 7);
        ctx!.fillStyle = `rgba(${SIGNAL},${0.85 * heat})`;
        ctx!.fill();
        ctx!.restore();
        if (age > 0.3) {
          ctx!.setLineDash([4, 4]);
          ctx!.strokeStyle = `rgba(${SIGNAL},${0.8 * heat})`;
          ctx!.lineWidth = 1.5;
          roundRect(x - 5, y - 5, CELL + 10, CELL + 10, 11);
          ctx!.stroke();
          ctx!.setLineDash([]);
        }
      }
    }

    function step(now: number) {
      for (const p of packets) {
        p.x += p.dx * p.speed;
        p.y += p.dy * p.speed;
        if (p.x < -40 || p.x > width + 40 || p.y < -40 || p.y > height + 40) {
          Object.assign(p, spawnPacket());
        }
      }
      if (now - lastFault > FAULT_EVERY_MS) {
        lastFault = now;
        faults.push({
          col: Math.floor(Math.random() * cols),
          row: Math.floor(Math.random() * rows),
          born: now,
        });
      }
      faults = faults.filter((f) => now - f.born < FAULT_LIFE_MS);
    }

    function loop(now: number) {
      step(now);
      draw(now);
      frame = requestAnimationFrame(loop);
    }

    function start() {
      cancelAnimationFrame(frame);
      if (reduceMotion) {
        // Still frame with one quarantined cell held at full strength.
        const now = performance.now();
        faults = [{ col: Math.floor(cols * 0.7), row: Math.floor(rows * 0.35), born: now - FAULT_LIFE_MS * 0.5 }];
        draw(now);
        return;
      }
      if (visible && !document.hidden) frame = requestAnimationFrame(loop);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      start();
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    intersection.observe(canvas);

    const onVisibility = () => (document.hidden ? cancelAnimationFrame(frame) : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [grain]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}

// Film grain drawn into the canvas itself. A CSS blend layer over a canvas that
// redraws every frame forces a full-screen composite per frame; this is one
// pattern fill.
function makeGrain(ctx: CanvasRenderingContext2D) {
  const tile = document.createElement("canvas");
  tile.width = tile.height = GRAIN_SIZE;
  const tctx = tile.getContext("2d");
  if (!tctx) return null;
  const img = tctx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  tctx.putImageData(img, 0, 0);
  return ctx.createPattern(tile, "repeat");
}
