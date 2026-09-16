import Button from "./Button";
import Reveal from "./Reveal";

/* The page-level closing CTA.
 *
 * These defaults are deliberately NOT the same words the footer band uses
 * ("Ready when you are" / "Your next launch starts with a stronger story.").
 * The footer renders on every page, so when this section reused that copy the
 * two bands produced an identical <h2> twice in one document — the home page,
 * both detail-page types and the blog posts all shipped a duplicated heading.
 * Two headings with the same text give an answer engine no way to tell the two
 * sections apart, and the document outline ends up with a repeated node.
 *
 * Every page that renders this section either passes its own copy or gets the
 * distinct default below, so no page can repeat the footer's heading again.
 * If you change the footer CTA, do not copy its wording here. */
export default function CtaSection({
  eyebrow = "Next step",
  title = (
    <>
      Time to launch
      <br />{" "}
      something <span className="text-[#ff176e]">loud.</span>
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
          <Button opensLead leadSource="cta-section" size="lg">
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
