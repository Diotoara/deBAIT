type MessageType = {
  role : string,
  content : string
}

import { useEffect, useRef } from "react";

export default function ChatComponent({messages, factCheckRes} : {messages:MessageType[], factCheckRes:any}) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  return (
    <div className="flex flex-col h-full gap-4 pb-28 px-4 md:px-20 lg:px-32">
      {messages
        .filter((m) => m.role !== "system")
        .map((m, i) => {
          // Adjust index because we filtered out the 'system' message
          const actualIndex = i + 1; 
          const check = factCheckRes[actualIndex];

          return (
            <div key={i} className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-sm backdrop-blur-md ${
                m.role === "user" 
                  ? "bg-white/10 text-white border border-white/20 rounded-tr-none" 
                  : "bg-neutral-800 text-white rounded-tl-none"
              }`}>
                <p className="text-md leading-relaxed">{m.content}</p>
                
                {/* Only render if this specific user message has data */}
                {m.role === "user" && check && (
                <div className="flex gap-3 mt-2 pt-2 border-t border-white/10 text-xs items-center">
                  <p className="text-red-400 font-medium">
                    Fallacy: <span className="text-white/70">{check.fallacy || "None"}</span>
                  </p>
                  {/* <p className="text-green-400 font-medium">
                    Logic Score: <span className="text-white/70">{(check.confidence)}%</span>
                  </p> */}
                  <div className="">
                    <div className="flex justify-between gap-2 text-[10px] mb-1 uppercase tracking-tighter opacity-70">
                      <span className="text-teal-400">Logic Soundness</span>
                      <span >{(check.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          check.confidence > 0.7 ? 'bg-emerald-500' : 
                          check.confidence > 0.4 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${check.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
              </div>
            </div>
          );
        })}
      <div ref={bottomRef} />
    </div>
  );

  
}