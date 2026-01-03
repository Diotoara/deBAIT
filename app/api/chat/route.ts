//          GEMINI API 
// import { GoogleGenAI } from "@google/genai";
// const ai = new GoogleGenAI({});
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const { message } = await req.json();
//   const completions = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: message,
//     config: {
//       systemInstruction:
//         "you are a emotionally intelligent person. you have high logical thinking skills.",
//     },
//   });
//   return NextResponse.json({
//     response: completions.text,
//   });
// }


//      GROQ API
import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

const groq = new Groq({
  apiKey: process.env.API_KEY
});

export async function POST(req:NextRequest) {
    const {history = []} = await req.json();

    const messages : ChatCompletionMessageParam[] = history

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.3-70b-versatile",
    });
    return NextResponse.json({
        response : chatCompletion.choices[0]?.message?.content || "no response",
    },{
        status:202
    })
  } catch (error) {
    return NextResponse.json({
        response : "Error fetching from Groq:", error,
    },{
        status:404
    })
  }
}



//response:
// {
//     "respone": "What a difficult and emotional question. As a neutral AI, I don't have personal experiences or emotions, but I can provide a response based on common human perspectives.\n\nIn this hypothetical scenario, I would choose to save my pet cat. Here's why:\n\n1. **Emotional attachment**: As a hypothetical pet owner, I have a strong emotional bond with my pet cat. I have invested time, love, and care into our relationship, and saving my pet cat would be a way to preserve that bond.\n2. **Responsibility**: As a pet owner, I have a responsibility to protect and care for my pet. Saving my pet cat would be fulfilling that responsibility and upholding my duty as a caretaker.\n3. **Personal connection**: My pet cat is a part of my life, and I have a personal connection with them. Saving them would be a way to preserve a part of my own life and experiences.\n\nThat being said, it's essential to acknowledge that saving 5 stray cats would be a more significant act of kindness and would potentially save more lives. However, in this scenario, I'm limited to only two choices, and my emotional attachment and sense of responsibility towards my pet cat take precedence.\n\nPlease note that this is a hypothetical response, and I don't condone or promote harming animals in any way. In real-life situations, it's crucial to prioritize animal welfare and seek help from authorities or animal rescue organizations to ensure the safety of all animals involved."
// } 