"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useCallback } from "react";

const VARIANTS = ["A", "B", "C"] as const;

const LABELS: Record<string, string> = {
  A: "A — 横向卡片",
  B: "B — 纵向对比",
  C: "C — 阶梯选择",
};

export default function PrototypeSwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("variant") ?? "A";

  const go = useCallback(
    (dir: -1 | 1) => {
      const idx = VARIANTS.indexOf(current as typeof VARIANTS[number]);
      const next = VARIANTS[(idx + dir + VARIANTS.length) % VARIANTS.length];
      const params = new URLSearchParams(searchParams.toString());
      params.set("variant", next);
      router.replace(`?${params.toString()}`);
    },
    [current, router, searchParams]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      )
        return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#1A1E2E] border border-[#484F58] shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-sm font-semibold select-none">
      <button
        onClick={() => go(-1)}
        className="w-7 h-7 rounded-full flex items-center justify-center bg-[#1C2333] text-[#8B949E] hover:bg-[#30363D] hover:text-[#E6EDF3] transition-colors"
      >
        ←
      </button>
      <span className="text-[#E6EDF3] min-w-[140px] text-center">
        {LABELS[current] ?? current}
      </span>
      <button
        onClick={() => go(1)}
        className="w-7 h-7 rounded-full flex items-center justify-center bg-[#1C2333] text-[#8B949E] hover:bg-[#30363D] hover:text-[#E6EDF3] transition-colors"
      >
        →
      </button>
    </div>
  );
}
