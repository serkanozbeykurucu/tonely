import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { BrandMark } from "@/components/ui/BrandMark";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
      <div
        className="ambient-glow ambient-glow--warm w-[500px] h-[500px] top-0 right-0 opacity-50"
        aria-hidden
      />
      <div
        className="ambient-glow ambient-glow--cool w-[400px] h-[400px] bottom-0 left-0 opacity-40"
        aria-hidden
      />
      <div className="absolute top-5 left-5 z-10">
        <BrandMark size="sm" />
      </div>
      <div className="absolute top-5 right-5 z-10">
        <LocaleSwitcher />
      </div>
      <div className="relative z-10 w-full max-w-sm px-4">
        <div className="surface-card p-8 shadow-[var(--shadow-soft)]">{children}</div>
      </div>
    </div>
  );
}