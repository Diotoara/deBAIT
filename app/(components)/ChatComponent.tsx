"use client";
import { useEffect, useState } from "react";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

type MessageType = {
  role : string,
  content : string
}

export default function ChatComponent({messages} : {messages:MessageType[]}) {


  return (
    <div className="shadow-2xl shadow-white" >
      {messages.filter(m => m.role !== 'system').map((m, i) => (
        <p className="text-white" key={i}><strong>{m.role}:</strong> {m.content}</p>
      ))}
    </div>
  );
}