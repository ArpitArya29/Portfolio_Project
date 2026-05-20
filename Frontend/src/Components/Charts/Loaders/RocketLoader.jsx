import React, { useEffect, useState } from "react";
import { Rocket } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const messages = [
  "Launching PortIo...",
  "Waking up backend servers...",
  "Connecting to databases...",
  "Loading user data...",
  "Almost there...",
];

const RocketLoader = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-base-100/70 backdrop-blur-sm">
      {/* Background Glow */}
      <div className="absolute w-125 h-125 bg-purple-500/20 blur-3xl rounded-full" />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-8 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[40px_40px]" />

      <div className="relative flex flex-col items-center gap-6 p-6 bg-base-100/60 rounded-2xl shadow-lg">
        {/* Rocket Animation */}
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -20, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }
          className="relative"
        >
          {/* Rocket Glow */}
          <div className="absolute inset-0 blur-2xl bg-primary/40 rounded-full scale-150" />

          <Rocket size={80} className="relative text-primary rotate-45" />

          {/* Exhaust */}
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    scaleY: [1, 1.8, 1],
                    opacity: [0.5, 1, 0.5],
                  }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { repeat: Infinity, duration: 0.6 }
            }
            className="absolute left-1/2 top-18.75 -translate-x-1/2 w-4 h-14 bg-linear-to-b from-orange-400 via-yellow-300 to-transparent blur-sm rounded-full"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Portio
        </motion.h1>

        {/* Dynamic Message */}
        <motion.p
          key={messageIndex}
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? undefined : { duration: 0.4 }}
          className="text-base-content/70 text-sm md:text-base"
          role="status"
          aria-live="polite"
        >
          {messages[messageIndex]}
        </motion.p>

        {/* Loading Dots */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-2" aria-hidden>
            {[1, 2, 3].map((dot) => (
              <motion.div
                key={dot}
                animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { repeat: Infinity, duration: 0.6, delay: dot * 0.15 }
                }
                className="w-2 h-2 rounded-full bg-primary"
              />
            ))}
          </div>

          {/* Indeterminate progress bar */}
          <div className="w-48 h-2 bg-base-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-primary to-secondary"
              animate={
                prefersReducedMotion ? undefined : { x: ["-120%", "120%"] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { repeat: Infinity, duration: 1.6, ease: "linear" }
              }
              style={{ width: "30%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RocketLoader;
