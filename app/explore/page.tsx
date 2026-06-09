import { CelebrityCard } from "@/components/CelebrityCard";
import { FilterPanel } from "@/components/FilterPanel";
import { SectionHeader } from "@/components/SectionHeader";
import { filterCelebrities, uniqueArrayValues, uniqueValues } from "@/lib/archive";

type ExplorePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams;
  const filters = {
    decade: first(params.decade),
    gender: first(params.gender),
    category: first(params.category),
    muscle: first(params.muscle),
    training: first(params.training)
  };
  const results = filterCelebrities(filters);
  const groups = [
    { label: "Decade", param: "decade", options: uniqueValues("decade") },
    { label: "Gender", param: "gender", options: uniqueValues("gender") },
    { label: "Physique", param: "category", options: uniqueArrayValues("physiqueTags") },
    { label: "Muscle", param: "muscle", options: uniqueArrayValues("muscleFocus") },
    { label: "Training", param: "training", options: uniqueArrayValues("trainingStyle") }
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Explore"
        title="Browse celebrity-era physique inspiration"
        copy="Filter by decade, aesthetic category, muscle focus, and training style. Every result is framed around similar emphasis and healthy inspiration."
      />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <FilterPanel groups={groups} />
        <section>
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm text-white/58">{results.length} profiles found</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {results.map((celebrity) => (
              <CelebrityCard key={celebrity.id} celebrity={celebrity} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
