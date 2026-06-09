"use client";

import { useMemo, useState } from "react";
import { getCelebritiesByMuscle } from "@/lib/archive";
import { CelebrityCard } from "@/components/CelebrityCard";

type AnatomyArea = {
  id: string;
  label: string;
  view: "front" | "back";
  d: string;
};

const anatomyAreas: AnatomyArea[] = [
  { id: "shoulders", label: "Shoulders", view: "front", d: "M84 112 C61 117 46 133 39 154 C54 164 75 158 91 139 C96 127 96 117 84 112 Z M176 112 C199 117 214 133 221 154 C206 164 185 158 169 139 C164 127 164 117 176 112 Z" },
  { id: "chest", label: "Chest", view: "front", d: "M91 132 C105 116 123 116 130 128 C137 116 155 116 169 132 C167 158 154 174 132 171 C130 171 130 171 128 171 C106 174 93 158 91 132 Z" },
  { id: "arms", label: "Arms", view: "front", d: "M39 162 C28 194 23 238 33 292 C43 300 56 294 61 279 C56 239 64 196 79 151 C64 164 50 167 39 162 Z M221 162 C232 194 237 238 227 292 C217 300 204 294 199 279 C204 239 196 196 181 151 C196 164 210 167 221 162 Z" },
  { id: "abs", label: "Abs", view: "front", d: "M104 176 C116 181 144 181 156 176 C163 208 158 246 145 269 C137 281 123 281 115 269 C102 246 97 208 104 176 Z" },
  { id: "quads", label: "Quads", view: "front", d: "M91 285 C104 273 120 278 126 301 L120 421 C101 425 87 411 86 386 C84 343 82 306 91 285 Z M169 285 C156 273 140 278 134 301 L140 421 C159 425 173 411 174 386 C176 343 178 306 169 285 Z" },
  { id: "calves", label: "Calves", view: "front", d: "M89 424 C102 434 117 431 121 419 L115 526 C100 534 87 525 86 505 C83 470 83 440 89 424 Z M171 424 C158 434 143 431 139 419 L145 526 C160 534 173 525 174 505 C177 470 177 440 171 424 Z" },
  { id: "back", label: "Back", view: "back", d: "M90 126 C107 107 153 107 170 126 C178 165 171 213 151 244 C137 256 123 256 109 244 C89 213 82 165 90 126 Z" },
  { id: "glutes", label: "Glutes", view: "back", d: "M93 254 C108 239 124 242 130 260 C136 242 152 239 167 254 C172 286 153 306 130 300 C107 306 88 286 93 254 Z" },
  { id: "hamstrings", label: "Hamstrings", view: "back", d: "M91 304 C105 291 121 298 126 320 L120 421 C102 427 88 412 87 388 C85 350 83 322 91 304 Z M169 304 C155 291 139 298 134 320 L140 421 C158 427 172 412 173 388 C175 350 177 322 169 304 Z" },
  { id: "calves", label: "Calves", view: "back", d: "M89 424 C104 435 118 431 122 418 L116 526 C100 535 87 524 86 504 C83 470 83 440 89 424 Z M171 424 C156 435 142 431 138 418 L144 526 C160 535 173 524 174 504 C177 470 177 440 171 424 Z" },
  { id: "arms", label: "Arms", view: "back", d: "M39 162 C28 194 23 238 33 292 C43 300 56 294 61 279 C56 239 64 196 79 151 C64 164 50 167 39 162 Z M221 162 C232 194 237 238 227 292 C217 300 204 294 199 279 C204 239 196 196 181 151 C196 164 210 167 221 162 Z" }
];

function AnatomyFigure({
  view,
  selected,
  onSelect
}: {
  view: "front" | "back";
  selected: string;
  onSelect: (area: string) => void;
}) {
  const areas = anatomyAreas.filter((area) => area.view === view);

  return (
    <svg viewBox="0 0 260 560" role="img" aria-label={`${view} anatomy muscle selector`} className="h-full w-full">
      <defs>
        <linearGradient id={`muscle-${view}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#EF766F" />
          <stop offset="100%" stopColor="#E8D6B8" />
        </linearGradient>
      </defs>
      <path
        d="M106 68 C106 35 154 35 154 68 C154 96 106 96 106 68 Z M112 94 L148 94 C152 105 161 108 176 112 C201 119 222 143 231 175 C238 209 238 256 229 294 C225 311 201 310 196 292 C194 268 194 235 190 209 C186 178 176 151 161 141 C166 171 166 223 157 251 C153 263 149 276 154 291 C166 333 171 386 169 429 C168 459 180 491 171 526 C166 545 142 542 141 520 L132 405 L128 405 L119 520 C118 542 94 545 89 526 C80 491 92 459 91 429 C89 386 94 333 106 291 C111 276 107 263 103 251 C94 223 94 171 99 141 C84 151 74 178 70 209 C66 235 66 268 64 292 C59 310 35 311 31 294 C22 256 22 209 29 175 C38 143 59 119 84 112 C99 108 108 105 112 94 Z"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2"
      />
      {areas.map((area) => {
        const active = selected === area.id;
        return (
          <path
            key={`${view}-${area.id}-${area.d}`}
            d={area.d}
            role="button"
            tabIndex={0}
            aria-label={`Select ${area.label}`}
            onClick={() => onSelect(area.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(area.id);
              }
            }}
            fill={active ? `url(#muscle-${view})` : "rgba(255,255,255,0.16)"}
            stroke={active ? "#E8D6B8" : "rgba(255,255,255,0.34)"}
            strokeWidth={active ? 3 : 1.5}
            className="cursor-pointer outline-none transition hover:fill-coral/70 focus:fill-coral/70"
          >
            <title>{area.label}</title>
          </path>
        );
      })}
    </svg>
  );
}

export function MuscleMap() {
  const [selected, setSelected] = useState("glutes");
  const matches = useMemo(() => getCelebritiesByMuscle(selected), [selected]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-white">Muscle Focus Map</h2>
          <div className="flex rounded-full border border-line bg-white/5 p-1 text-xs text-white/64">
            <span className="rounded-full bg-white/10 px-3 py-1.5">Female</span>
            <span className="px-3 py-1.5">Male</span>
          </div>
        </div>
        <div className="mx-auto grid max-w-[760px] gap-3 rounded-2xl border border-line safe-gradient p-3 sm:grid-cols-2">
          <div className="h-[560px] rounded-2xl border border-white/10 bg-black/20 p-2">
            <AnatomyFigure view="front" selected={selected} onSelect={setSelected} />
          </div>
          <div className="h-[560px] rounded-2xl border border-white/10 bg-black/20 p-2">
            <AnatomyFigure view="back" selected={selected} onSelect={setSelected} />
          </div>
        </div>
      </div>
      <div>
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">Selected focus</p>
          <h3 className="mt-2 font-display text-4xl font-semibold capitalize text-white">{selected}</h3>
          <p className="mt-2 text-white/60">
            Celebrities with similar muscle emphasis in this area. Use these as training-style inspiration, not a target
            for exact replication.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {matches.slice(0, 6).map((celebrity) => (
            <CelebrityCard key={celebrity.id} celebrity={celebrity} compact />
          ))}
        </div>
      </div>
    </div>
  );
}
