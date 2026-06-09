export function Tag({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "warm" | "mint" }) {
  const tones = {
    neutral: "border-white/10 bg-white/8 text-white/76",
    warm: "border-coral/25 bg-coral/12 text-coral",
    mint: "border-mint/25 bg-mint/12 text-mint"
  };

  return <span className={`rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}
