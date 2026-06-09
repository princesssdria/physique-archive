import { CelebrityCard } from "@/components/CelebrityCard";
import { SearchBar } from "@/components/SearchBar";
import { SectionHeader } from "@/components/SectionHeader";
import { searchCelebrities } from "@/lib/archive";

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const q = Array.isArray(params.q) ? params.q[0] : params.q || "";
  const results = searchCelebrities(q);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Search"
        title={q ? `Results for "${q}"` : "Search the archive"}
        copy="Try language like thick legs, dancer body, athletic feminine, tiny waist illusion, or superhero physique."
      />
      <div className="mb-8 max-w-3xl">
        <SearchBar initialValue={q} />
      </div>
      {results.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((celebrity) => (
            <CelebrityCard key={celebrity.id} celebrity={celebrity} />
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-8 text-white/68">
          No exact matches yet. Try a broader aesthetic, muscle area, decade, or training style.
        </div>
      )}
    </main>
  );
}
