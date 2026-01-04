"use client"; // Required since you are using hooks (useState, useRouter)

import { useState } from "react";
import { useRouter } from "next/navigation"; // 1. Use next/navigation
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"; // Adjust path as needed

export function HeroInput({ w = 140 }: { w: number }) {
  const router = useRouter(); // 2. Initialize the router
  const [text, setText] = useState<string>("");

  const placeholders = [
    "Should social media platforms be regulated?",
    "Is AI more beneficial or harmful to society?",
    "Does free speech have limits?",
    "Is climate change the biggest threat to humanity?",
    "Should governments provide universal basic income?"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (text.trim()) {
      router.push(`/chat?q=${encodeURIComponent(text)}`);
    } else {
      router.push("/chat");
    }
  };

  return (
    <div className="h-20 w-160 flex flex-col justify-center items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit} 
      />
    </div>
  );
}