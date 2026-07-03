'use client'


import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxSection({
  image,
  children,
  overlay = 0.45,
}: {
  image: string;
  children: ReactNode;
  overlay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Move the image from -20% to 20% as the section passes through the viewport.
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
    >
      <motion.div
        aria-hidden
        style={{
          y,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="pointer-events-none absolute inset-x-0 -top-[20%] -bottom-[20%] will-change-transform"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${overlay})` }}
      />
      <div className="relative z-10 max-w-3xl text-center text-white">{children}</div>
    </section>
  );
}
