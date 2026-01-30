"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Slide = { src: string; alt: string };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Carousel({
  images,
  intervalMs = 3000
}: {
  images: Slide[];
  intervalMs?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const safeImages = useMemo(() => images.filter(Boolean), [images]);

  const [idx, setIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);

  const goTo = (next: number) => {
    if (safeImages.length === 0) return;
    setIdx(clamp(next, 0, safeImages.length - 1));
  };

  const next = () => {
    if (safeImages.length <= 1) return;
    setIdx((v) => (v + 1) % safeImages.length);
  };

  const prev = () => {
    if (safeImages.length <= 1) return;
    setIdx((v) => (v - 1 + safeImages.length) % safeImages.length);
  };

  useEffect(() => {
    if (safeImages.length <= 1) return;
    if (isDragging) return;

    const id = window.setInterval(() => next(), intervalMs);
    return () => window.clearInterval(id);
  }, [safeImages.length, intervalMs, isDragging]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (safeImages.length <= 1) return;

    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    pointerIdRef.current = e.pointerId;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);

    setIsDragging(true);
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    setDragX(0);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    if (pointerIdRef.current !== e.pointerId) return;

    const dx = e.clientX - startXRef.current;
    lastXRef.current = e.clientX;
    setDragX(clamp(dx, -260, 260));
  };

  const onPointerUpOrCancel = (e: React.PointerEvent) => {
    if (!isDragging) return;
    if (pointerIdRef.current !== e.pointerId) return;

    const width = containerRef.current?.clientWidth ?? 1;
    const threshold = Math.max(60, Math.floor(width * 0.12));
    const dx = lastXRef.current - startXRef.current;

    setIsDragging(false);
    pointerIdRef.current = null;
    setDragX(0);

    if (Math.abs(dx) >= threshold) {
      if (dx < 0) next();
      else prev();
    }
  };

  return (
    <section className="carouselSection" aria-label="Carousel de imagens">
      <div
        ref={containerRef}
        className={`carouselFrame ${reducedMotion ? "reduced" : ""} ${isDragging ? "isDragging" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUpOrCancel}
        onPointerCancel={onPointerUpOrCancel}
        role="group"
        aria-roledescription="carousel"
        aria-label="Slides"
      >
        {safeImages.map((img, i) => {
          const isActive = i === idx;
          return (
            <div
              key={`${img.src}-${i}`}
              className={`carouselSlide ${isActive ? "isActive" : ""}`}
              aria-hidden={!isActive}
              style={{
                transform: `translateX(${(i - idx) * 100}%) translateX(${isActive ? dragX : 0}px)`
              }}
            >
              <div
                className="carouselBg"
                role="img"
                aria-label={img.alt}
                style={{ backgroundImage: `url(${img.src})` }}
              />
            </div>
          );
        })}

        {safeImages.length > 1 && (
          <div className="carouselUi" aria-label="Controles do carousel">
            <button className="iconBtn" onClick={prev} aria-label="Slide anterior" type="button">
              ‹
            </button>

            <div className="dots" aria-label="Indicadores">
              {safeImages.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === idx ? "isOn" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Ir para slide ${i + 1}`}
                  aria-current={i === idx}
                  type="button"
                />
              ))}
            </div>

            <button className="iconBtn" onClick={next} aria-label="Próximo slide" type="button">
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
