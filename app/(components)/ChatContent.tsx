
"use client"
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import ChatComponent from "../(components)/ChatComponent";
import { InputBox } from "../(components)/InputBox";

import { motion, AnimatePresence } from "framer-motion";

const prompt = `You are an expert debate opponent trained in formal logic and evidence-based reasoning.

Goal:
Challenge the user's argument in a fair, intelligent, and rigorous manner.

Rules:
- Do NOT blindly contradict factual claims.
- If the user's point is factually correct, acknowledge it briefly and pivot to a deeper or less obvious counterpoint.
- Attack assumptions, implications, trade-offs, or missing context — not wording or tone.
- Prefer structural weaknesses over surface-level disagreement.
- Introduce at least one valid counter-consideration (economic, technical, ethical, or practical).
- Do NOT repeat the user's argument.
- Do NOT moralize or appeal to emotions.
- Avoid strawman arguments.
- Use precise, neutral language.

Constraints:
- Maximum length: 120 words
- No rhetorical questions unless they expose a hidden assumption
- No hedging phrases like "it depends" without explanation

Respond with a logically coherent counter-argument that would challenge a skilled debater.
`

export default function Chat() {
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q');
  const hasProcessed = useRef(false);

  
  const [messages, setMessages] = useState([
    { role: "system", content: prompt }
  ]);
  const [factCheckRes, setFactCheckRes] = useState<Record<number, any>>({})

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    // runs if there is a query AND isnt processed yet
    if (query && !hasProcessed.current) {
      hasProcessed.current = true;
      handleInitialRequest(query);
      router.replace('/chat', { scroll: false })
    }
  }, [query, router]);

  const handleInitialRequest = async (initialQuery: string) => {
    setLoading(true)
    const messageIndex = messages.length;
    const userMessage = { role: "user", content: initialQuery };
    const updatedHistory = [...messages, userMessage];
    
    // 1. Update UI with user message immediately
    setMessages(updatedHistory);

    try {
      // 2. Await the POST request
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
        body: JSON.stringify({ message : initialQuery}),
      })
    ])

    const stat = await factRes.json();
    setFactCheckRes((prev:any) => ({
      ...prev,
      [messageIndex] : { fallacy: stat.fallacy, confidence: stat.confidence }
    }));

      const data = await response.json();

      setMessages((prev) => [
        ...prev, 
        { role: "assistant", content: data.response }
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally{
      setLoading(false)
    }
  };
    
    return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full flex flex-col overflow-hidden bg-transparent"
    >
      {/* 1. Chat Scroll Area Animation */}
      <motion.div 
        id="chat-scroll-container" 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 overflow-y-auto px-4 py-8"
      >
        <ChatComponent 
          messages={messages} 
          factCheckRes={factCheckRes} 
          isLoad={loading} 
        />
      </motion.div>

      {/* 2. Input Box Animation (Slide up from bottom) */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "keyframes", stiffness: 100, damping: 20, delay: 0.1 }}
        className="shrink-0 w-full flex justify-center pb-6 pt-4 bg-transparent"
      >
        <InputBox 
          messages={messages} 
          setMessages={setMessages} 
          setFactCheckRes={setFactCheckRes} 
          w={90} 
          setLoading={setLoading} 
        />
      </motion.div>
    </motion.div>
  );
}


// return(

//       <div className="h-full w-full flex flex-col overflow-hidden">

         

//         <div id="chat-scroll-container" className="flex-1 overflow-y-auto px-4 py-8">

//             <ChatComponent messages={messages} factCheckRes={factCheckRes} isLoad={loading} />

//         </div>



//         <div className="shrink-0 w-full flex justify-center pb-6 pt-4 bg-transparent">

//             <InputBox messages={messages} setMessages={setMessages} setFactCheckRes={setFactCheckRes} w={90} setLoading={setLoading} />

//         </div>

//     </div>

