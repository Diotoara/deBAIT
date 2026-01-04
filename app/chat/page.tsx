

import { Suspense } from 'react';
import Chat from '../(components)/ChatContent';

export default function ChatPage() {
  return (
    // This Suspense boundary catches the useSearchParams() hook
    <Suspense fallback={
      <div className="h-full w-full flex items-center justify-center bg-black text-white">
        <p className="animate-pulse"></p>
      </div>
    }>
      <Chat />
    </Suspense>
  );
}
