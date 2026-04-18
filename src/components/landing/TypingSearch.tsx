import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export const TypingSearch = () => {
  const words = ["Google", "ChatGPT", "Gemini", "Claude", "Perplexity", "Grok"];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[index];
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
        setSpeed(50);
      } else {
        setText(currentWord.substring(0, text.length + 1));
        setSpeed(150);
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, speed]);

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-2 px-4">
      <div className="flex items-center w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 sm:py-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] group transition-all duration-500 hover:border-primary/30 hover:bg-gray-50">
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 mr-4 flex-shrink-0">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
        <div className="flex-1 text-left h-10 sm:h-14 md:h-16 flex items-center overflow-visible will-change-transform">
          <span className="text-black font-bold text-xl sm:text-4xl md:text-5xl tracking-tight block leading-tight">
            {text}
            <span className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 align-middle animate-pulse will-change-opacity" />
          </span>
        </div>
      </div>
      
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse" />
    </div>
  );
};
