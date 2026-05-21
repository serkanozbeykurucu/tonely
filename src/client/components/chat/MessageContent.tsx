"use client";

const BOLD_PATTERN = /\*\*(.+?)\*\*/g;

interface MessageContentProps {
  content: string;
  className?: string;
}

export function MessageContent({ content, className = "" }: MessageContentProps) {
  const parts = content.split(BOLD_PATTERN);

  if (parts.length === 1) {
    return (
      <p className={`whitespace-pre-wrap leading-relaxed ${className}`}>
        {content}
      </p>
    );
  }

  return (
    <p className={`whitespace-pre-wrap leading-relaxed ${className}`}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-[var(--accent-light)]">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  );
}