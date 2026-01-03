"use client";

import { motion } from "framer-motion";
import { CrowdCanvas } from "./(components)/Crowd";
import { InputBox } from "./(components)/InputBox";
import NavBar from "./(components)/Navbar";
import FaultyTerminal from "./(components)/Terminal";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">

      {/* ================= BACKGROUND (BREATHING) ================= */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{
          opacity: 0.25,
          scale: [1.05, 1.02, 1.05],
        }}
        transition={{
          opacity: { duration: 1 },
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <FaultyTerminal
          scale={3}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#a7ef9e"
          mouseReact
          mouseStrength={0.5}
          pageLoadAnimation
          brightness={1}
        />
      </motion.div>

      {/* ================= FOREGROUND ================= */}
      <div className="relative z-10 h-screen pointer-events-none">

        {/* ---------- NAV ---------- */}
        <motion.div
          className="pointer-events-auto"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <NavBar />
        </motion.div>

        {/* ---------- HERO TEXT (CLIP + BLUR REVEAL) ---------- */}
        <motion.div
          className="absolute flex justify-center pt-4 w-full text-center z-50"
          initial={{
            clipPath: "inset(0 0 100% 0)",
            opacity: 0,
            filter: "blur(12px)",
          }}
          animate={{
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1], // cinematic
          }}
        >
          <div>
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white">
              de
              <span className="text-[#a7ef9e] drop-shadow-[0_0_20px_rgba(167,239,158,0.6)]">
                BAIT
              </span>
            </h1>

            <motion.p
              className="text-white font-medium text-sm tracking-[0.5em] uppercase mt-2 opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              DEBATE WITH AI NOW
            </motion.p>

            {/* INPUT – spring pop */}
            <motion.div
              className="pointer-events-auto mt-6"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 1,
                type: "keyframes",
                stiffness: 80,
                damping: 14,
              }}
            >
              <InputBox w={140} />
            </motion.div>
          </div>
        </motion.div>

        {/* ---------- CROWD (DEPTH REVEAL) ---------- */}
        <motion.div
          className="absolute top-111/100 left-0 w-full"
          initial={{
            opacity: 0,
            y: 120,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(2px)",
          }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: "easeOut",
          }}
        >
          <CrowdCanvas
            src="/images/peeps/all-peeps.png"
            rows={15}
            cols={7}
          />
        </motion.div>

      </div>
    </div>
  );
}
