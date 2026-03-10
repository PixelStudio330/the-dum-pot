"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  life: number;
  speedX: number;
  speedY: number;
  color: string;
  type: "star" | "sparkle" | "emoji";
  emoji?: string;
  angle: number;
}

export default function SparkleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const particles: Particle[] = [];
    
    const colors = [
      "#A35D2B", // Signature Heritage Brown
      "#D4AF37", // Metallic Gold
      "#FF9933", // Deep Saffron
      "#FDFBF0", // The Page Cream
      "#8B9B6A"  // Sage Green Accent
    ];

    const emojis = ["🍲", "✨", "👑"];

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      // Slightly higher spawn rate for a "thicker" royal trail
      const count = Math.random() > 0.6 ? 2 : 1; 
      
      for (let i = 0; i < count; i++) {
        const typeRand = Math.random();
        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 2.2 + 1.8, // SLIGHTLY BIGGER base size
          life: 1,
          speedX: (Math.random() - 0.5) * 1.0, // Small spread
          speedY: (Math.random() - 0.5) * 1.0,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: Math.random() * Math.PI * 2,
          type: typeRand > 0.97 ? "emoji" : typeRand > 0.82 ? "star" : "sparkle",
          emoji: emojis[Math.floor(Math.random() * emojis.length)]
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          Math.cos(((18 + i * 72) / 180) * Math.PI) * r + x,
          -Math.sin(((18 + i * 72) / 180) * Math.PI) * r + y
        );
        ctx.lineTo(
          Math.cos(((54 + i * 72) / 180) * Math.PI) * (r / 2.2) + x,
          -Math.sin(((54 + i * 72) / 180) * Math.PI) * (r / 2.2) + y
        );
      }
      ctx.closePath();
      ctx.fill();
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.01; // Slower fade-out
        p.size *= 0.96; // Slower shrink rate makes them stay "thicker" longer

        if (p.life <= 0 || p.size <= 0.3) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        
        ctx.shadowBlur = 12; // Enhanced glow for the bigger particles
        ctx.shadowColor = p.color;

        if (p.type === "emoji" && p.emoji) {
          ctx.font = `${p.size * 7}px serif`; // Noticeably bigger emojis
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillText(p.emoji, 0, 0);
        } else if (p.type === "star") {
          drawStar(ctx, p.x, p.y, p.size * 2.2); // Thicker stars
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
}