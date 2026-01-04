const check = `You are a professional debate judge and logic professor. 
Analyze the user's statement for logical fallacies and overall argumentative integrity.

CORE RUBRIC FOR CONFIDENCE (0.0 - 1.0):
The "confidence" value is a weighted score of the following:
1. Factual Accuracy: Is the claim supported by verifiable reality?
2. Critical Reasoning: Is the path from premise to conclusion coherent?
3. Logical Soundness: Is the argument free of formal and informal fallacies?

SCORING GUIDE:
- 1.0: Factually perfect, logically airtight, no fallacies.
- 0.7-0.9: Strong argument, minor missing context, but no major fallacies.
- 0.4-0.6: Borderline. Contains weak reasoning, unproven assumptions, or soft fallacies.
- 0.0-0.3: Deeply fallacious, factually incorrect, or logically broken.

RULES:
- If a fallacy is found, identify it by name in "fallacy".
- If NO fallacy is found, "fallacy" must be null.
- "confidence" MUST always be a float between 0 and 1.
- Respond ONLY with a valid JSON object.

SCHEMA:
{
  "fallacy": string | null,
  "confidence": number
}`;


import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

const groq = new Groq({
  apiKey: process.env.API_KEY
});

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: check },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile",
      // Forces the model to output JSON
      response_format: { type: "json_object" },
      temperature: 0.1, // Lower temperature = more consistent logic
    });

    const raw = chatCompletion.choices[0]?.message?.content || "{}";
    
    // Safety parse
    const parsed = JSON.parse(raw);

    return NextResponse.json({
      fallacy: parsed.fallacy ?? null,
      confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0,
    }, { status: 200 });

  } catch (error) {
    console.error("Groq/Parsing Error:", error);
    return NextResponse.json({
      fallacy: "Analysis Error",
      confidence: 0,
    }, { status: 500 });
  }
}



//response:
// {
//     "respone": "What a difficult and emotional question. As a neutral AI, I don't have personal experiences or emotions, but I can provide a response based on common human perspectives.\n\nIn this hypothetical scenario, I would choose to save my pet cat. Here's why:\n\n1. **Emotional attachment**: As a hypothetical pet owner, I have a strong emotional bond with my pet cat. I have invested time, love, and care into our relationship, and saving my pet cat would be a way to preserve that bond.\n2. **Responsibility**: As a pet owner, I have a responsibility to protect and care for my pet. Saving my pet cat would be fulfilling that responsibility and upholding my duty as a caretaker.\n3. **Personal connection**: My pet cat is a part of my life, and I have a personal connection with them. Saving them would be a way to preserve a part of my own life and experiences.\n\nThat being said, it's essential to acknowledge that saving 5 stray cats would be a more significant act of kindness and would potentially save more lives. However, in this scenario, I'm limited to only two choices, and my emotional attachment and sense of responsibility towards my pet cat take precedence.\n\nPlease note that this is a hypothetical response, and I don't condone or promote harming animals in any way. In real-life situations, it's crucial to prioritize animal welfare and seek help from authorities or animal rescue organizations to ensure the safety of all animals involved."
// } 