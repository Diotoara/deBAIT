"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useEffect, useState } from "react";

type MessageType = {
  role : string,
  content : string
}

export function InputBox({w=140, messages, setMessages} : {w:number, messages : MessageType[], setMessages? : any }) {
  useEffect(()=>{
     console.log(messages)
    },[messages])
    const placeholders = [
      "Should social media platforms be regulated?",
      "Is AI more beneficial or harmful to society?",
      "Does free speech have limits?",
      "Is climate change the biggest threat to humanity?",
      "Should governments provide universal basic income?"
    ];
    const [text,setText] = useState<string>("")
    

  const sendMessage = async () => {
    const userMessage = { role: "user", content: text };
    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setText("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        history: updatedHistory
      }),
    });

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
