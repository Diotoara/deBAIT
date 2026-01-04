"use client";
import { motion, useScroll, useSpring } from "framer-motion";

const fallacies = [
  { 
    name: "Ad Hominem", 
    desc: "Attacking the person instead of the argument.", 
    example: "You're too young to understand global economics." 
  },
  { 
    name: "Straw Man", 
    desc: "Misrepresenting an argument to make it easier to attack.", 
    example: "If you want to reduce military spending, you want us to be defenseless." 
  },
  { 
    name: "Slippery Slope", 
    desc: "Claiming one small step will lead to a chain of disasters.", 
    example: "If we let students use AI, soon nobody will learn to read or write at all." 
  },
  { 
    name: "False Dilemma", 
    desc: "Presenting only two options when more exist.", 
    example: "Either you support this bill, or you hate your country." 
  }
];

export default function ReadPage() {
  // Setup for Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    /* This container fills the flex-1 area from your layout and enables scrolling */
    <div className="relative h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide scroll-smooth selection:bg-purple-500/30">
      
      {/* 1. Scroll Progress Bar (Fixed at top of this scroll container) */}

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-32 text-white">
        
        {/* --- HERO SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-purple-400 font-medium mb-4 block">
            The Logic Manifesto
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">
            Think Closer.
          </h1>
          <p className="text-white/50 text-xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            In an era of digital noise, the ability to dissect an argument is the ultimate competitive advantage.
          </p>
        </motion.div>

        {/* --- CORE CONTENT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
          >
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">The Refinement of Thought</h2>
            <p className="text-white/60 leading-relaxed">
              Debate is not about winning; it is about the stress-testing of ideas. By engaging in structured disagreement, you move from "I feel" to "I conclude," building a foundation of objective reasoning.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">The Power of Logos</h2>
            <p className="text-white/60 leading-relaxed">
              Aristotle defined Logos as the appeal to logic. In modern discourse, this means relying on verified data, sound structure, and the absolute absence of emotional fallacies.
            </p>
          </motion.div>
        </div>

        {/* --- FALLACY GLOSSARY --- */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold mb-10 tracking-tight text-center">Cognitive Glitches</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fallacies.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/10 transition-all cursor-default"
              >
                <h4 className="font-bold text-red-400/80 group-hover:text-red-400 mb-2 transition-colors">{f.name}</h4>
                <p className="text-xs text-white/50 mb-4">{f.desc}</p>
                <div className="pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-1">Example</span>
                  <p className="text-[11px] italic text-white/70">"{f.example}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- 3-STEP ANALYSIS --- */}
        <section className="p-8 md:p-12 rounded-[40px] border border-white/10 bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-3xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">The 3-Step Protocol</h2>
            <div className="space-y-12">
              {[
                { step: "01", title: "Identify the Claim", text: "Strip away the adjectives and emotional triggers. What is the core conclusion the speaker wants you to accept?" },
                { step: "02", title: "Verify the Premise", text: "Is the evidence supporting the claim factually true, or is it based on unproven assumptions and anecdotes?" },
                { step: "03", title: "Check the Connection", text: "Does the conclusion actually follow from the premise? This is where most logical fallacies hide." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-8 items-start">
                  <span className="text-5xl font-black text-white/5 leading-none">{item.step}</span>
                  <div>
                    <h4 className="text-xl font-bold text-white/90 mb-2">{item.title}</h4>
                    <p className="text-white/50 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FOOTER CTA --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 text-center"
        >
          <p className="text-white/30 mb-8 uppercase tracking-[0.2em] text-xs font-medium">Ready to test your reasoning?</p>
          <a 
            href="/chat"
            className="px-10 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform inline-block"
          >
            Launch Analyzer
          </a>
        </motion.div>
      </div>
    </div>
  );
}