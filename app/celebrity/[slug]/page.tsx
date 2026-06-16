import { notFound } from "next/navigation";
import Image from "next/image";
import { Activity, AlertTriangle, Dumbbell, Sparkles, Utensils } from "lucide-react";
import { CelebrityCard } from "@/components/CelebrityCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Tag } from "@/components/Tag";
import { celebrities } from "@/data/celebrities";
import { getCelebrityBySlug, getSimilarCelebrities } from "@/lib/archive";

type CelebrityPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return celebrities.map((celebrity) => ({ slug: celebrity.slug }));
}

function fuelingIdeas(muscleFocus: string[], trainingStyle: string[]) {
  const lowerFocus = muscleFocus.join(" ").toLowerCase();
  const lowerStyle = trainingStyle.join(" ").toLowerCase();
  const lowerBody = lowerFocus.includes("glutes") || lowerFocus.includes("quads") || lowerFocus.includes("hamstrings");
  const highOutput =
    lowerStyle.includes("dance") ||
    lowerStyle.includes("boxing") ||
    lowerStyle.includes("hiit") ||
    lowerStyle.includes("conditioning");

  return [
    lowerBody
      ? "Protein-forward meals with carbs around lower-body sessions, such as eggs with toast, chicken and rice, tofu bowls, or Greek yogurt with fruit."
      : "Protein-forward meals that support recovery, such as salmon or tofu with potatoes, turkey wraps, lentil bowls, or Greek yogurt with berries.",
    highOutput
      ? "Hydrating snacks before performance work, such as a banana with peanut butter, oatmeal, fruit and yogurt, or a smoothie."
      : "Steady energy meals with whole-food carbs, colorful produce, and healthy fats, such as rice bowls, pasta with lean protein, or avocado toast with eggs.",
    "Post-workout recovery options: protein plus carbs within a comfortable window, plenty of fluids, and enough total food to support training quality."
  ];
}

export default async function CelebrityPage({ params }: CelebrityPageProps) {
  const { slug } = await params;
  const celebrity = getCelebrityBySlug(slug);

  if (!celebrity) {
    notFound();
  }

  const similar = getSimilarCelebrities(celebrity);
  const fuel = fuelingIdeas(celebrity.muscleFocus, celebrity.trainingStyle);

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={celebrity.image}
            alt={`${celebrity.name} inspired profile visual`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/82 to-ink" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/72 backdrop-blur">
              <Sparkles size={16} className="text-champagne" />
              Similar physique focus / inspired by
            </div>
            <h1 className="font-display text-5xl font-semibold tracking-normal text-white sm:text-7xl">
              {celebrity.name}
            </h1>
            <p className="mt-4 text-xl text-white/72">
              {celebrity.era} / {celebrity.years}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">{celebrity.physiqueDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {celebrity.physiqueTags.map((tag) => (
                <Tag key={tag} tone="warm">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="glass rounded-2xl p-6">
          <Activity className="mb-4 text-mint" />
          <h2 className="font-display text-2xl font-semibold text-white">Physique Breakdown</h2>
          <p className="mt-3 text-sm leading-6 text-white/62">
            This explains why the profile appears in the archive and which muscle groups the inspired routine
            prioritizes.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {celebrity.muscleFocus.map((focus) => (
              <Tag key={focus} tone="mint">
                {focus}
              </Tag>
            ))}
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-white/66">
            {celebrity.muscleFocus.slice(0, 4).map((focus, index) => (
              <li key={focus}>
                {index === 0 ? "Primary focus" : "Supporting focus"}: {focus}, trained through safe progression,
                control, and recovery.
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-2xl p-6">
          <Dumbbell className="mb-4 text-coral" />
          <h2 className="font-display text-2xl font-semibold text-white">Likely Training Style</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {celebrity.trainingStyle.map((style) => (
              <Tag key={style}>{style}</Tag>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-white/66">
            These are inferred training themes from the era, role, sport, or performance style. They are not a claim
            about the celebrity&apos;s exact private routine.
          </p>
        </div>
        <div className="glass rounded-2xl p-6">
          <AlertTriangle className="mb-4 text-champagne" />
          <h2 className="font-display text-2xl font-semibold text-white">Reality Check</h2>
          <p className="mt-5 text-sm leading-6 text-white/66">{celebrity.disclaimer}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Workout Inspiration"
          title="Example routine"
          copy="A sample training template with sets, reps, rest, and intensity. Use it as inspiration, not as a claim about the celebrity's exact routine."
        />
        <div className="grid gap-5 lg:grid-cols-4">
          {celebrity.workoutPlan.map((day) => (
            <article key={day.title} className="rounded-2xl border border-line bg-white/5 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral">{day.focus}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white">{day.title}</h3>
              <ul className="mt-4 space-y-4 text-sm text-white/68">
                {day.exercises.map((exercise) => (
                  <li key={exercise.name} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    <span className="block font-semibold text-white">{exercise.name}</span>
                    <span className="mt-1 block">
                      {exercise.sets} sets x {exercise.reps} / rest {exercise.rest}
                    </span>
                    <span className="mt-1 block text-white/50">{exercise.intensity}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
          <article className="rounded-2xl border border-line bg-white/5 p-5">
            <Utensils className="mb-4 text-mint" />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Fueling Ideas</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-white">Support the goal</h3>
            <ul className="mt-4 space-y-4 text-sm leading-6 text-white/68">
              {fuel.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-5 text-white/45">
              No calorie targets or restrictive diet advice. Adjust for your body, preferences, culture, health needs,
              and professional guidance.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="More Like This" title="Similar physique inspiration" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {similar.map((item) => (
            <CelebrityCard key={item.id} celebrity={item} compact />
          ))}
        </div>
      </section>
    </main>
  );
}
