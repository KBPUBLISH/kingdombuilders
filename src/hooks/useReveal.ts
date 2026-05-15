import { useEffect, useRef, useState } from "react";

/**
 * Returns `[ref, visible]`. `visible` flips to `true` the first time the
 * element enters the viewport. Useful for one-shot entrance animations
 * triggered as the user scrolls each section into view.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        }
      },
      options,
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return [ref, visible];
}

/**
 * Returns a CSS `translateY` value driven by how far the element is from the
 * center of the viewport. Used for parallax backgrounds and floating covers.
 * `strength` is a multiplier — 0.15 is subtle, 0.4 is bold.
 */
export function useParallaxOffset<T extends HTMLElement = HTMLElement>(
  strength = 0.18,
): [React.RefObject<T | null>, number] {
  const ref = useRef<T | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let ticking = false;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportH / 2;
      const distance = elementCenter - viewportCenter;
      setOffset(-distance * strength);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(compute);
      }
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return [ref, offset];
}
