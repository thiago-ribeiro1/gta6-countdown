"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ControlParallax3D() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const pin = pinRef.current;
    const img = imgRef.current;
    if (!section || !pin || !img) return;

    gsap.set(pin, { transformPerspective: 600 }); // perspectiva 3D do pin

    gsap.set(img, {
      // estado inicial
      transformOrigin: "50% 50%",
      rotateX: -6,
      rotateY: -6,
      rotateZ: 0,
      scale: 0.85,
      z: -120
    });

    const tl = gsap.timeline({
      // linha do tempo da animação
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: pin,
        pinSpacing: false
      }
    });

    tl.to(
      // primeira etapa da animação
      img,
      {
        rotateY: 18,
        rotateX: -12,
        rotateZ: 1.6,
        scale: 1.32,
        z: 80,
        ease: "none"
      },
      0
    );

    tl.to(
      // segunda etapa da animação
      img,
      {
        rotateY: 10,
        rotateX: -6,
        rotateZ: 0.6,
        scale: 1.12,
        z: 20,
        ease: "none"
      },
      0.7
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="parallax3dSection" aria-label="Parallax 3D do controle">
      <div ref={pinRef} className="parallax3dPin" aria-hidden="true">
        <div className="parallax3dScene">
          <div className="parallax3dGlow" />
          <img ref={imgRef} className="parallax3dImg" src="/controller.png" alt="" />
        </div>
      </div>
    </section>
  );
}
