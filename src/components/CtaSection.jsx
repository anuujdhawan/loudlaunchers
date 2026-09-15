import Button from "./Button";
import Reveal from "./Reveal";

export default function CtaSection({
  eyebrow = "Ready when you are",
  title = (
    <>
      Your next launch starts
      <br />
      with a stronger <span className="text-[#ff176e]">story.</span>
    </>
  ),
  lede = "Whether you need a powerful website, a connected mobile app, stronger visibility, a sharper brand or better day-to-day digital momentum — we are ready to help you move forward with confidence.",
}) {
  return (
    <section className="relative overflow-hidden border-t border-white/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full bg-[#b80852]/20 blur-3xl"
      />
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
          {eyebrow}
        </p>
        <h2 className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl">
          {title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          {lede}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" size="lg">
            Start a project
          </Button>
          <Button href="/blog" variant="outline" size="lg" arrow={false}>
            Read insights
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
