import Link from "next/link";
import { ArrowRight, Flame, History, Sparkles } from "lucide-react";
import { CelebrityCard } from "@/components/CelebrityCard";
import { FadeIn } from "@/components/Motion";
import { MuscleMap } from "@/components/MuscleMap";
import { SearchBar } from "@/components/SearchBar";
import { SectionHeader } from "@/components/SectionHeader";
import { Tag } from "@/components/Tag";
import { aesthetics, celebrities, decades } from "@/data/celebrities";

export default function HomePage() {
  const featured = celebrities.slice(0, 6);
  const trending = ["superhero physique", "dancer physique", "curvy athletic", "slim toned", "power athletic"];

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="h-full bg-[url('https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/72 to-ink" />
        </div>
        <div className="relative mx-auto grid min-h-[78vh] max-w-7xl content-center px-4 py-20 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/72 backdrop-blur">
                <Sparkles size={16} className="text-champagne" />
                Similar training style, not exact replication.
              </div>
              <h1 className="text-balance font-display text-5xl font-semibold tracking-normal text-white sm:text-7xl">
                Physique Archive
              </h1>
              <p className="mt-5 max-w-2xl text-balance text-xl leading-8 text-white/72">
                Discover physique-inspired workout styles from iconic celebrity eras.
              </p>
              <div className="mt-8 max-w-3xl">
                <SearchBar />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Body Map"
          title="Browse by muscle emphasis"
          copy="Tap a body area to discover profiles with similar muscle focus. This is built for training inspiration, not body comparison."
        />
        <MuscleMap />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Browse"
          title="Featured eras"
          copy="Explore iconic eras through healthy, inspiration-based training patterns and muscle emphasis."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {decades.map((decade) => (
            <Link
              key={decade}
              href={`/explore?decade=${decade}`}
              className="group rounded-2xl border border-line bg-white/5 p-5 transition hover:-translate-y-1 hover:border-champagne/40"
            >
              <History className="mb-8 text-coral" />
              <h3 className="font-display text-3xl font-semibold text-white">{decade}</h3>
              <p className="mt-2 text-sm text-white/58">Browse physiques and training styles from the {decade}.</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Trending" title="Trending physiques" />
        <div className="flex flex-wrap gap-3">
          {trending.map((item) => (
            <Link
              key={item}
              href={`/search?q=${encodeURIComponent(item)}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-5 py-3 text-white/78 transition hover:border-coral/50 hover:text-white"
            >
              <Flame size={17} className="text-coral" />
              {item}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Featured" title="Celebrity-inspired profiles" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((celebrity) => (
            <CelebrityCard key={celebrity.id} celebrity={celebrity} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Aesthetics"
              title="Browse by aesthetic"
              copy="Each category opens a search for similar muscle emphasis and training-style inspiration."
            />
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-2xl bg-champagne px-5 py-3 text-sm font-semibold text-ink"
            >
              Explore all
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {aesthetics.map((aesthetic) => (
              <Link key={aesthetic} href={`/search?q=${encodeURIComponent(aesthetic)}`}>
                <Tag tone="warm">{aesthetic}</Tag>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
