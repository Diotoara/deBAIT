type MessageType = {
  role : string,
  content : string
}

import { useEffect, useRef } from "react";

export default function ChatComponent({messages} : {messages:MessageType[]}) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  return (
    <div className="flex flex-col h-full gap-4 pb-28 px-30">
  {messages
    .filter((m) => m.role !== "system")
    .map((m, i) => (
      <div
        key={i}
        className={`flex w-full ${
          m.role === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-sm ${
            m.role === "user"
              // ? "bg-transparent text-neutral-300 border-none rounded-tr-none" // User: Greenish, Right
              // : "bg-neutral-800 text-white rounded-tl-none"  // Assistant: Grey, Left
              ? "bg-white/10 text-white border border-white/20 rounded-tr-none" // User: Greenish, Right
              : "bg-[#a7ef9e]/10 text-[#a7ef9e] border border-[#a7ef9e]/20 rounded-tl-none"  // Assistant: Grey, Left
          }`}
        >
          {/* <p className="text-sm font-bold mb-1 opacity-50 uppercase tracking-wide">
            {m.role}
          </p> */}
          <p className="text-md leading-relaxed">{m.content}</p>
        </div>
      </div>
    ))}
  <div ref={bottomRef} />
</div>
  );
}