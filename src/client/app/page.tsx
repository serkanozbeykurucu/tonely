"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, MessageSquareHeart } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Home() {
  const { isAuthenticated, initialize } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initialize();
    setMounted(true);
  }, [initialize]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[var(--bg-base)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-glow)] to-transparent blur-[100px]" />
      </div>

      <nav className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
        <BrandMark />
        <div className="flex items-center gap-4">
          {!isAuthenticated && (
            <Link
              href="/login"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
            >
              Log in
            </Link>
          )}
          <Link
            href="/chat"
            className="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2"
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 mt-[-40px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border-[var(--border-accent)]"
          >
            <Sparkles size={16} className="text-[var(--accent)]" />
            <span className="text-sm font-medium text-[var(--accent-light)]">
              The AI Assistant for HR Professionals
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-display font-medium leading-[1.1] tracking-tight mb-8">
            Craft the perfect <br />
            <span className="text-gradient">candidate outreach</span>
            <br /> in seconds.
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-12">
            Tonely helps recruiters and HR professionals generate highly personalized, engaging messages tailored to the candidate's profile and your desired tone.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/chat"
              className="btn-accent px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 hover:scale-105 transition-transform duration-300"
            >
              {isAuthenticated ? "Go to Dashboard" : "Start Generating for Free"}
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mt-24"
        >
          <div className="glass p-8 rounded-[var(--radius-lg)] hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-muted)] flex items-center justify-center mb-6">
              <MessageSquareHeart size={24} className="text-[var(--accent)]" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text)]">Personalized Tone</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Whether you want to be strictly professional, enthusiastic, or direct, Tonely adapts the message to fit your exact style.
            </p>
          </div>
          
          <div className="glass p-8 rounded-[var(--radius-lg)] hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-[var(--accent-muted)] flex items-center justify-center mb-6">
              <Sparkles size={24} className="text-[var(--accent)]" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text)]">Smart Context</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Add specific context like shared connections or specific projects to let the AI weave them naturally into the message.
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="w-full text-center py-8 text-sm text-[var(--text-muted)] border-t border-[var(--border)] relative z-10 mt-24">
        © {new Date().getFullYear()} Tonely. All rights reserved.
      </footer>
    </div>
  );
}