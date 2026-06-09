export function SectionHeader({
  eyebrow,
  title,
  copy
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mb-6 max-w-3xl">
      {eyebrow ? <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-coral">{eyebrow}</p> : null}
      <h2 className="font-display text-3xl font-semibold tracking-normal text-white sm:text-4xl">{title}</h2>
      {copy ? <p className="mt-3 text-base leading-7 text-white/62">{copy}</p> : null}
    </div>
  );
}
