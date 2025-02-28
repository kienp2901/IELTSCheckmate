"use client";

import { createContext, useContext, useRef, ReactNode } from "react";

interface ScrollContextType {
  aiAssistantRef: React.RefObject<HTMLDivElement | null>;
  scrollToAIAssistant: () => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const aiAssistantRef = useRef<HTMLDivElement | null>(null);

  const scrollToAIAssistant = () => {
    if (aiAssistantRef.current) {
      aiAssistantRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <ScrollContext.Provider value={{ aiAssistantRef, scrollToAIAssistant }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
}
