'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { soundEngine } from '@/lib/sound-engine';

interface BrandCanvas3DProps {
  primaryColor?: string;
  secondaryColor?: string;
  brandName?: string;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  origX: number;
  origY: number;
  origZ: number;
}

export const BrandCanvas3D: React.FC<BrandCanvas3DProps> = ({
  primaryColor = '#6366F1',
  secondaryColor = '#10B981',
  brandName = 'BrandForge',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [geometryMode, setGeometryMode] = useState<'polyhedron' | 'synapse' | 'matrix'>('polyhedron');
  const rotationSpeed = 0.008;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angleX = 0;
    let angleY = 0;
    let targetAngleX = 0;
    let targetAngleY = 0;

    // Handle canvas dimensions with Retina DPI
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse rotation interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;
      targetAngleY = (mouseX / (rect.width / 2)) * 1.2;
      targetAngleX = -(mouseY / (rect.height / 2)) * 1.2;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Initialize 3D Vertices based on geometry mode
    const numPoints = geometryMode === 'polyhedron' ? 36 : geometryMode === 'synapse' ? 48 : 64;
    const radius = Math.min(canvas.clientWidth, canvas.clientHeight) * 0.32;
    const points: Point3D[] = [];

    // Golden spiral distribution on sphere
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radAtY;
      const z = Math.sin(theta) * radAtY;

      points.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        origX: x * radius,
        origY: y * radius,
        origZ: z * radius,
      });
    }

    // Main 3D Render Loop
    let time = 0;
    const render = () => {
      time += 0.02;
      angleX += (targetAngleX - angleX) * 0.05 + rotationSpeed * 0.5;
      angleY += (targetAngleY - angleY) * 0.05 + rotationSpeed;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 340;

      ctx.clearRect(0, 0, width, height);

      // Radial background glow
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius * 1.5);
      bgGrad.addColorStop(0, `${primaryColor}22`);
      bgGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Transform 3D points
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected = points.map((p, idx) => {
        // Subtle pulsation
        const pulse = 1 + Math.sin(time + idx * 0.2) * 0.06;
        const px = p.origX * pulse;
        const py = p.origY * pulse;
        const pz = p.origZ * pulse;

        // Y rotation
        const x1 = px * cosY - pz * sinY;
        const z1 = pz * cosY + px * sinY;

        // X rotation
        const y2 = py * cosX - z1 * sinX;
        const z2 = z1 * cosX + py * sinX;

        // Perspective projection
        const scale = fov / (fov + z2 + 100);
        const screenX = centerX + x1 * scale;
        const screenY = centerY + y2 * scale;
        const alpha = Math.max(0.15, Math.min(1.0, (z2 + radius) / (2 * radius)));

        return { screenX, screenY, z2, alpha, scale };
      });

      // Draw connecting edges
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].screenX - projected[j].screenX;
          const dy = projected[i].screenY - projected[j].screenY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = geometryMode === 'polyhedron' ? radius * 0.7 : radius * 0.55;
          if (dist < maxDist) {
            const edgeAlpha = (1 - dist / maxDist) * 0.45 * Math.min(projected[i].alpha, projected[j].alpha);
            ctx.strokeStyle = i % 2 === 0 ? primaryColor : secondaryColor;
            ctx.globalAlpha = edgeAlpha;
            ctx.beginPath();
            ctx.moveTo(projected[i].screenX, projected[i].screenY);
            ctx.lineTo(projected[j].screenX, projected[j].screenY);
            ctx.stroke();
          }
        }
      }

      // Draw vertex nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const nodeRadius = Math.max(1.8, 3.5 * p.scale);

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = i % 3 === 0 ? '#FFFFFF' : i % 2 === 0 ? primaryColor : secondaryColor;

        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw central glowing emblem core
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(brandName.charAt(0), centerX, centerY);

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [primaryColor, secondaryColor, brandName, geometryMode, rotationSpeed]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#060810] transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl backdrop-blur-xl' : 'h-80 w-full'
      }`}
    >
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating Control Overlay */}
      <div className="absolute top-3 left-3 flex items-center space-x-2">
        <span className="flex items-center space-x-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-semibold text-slate-200 border border-white/10">
          <Sparkles className="h-3 w-3 text-indigo-400" />
          <span>Interactive 3D Brand Field</span>
        </span>
      </div>

      <div className="absolute top-3 right-3 flex items-center space-x-1.5">
        {/* Geometry Switcher */}
        <div className="flex rounded-lg bg-black/60 backdrop-blur-md p-1 border border-white/10 text-[10px]">
          <button
            onClick={() => {
              setGeometryMode('polyhedron');
              soundEngine.playClick();
            }}
            className={`rounded px-2 py-0.5 font-medium transition-all ${
              geometryMode === 'polyhedron' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Polyhedron
          </button>
          <button
            onClick={() => {
              setGeometryMode('synapse');
              soundEngine.playClick();
            }}
            className={`rounded px-2 py-0.5 font-medium transition-all ${
              geometryMode === 'synapse' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Synapse
          </button>
          <button
            onClick={() => {
              setGeometryMode('matrix');
              soundEngine.playClick();
            }}
            className={`rounded px-2 py-0.5 font-medium transition-all ${
              geometryMode === 'matrix' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Matrix
          </button>
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => {
            setIsFullscreen(!isFullscreen);
            soundEngine.playClick();
          }}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 backdrop-blur-md text-slate-300 hover:bg-slate-800 border border-white/10 transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Expand 3D Canvas'}
        >
          {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-3 left-3 text-[10px] text-slate-400 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none">
        Move mouse to rotate 3D particle constellation in real-time
      </div>
    </div>
  );
};
