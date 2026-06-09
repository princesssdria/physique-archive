"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const suggestions = ["thick legs", "slim toned", "tiny waist illusion", "dancer body", "superhero physique"];

export function SearchBar({ initialValue = "" }: { initialValue?: string }) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="space-y-3">
      <form onSubmit={submit} className="glass flex items-center gap-3 rounded-2xl p-2">
        <Search className="ml-3 text-white/50" size={21} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search slim toned, superhero physique, thick legs, dancer physique..."
          className="min-h-12 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/38"
        />
        <button className="rounded-2xl bg-champagne px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white">
          Search
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => router.push(`/search?q=${encodeURIComponent(suggestion)}`)}
            className="rounded-full border border-line bg-white/5 px-3 py-1.5 text-xs text-white/68 transition hover:border-champagne/50 hover:text-white"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
