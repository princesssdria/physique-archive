"use client";

import { SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type OptionGroup = {
  label: string;
  param: string;
  options: string[];
};

export function FilterPanel({ groups }: { groups: OptionGroup[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    router.push(`/explore?${next.toString()}`);
  };

  return (
    <aside className="glass sticky top-24 h-fit rounded-2xl p-4">
      <div className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-white">
        <SlidersHorizontal size={19} />
        Filters
      </div>
      <div className="space-y-4">
        {groups.map((group) => (
          <label key={group.param} className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              {group.label}
            </span>
            <select
              value={params.get(group.param) || ""}
              onChange={(event) => setParam(group.param, event.target.value)}
              className="w-full rounded-2xl border border-line bg-ink px-3 py-3 text-sm text-white outline-none transition focus:border-champagne/60"
            >
              <option value="">All</option>
              {group.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </aside>
  );
}
