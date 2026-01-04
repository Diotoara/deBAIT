"use client";
import Aurora from "@/components/Aurora";
import { motion } from "framer-motion";

export default function Back() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeOut",
      }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      {/* Subtle pulse animation for the container */}
      <motion.div
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-full w-full"
      >
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </motion.div>

      {/* Optional: Dark Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </motion.div>
  );
}
