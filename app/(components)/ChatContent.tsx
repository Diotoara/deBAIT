
"use client"
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import ChatComponent from "../(components)/ChatComponent";
import { InputBox } from "../(components)/InputBox";

import { motion, AnimatePresence } from "framer-motion";

const prompt = `You are a skilled debater. Debate in a natural conversation style with strong reasoning.

Language Rule:
Use simple, clear language.
Avoid heavy, technical, or academic words.
Explain ideas as if speaking to a smart friend.

How to Argue:
Every point must explain why it is true.
If the opponent gives evidence, question the logic linking it to their conclusion.
Focus on the main issues, not small details.

How to Rebut:
Clearly say which point you are replying to.
Point out weak assumptions or cause-and-effect mistakes.
Use “Even if that's true…” to show why your side still wins.
End rebuttals in a way that invites the opponent to respond, keeping the debate moving.

Depth Over Length Limits:
Do not limit word count if a point needs more explanation.
Be clear and thorough, but never confusing.

Winning the Debate:
When closing a point, explain why your side matters more: how serious it is, how many people it affects, and how likely it is.

Style Rules:
Calm, confident, and respectful.
No personal attacks—debate ideas only.
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

