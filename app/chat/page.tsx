"use client"
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import ChatComponent from "../(components)/ChatComponent";
import { InputBox } from "../(components)/InputBox";



export default function Chat() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q');
  const hasProcessed = useRef(false);

  const [messages, setMessages] = useState([
    { role: "system", content: "You are a 7 year old" }
  ]);

  useEffect(() => {
    // Only run this if there is a query AND we haven't processed it yet
    if (query && !hasProcessed.current) {
      hasProcessed.current = true;
      handleInitialRequest(query);
      router.replace('/chat', { scroll: false })
    }
  }, [query, router]);

  // Define the async function inside or outside useEffect
  const handleInitialRequest = async (initialQuery: string) => {
    const userMessage = { role: "user", content: initialQuery };
    const updatedHistory = [...messages, userMessage];
    
    // 1. Update UI with user message immediately
    setMessages(updatedHistory);

    try {
      // 2. Await the POST request
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
    } catch (error) {
      console.error("Chat Error:", error);
    }
  };
    
    return(
      <div className="h-full w-full flex flex-col overflow-hidden">
         
        <div id="chat-scroll-container" className="flex-1 overflow-y-auto px-4 py-8">
            <ChatComponent messages={messages} />
        </div>

        <div className="shrink-0 w-full flex justify-center pb-6 pt-4 bg-transparent">
            <InputBox messages={messages} setMessages={setMessages} w={90} />
        </div>
    </div>
    )
}