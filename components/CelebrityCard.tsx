"use client";

import { Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Celebrity } from "@/data/celebrities";
import { Tag } from "@/components/Tag";

export function CelebrityCard({ celebrity, compact = false }: { celebrity: Celebrity; compact?: boolean }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("physique-favorites") || "[]") as string[];
    setSaved(savedItems.includes(celebrity.id));
  }, [celebrity.id]);

  const toggleSaved = () => {
    const savedItems = JSON.parse(localStorage.getItem("physique-favorites") || "[]") as string[];
    const next = savedItems.includes(celebrity.id)
      ? savedItems.filter((item) => item !== celebrity.id)
      : [...savedItems, celebrity.id];
    localStorage.setItem("physique-favorites", JSON.stringify(next));
    setSaved(next.includes(celebrity.id));
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-panel/72 shadow-glow transition duration-300 hover:-translate-y-1 hover:border-champagne/40">
      <Link href={`/celebrity/${celebrity.slug}`} className="block">
        <div className={compact ? "relative h-44" : "relative h-64"}>
          <Image
            src={celebrity.image}
            alt={`${celebrity.name} inspired fitness visual`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/24 to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs text-white backdrop-blur">
            <Sparkles size={13} />
            Inspired by {celebrity.era}
          </div>
        </div>
      </Link>
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/celebrity/${celebrity.slug}`} className="min-w-0">
            <h3 className="font-display text-xl font-semibold tracking-normal text-white">{celebrity.name}</h3>
            <p className="mt-1 text-sm text-white/58">
              {celebrity.decade} / {celebrity.years}
            </p>
          </Link>
          <button
            type="button"
            onClick={toggleSaved}
            aria-label={saved ? "Remove favorite" : "Save favorite"}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-white/5 text-white/70 transition hover:bg-white/10"
          >
            <Heart size={18} fill={saved ? "currentColor" : "none"} className={saved ? "text-coral" : ""} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {celebrity.physiqueTags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {celebrity.muscleFocus.slice(0, 4).map((tag) => (
            <Tag key={tag} tone="mint">
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </article>
  );
}
