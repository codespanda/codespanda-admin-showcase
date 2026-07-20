import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

/* ── Reveal: fade + slide in on scroll ── */
interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  once?: boolean;
}

export function Reveal({ children, className, delay = 0, direction = "up", once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "";
          if (once) obs.disconnect();
        } else if (!once) {
          delete el.dataset.visible;
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal={direction}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

/* ── Stagger: cascade children in on scroll ── */
interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export function Stagger({ children, className, stagger = 0.08 }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "";
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-stagger
      style={{ "--stagger-ms": `${Math.round(stagger * 1000)}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ── StaggerItem: child of Stagger ── */
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className} data-stagger-item>
      {children}
    </div>
  );
}

/** @deprecated use StaggerItem component instead */
export const staggerItem = {};
