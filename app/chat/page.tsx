"use client"
import { useState } from "react";
import ChatComponent from "../(components)/ChatComponent";
import { InputBox } from "../(components)/InputBox";



export default function Chat(){
    const [messages, setMessages] = useState([
    { role: "system", content: "You are a 7 year old" }
  ]);
    return(
        <div className="" >
            <div>
                <ChatComponent messages={messages} />
            </div>
            <div className="absolute bottom-0 pb-6  w-full flex justify-center" >
            <InputBox messages={messages} setMessages={setMessages} w={90} />
            </div>
            
        </div>
    )
}