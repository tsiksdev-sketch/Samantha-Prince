"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-background"
          aria-label="Loading"
          aria-live="polite"
        >
          <div className="text-center">
            <p
              className="script text-4xl md:text-6xl"
              style={{ color: "var(--accent)" }}
            >
              Samantha &amp; Prince
            </p>

            <div
              className="mx-auto my-6 h-px w-20"
              style={{ backgroundColor: "var(--accent)" }}
            />

            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              October 4, 2026
            </p>

            <div className="mt-10 flex items-center justify-center gap-2">
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-accent" />
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-accent" style={{ animationDelay: "150ms" }} />
              <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-accent" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
