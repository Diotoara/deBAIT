"use client";
import { useEffect, useState } from "react";

export default function ChatComponent() {
  const [input, setInput] = useState("");
  // This state tracks the full conversation history
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a 7 year old" }
  ]);

  const sendMessage = async () => {
    const userMessage = { role: "user", content: input };
    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        history: updatedHistory
      }),
    });

    const data = await response.json();

    setMessages((prev) => [
      ...prev, 
      { role: "assistant", content: data.response }
    ]);
  };

  return (
    <div className="shadow-2xl shadow-white" >
        <div className="text-2xl font-bold text-white" >ho</div>
      {messages.filter(m => m.role !== 'system').map((m, i) => (
        <p className="text-white" key={i}><strong>{m.role}:</strong> {m.content}</p>
      ))}
      
      <input value={input} className="text-white bg-teal-600" onChange={(e) => setInput(e.target.value)} />
      <button className="text-xl bg-white ml-2 p-[3] rounded-md font-medium text-amber-400" onClick={sendMessage}>Send</button>
    </div>
  );
}