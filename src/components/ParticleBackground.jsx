import { useEffect, useRef } from 'react';

const ParticleBackground = ({ type = 'stars', accent = '#818cf8' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Parse accent hex to rgba
    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };
    const rgb = hexToRgb(accent.padEnd(7, '0'));

    let particles = [];

    const createParticles = () => {
      particles = [];
      const count = type === 'rain' ? 120 : type === 'snow' ? 80 : type === 'stars' ? 100 : 30;
      for (let i = 0; i < count; i++) {
        particles.push(newParticle());
      }
    };

    const newParticle = (fromTop = false) => {
      const base = {
        x: Math.random() * canvas.width,
        y: fromTop ? -10 : Math.random() * canvas.height,
      };
      if (type === 'rain') return { ...base, vx: -1, vy: 10 + Math.random() * 8, length: 15 + Math.random() * 15, alpha: 0.3 + Math.random() * 0.4 };
      if (type === 'snow') return { ...base, vx: (Math.random() - 0.5) * 0.5, vy: 0.5 + Math.random() * 1.5, r: 1 + Math.random() * 3, alpha: 0.4 + Math.random() * 0.5, wobble: Math.random() * Math.PI * 2 };
      if (type === 'stars') return { ...base, r: Math.random() * 1.5 + 0.3, alpha: Math.random(), pulse: Math.random() * Math.PI * 2, speed: 0.005 + Math.random() * 0.01 };
      if (type === 'clouds') return { ...base, vx: 0.2 + Math.random() * 0.4, r: 40 + Math.random() * 60, alpha: 0.03 + Math.random() * 0.05 };
      if (type === 'sunny') return { ...base, r: 1 + Math.random() * 2, alpha: 0.2 + Math.random() * 0.5, pulse: Math.random() * Math.PI * 2, speed: 0.02 + Math.random() * 0.03 };
      return base;
    };

    createParticles();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { r, g, b } = rgb;

      particles.forEach((p, i) => {
        if (type === 'rain') {
          ctx.save();
          ctx.strokeStyle = `rgba(${r},${g},${b},${p.alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 3, p.y + p.length);
          ctx.stroke();
          ctx.restore();
          p.x += p.vx; p.y += p.vy;
          if (p.y > canvas.height + 20) particles[i] = newParticle(true);

        } else if (type === 'snow') {
          p.wobble += 0.02;
          ctx.beginPath();
          ctx.arc(p.x + Math.sin(p.wobble) * 2, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
          ctx.fill();
          p.x += p.vx; p.y += p.vy;
          if (p.y > canvas.height + 10) particles[i] = newParticle(true);

        } else if (type === 'stars') {
          p.pulse += p.speed;
          const a = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
          ctx.fill();

        } else if (type === 'clouds') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
          ctx.fill();
          p.x += p.vx;
          if (p.x - p.r > canvas.width) { p.x = -p.r; p.y = Math.random() * canvas.height; }

        } else if (type === 'sunny') {
          p.pulse += p.speed;
          const a = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [type, accent]);

  return <canvas ref={canvasRef} className="particle-canvas" />;
};

export default ParticleBackground;
