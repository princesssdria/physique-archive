import { MuscleMap } from "@/components/MuscleMap";
import { SectionHeader } from "@/components/SectionHeader";

export default function MuscleMapPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Muscle Map"
        title="Tap a muscle focus area"
        copy="A MuscleWiki-style discovery surface for finding profiles with similar muscle emphasis across shoulders, chest, arms, abs, glutes, legs, calves, and back."
      />
      <MuscleMap />
    </main>
  );
}
