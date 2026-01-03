"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";


export function InputBox({w=140} : {w:number}) {
  const placeholders = [
    "Should social media platforms be regulated?",
    "Is AI more beneficial or harmful to society?",
    "Does free speech have limits?",
    "Is climate change the biggest threat to humanity?",
    "Should governments provide universal basic income?"
];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className={`h-20 w-160 flex flex-col justify-center  items-center px-4 `}>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
