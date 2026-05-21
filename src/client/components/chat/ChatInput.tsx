"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { TONES, type GenerateMessageRequest, type Tone } from "@/lib/types";
import { Sparkles } from "lucide-react";

interface ChatInputProps {
  conversationId: string;
  onGenerate: (req: GenerateMessageRequest) => Promise<void>;
  generating: boolean;
}

export function ChatInput({
  conversationId,
  onGenerate,
  generating,
}: ChatInputProps) {
  const [positionTitle, setPositionTitle] = useState("");
  const [positionDescription, setPositionDescription] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [additionalContext, setAdditionalContext] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!positionTitle.trim()) {
      setError("Pozisyon başlığı zorunludur");
      return;
    }
    if (!positionDescription.trim()) {
      setError("Pozisyon açıklaması zorunludur");
      return;
    }

    try {
      await onGenerate({
        conversationId,
        positionTitle: positionTitle.trim(),
        positionDescription: positionDescription.trim(),
        tone,
        additionalContext: additionalContext.trim() || undefined,
      });
      setPositionTitle("");
      setPositionDescription("");
      setAdditionalContext("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Üretim başarısız oldu");
    }
  }

  return (
    <div className="border-t border-[var(--border)] bg-[var(--bg-elevated)]/90 backdrop-blur-md px-4 md:px-6 py-5 shadow-2xl relative z-10">
      <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl mx-auto w-full">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider mr-2 select-none">
            Ses Tonu
          </span>
          {TONES.map((t) => {
            const isSelected = tone === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[var(--accent-muted)] border border-[var(--border-accent)] text-[var(--accent-light)] shadow-[0_0_12px_rgba(14,165,233,0.15)] scale-[1.03]"
                    : "bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--text-muted)]/30 hover:scale-[1.01]"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Pozisyon Başlığı"
            placeholder="Örn: Senior Full Stack Engineer"
            value={positionTitle}
            onChange={(e) => setPositionTitle(e.target.value)}
            disabled={generating}
            className="hover:border-[rgba(255,255,255,0.15)] transition-colors"
          />
          <Input
            label="Ekstra Bağlam"
            placeholder="Örn: Uzaktan çalışma uyumlu, Seri B girişim..."
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            disabled={generating}
            className="hover:border-[rgba(255,255,255,0.15)] transition-colors"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <Textarea
              label="Pozisyon Açıklaması"
              placeholder="Rolü, aranan nitelikleri, şirket kültürünü açıklayın..."
              value={positionDescription}
              onChange={(e) => setPositionDescription(e.target.value)}
              rows={3}
              disabled={generating}
              className="hover:border-[rgba(255,255,255,0.15)] transition-colors"
            />
          </div>
          
          <Button
            type="submit"
            variant="accent"
            loading={generating}
            disabled={generating}
            className="w-full sm:w-auto h-12 px-6 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_2px_12px_rgba(14,165,233,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            {!generating && <Sparkles size={16} />}
            {generating ? "Üretiliyor..." : "Mesajı Üret"}
          </Button>
        </div>

        {error && (
          <p className="text-xs font-semibold text-red-400 mt-2 animate-pulse">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}