import { celebrities, type Celebrity } from "@/data/celebrities";

export type Filters = {
  decade?: string;
  gender?: string;
  category?: string;
  muscle?: string;
  training?: string;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replaceAll("superhero build", "superhero physique")
    .replaceAll("dancer body", "dancer physique")
    .trim();

export function getCelebrityBySlug(slug: string) {
  return celebrities.find((celebrity) => celebrity.slug === slug);
}

export function uniqueValues(key: keyof Pick<Celebrity, "decade" | "gender">) {
  return Array.from(new Set(celebrities.map((celebrity) => celebrity[key])));
}

export function uniqueArrayValues(key: keyof Pick<Celebrity, "physiqueTags" | "muscleFocus" | "trainingStyle">) {
  return Array.from(new Set(celebrities.flatMap((celebrity) => celebrity[key]))).sort();
}

export function filterCelebrities(filters: Filters) {
  return celebrities.filter((celebrity) => {
    const matchesDecade = !filters.decade || celebrity.decade === filters.decade;
    const matchesGender = !filters.gender || celebrity.gender === filters.gender;
    const matchesCategory = !filters.category || celebrity.physiqueTags.includes(filters.category);
    const matchesMuscle = !filters.muscle || celebrity.muscleFocus.includes(filters.muscle);
    const matchesTraining = !filters.training || celebrity.trainingStyle.includes(filters.training);

    return matchesDecade && matchesGender && matchesCategory && matchesMuscle && matchesTraining;
  });
}

export function searchCelebrities(query: string) {
  const q = normalize(query);
  if (!q) return celebrities.slice(0, 12);

  return celebrities
    .map((celebrity) => {
      const haystack = [
        celebrity.name,
        celebrity.era,
        celebrity.decade,
        ...celebrity.physiqueTags,
        ...celebrity.muscleFocus,
        ...celebrity.trainingStyle,
        ...celebrity.searchKeywords
      ]
        .map(normalize)
        .join(" ");

      const score = q
        .split(/\s+/)
        .reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), haystack.includes(q) ? 4 : 0);

      return { celebrity, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.celebrity);
}

export function getSimilarCelebrities(source: Celebrity, limit = 4) {
  const sourceTags = new Set([...source.physiqueTags, ...source.muscleFocus, ...source.trainingStyle]);

  return celebrities
    .filter((celebrity) => celebrity.id !== source.id)
    .map((celebrity) => ({
      celebrity,
      score: [...celebrity.physiqueTags, ...celebrity.muscleFocus, ...celebrity.trainingStyle].filter((tag) =>
        sourceTags.has(tag)
      ).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.celebrity);
}

export function getCelebritiesByMuscle(muscle: string) {
  return celebrities.filter((celebrity) => celebrity.muscleFocus.includes(muscle));
}
