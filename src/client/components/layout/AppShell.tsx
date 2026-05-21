"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { MainHeader } from "./MainHeader";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { isAuthenticated, initialize } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewportHeight, setViewportHeight] = useState<string>("100%");
  const outerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    initialize();

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    const handleViewportChange = () => {
      if (window.visualViewport) {
        setViewportHeight(`${window.visualViewport.height}px`);
      } else {
        setViewportHeight(`${window.innerHeight}px`);
      }
      
      window.scrollTo(0, 0);
      if (document.body) {
        document.body.scrollTop = 0;
      }
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (outerRef.current) {
        outerRef.current.scrollTop = 0;
      }
      if (mainRef.current) {
        mainRef.current.scrollTop = 0;
      }
    };

    const handleScrollLock = (e: Event) => {
      if (window.scrollY !== 0 || window.scrollX !== 0) {
        window.scrollTo(0, 0);
      }
      if (document.body && document.body.scrollTop !== 0) {
        document.body.scrollTop = 0;
      }
      if (document.documentElement && document.documentElement.scrollTop !== 0) {
        document.documentElement.scrollTop = 0;
      }

      const target = e.target as HTMLElement;
      if (target && target.tagName) {
        const isScrollablePanel = 
          target.classList.contains("overflow-y-auto") || 
          target.style.overflowY === "auto" || 
          target.style.overflowY === "scroll";

        if (!isScrollablePanel) {
          if (target.scrollTop !== 0) {
            target.scrollTop = 0;
          }
          if (target.scrollLeft !== 0) {
            target.scrollLeft = 0;
          }
        }
      }
    };

    handleResize();
    handleViewportChange();
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScrollLock, true);
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleViewportChange);
      window.visualViewport.addEventListener("scroll", handleViewportChange);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScrollLock, true);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleViewportChange);
        window.visualViewport.removeEventListener("scroll", handleViewportChange);
      }
    };
  }, [initialize]);

  return (
    <div 
      ref={outerRef}
      className="flex overflow-hidden bg-[var(--bg-base)] relative w-full"
      style={{ height: viewportHeight }}
    >
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-25 md:hidden transition-opacity duration-300 ease-in-out cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main ref={mainRef} className="flex-1 flex flex-col min-w-0 surface-main text-[var(--text)] relative">
        <div
          className="ambient-glow ambient-glow--warm w-[550px] h-[550px] -top-40 right-[-10%] opacity-40 animate-pulse"
          style={{ animationDuration: "12s" }}
          aria-hidden
        />
        <div
          className="ambient-glow ambient-glow--cool w-[400px] h-[400px] bottom-[-10%] left-[10%] opacity-30 animate-pulse"
          style={{ animationDuration: "16s" }}
          aria-hidden
        />
        <MainHeader 
          isAuthenticated={isAuthenticated} 
          isSidebarOpen={isSidebarOpen} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <div className="relative flex-1 flex flex-col overflow-hidden z-[1]">{children}</div>
      </main>
    </div>
  );
}