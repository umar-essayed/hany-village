'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!options.repeat) observer.unobserve(el);
        } else if (options.repeat) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.repeat]);

  return { ref, isVisible };
}

export function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - windowHeight / 2;
      setOffset(distanceFromCenter * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
}

export function useMouseGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouse = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--glow-x', `${x}px`);
      el.style.setProperty('--glow-y', `${y}px`);
    };

    el.addEventListener('mousemove', handleMouse);
    return () => el.removeEventListener('mousemove', handleMouse);
  }, []);

  return ref;
}

export function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(startOnView ? 0 : end);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startOnView) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, startOnView]);

  return { ref, count };
}

export function ScrollReveal({ children, className = '', direction = 'up', delay = 0 }) {
  const { ref, isVisible } = useScrollReveal();

  const directionClasses = {
    up: 'reveal-hidden',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
  };

  return (
    <div
      ref={ref}
      className={`${directionClasses[direction] || 'reveal-hidden'} ${isVisible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function StaggerContainer({ children, className = '' }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`stagger-children ${isVisible ? 'reveal-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function ParallaxLayer({ children, speed = 0.3, className = '' }) {
  const { ref, offset } = useParallax(speed);

  return (
    <div
      ref={ref}
      className={`parallax-slow ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
}

export function MagneticButton({ children, className = '', strength = 0.3, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouse = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };

    el.addEventListener('mousemove', handleMouse);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouse);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return (
    <button
      ref={ref}
      className={`magnetic-hover ${className}`}
      style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
      {...props}
    >
      {children}
    </button>
  );
}

export function FloatingParticles({ count = 6, color = 'rgba(212, 165, 116, 0.15)' }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size: (((i * 7 + 3) % 5) + 2),
      left: `${((i * 17 + 11) % 100)}%`,
      delay: ((i * 3 + 1) % 8),
      duration: ((i * 4 + 10) % 10) + 10,
    })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            bottom: '-10px',
            background: color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export function GlowCursor({ containerRef }) {
  const glowRef = useRef(null);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleMouse = (e) => {
      const glow = glowRef.current;
      if (!glow) return;
      const rect = container.getBoundingClientRect();
      glow.style.left = `${e.clientX - rect.left}px`;
      glow.style.top = `${e.clientY - rect.top}px`;
      glow.style.opacity = '1';
    };

    const handleLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };

    container.addEventListener('mousemove', handleMouse);
    container.addEventListener('mouseleave', handleLeave);
    return () => {
      container.removeEventListener('mousemove', handleMouse);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, [containerRef]);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed w-[300px] h-[300px] rounded-full opacity-0 transition-opacity duration-300"
      style={{
        background: 'radial-gradient(circle, rgba(212, 165, 116, 0.06) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        zIndex: 5,
      }}
    />
  );
}
