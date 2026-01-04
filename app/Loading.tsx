export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
      {/* Background Glow Effect */}
      <div className="absolute w-[300px] h-[300px] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
      
      <div className="relative flex flex-col items-center">
        {/* The Animated Ring */}
        <div className="relative w-24 h-24 mb-8">
          {/* Outer Pulsing Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-ping" />
          
          {/* Rotating Gradient Border */}
          <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-purple-500 animate-spin [animation-duration:1.5s]" />
          
          {/* Center Glow Dot */}
          <div className="absolute inset-0 m-auto w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
        </div>

        {/* Text with Letter Spacing */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-white text-xl font-light tracking-[0.3em] uppercase animate-pulse">
            Initializing
          </h2>
          <div className="flex gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 bg-purple-500/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-purple-500/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>

      {/* Bottom Status Text */}
      <p className="absolute bottom-12 text-white/20 text-[10px] uppercase tracking-widest">
        Establishing Secure Neural Link
      </p>
    </div>
  );
}