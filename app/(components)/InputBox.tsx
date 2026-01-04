"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useEffect, useState } from "react";

type MessageType = {
  role : string,
  content : string,
  fallacy?: string | null
  confidence?: string | null
}

export function InputBox({w=140, messages, setMessages, setFactCheckRes} : {w:number, messages : MessageType[], setMessages? : any, setFactCheckRes:any}) {
  useEffect(()=>{
     console.log(messages)
    },[messages])
    const placeholders = [
      "AI will replace software engineers",
      "Most software startups fail because of poor problem selection, not poor execution.",
      "College degrees are becoming irrelevant for high-skill technology jobs.",
      "Remote work permanently reduces innovation in engineering teams.",
      "Data privacy is already lost and regulation can no longer fix it.",
      "Open-source software slows down true technological breakthroughs."
    ];
    const [text,setText] = useState<string>("")
    

  const sendMessage = async () => {
    const messageIndex = messages.length;
    const userMessage = { role: "user", content: text };
    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setText("");

    const [response, factRes] = await Promise.all([
      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          history: updatedHistory
        }),
      }),
      fetch("/api/fact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message : text}),
      })
    ])

    const stat = await factRes.json();
    setFactCheckRes((prev:any) => ({
      ...prev,
      [messageIndex] : { fallacy: stat.fallacy, confidence: stat.confidence }
    }));
    const data = await response.json();

    setMessages((prev:any) => [
      ...prev, 
      { role: "assistant", content: data.response }
    ]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
  };
  return (
    <div className={`h-20 w-160 flex flex-col justify-center  items-center px-4 `}>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={sendMessage}
      />
    </div>
  );
}
