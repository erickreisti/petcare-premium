"use client";
import { useEffect, useState } from "react";
import { DEMO_NOTICE_EVENT } from "@/lib/demo";

export default function DemoToast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleNotice = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      clearTimeout(timeout);
      timeout = setTimeout(() => setMessage(null), 4000);
    };

    window.addEventListener(DEMO_NOTICE_EVENT, handleNotice);
    return () => {
      window.removeEventListener(DEMO_NOTICE_EVENT, handleNotice);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-60 w-[calc(100%-2rem)] max-w-md pointer-events-none"
    >
      {message && (
        <div className="animate-fade-in-up glass-dark text-white text-sm font-medium px-6 py-4 rounded-2xl shadow-premium text-center">
          {message}
        </div>
      )}
    </div>
  );
}
