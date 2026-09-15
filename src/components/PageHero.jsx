import Reveal from "./Reveal";

export default function PageHero({ eyebrow, title, lede, children }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 px-5 pb-16 pt-40 sm:px-8 lg:px-12 lg:pb-20 lg:pt-48">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-20 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#b80852]/20 blur-3xl"
      />
      <Reveal className="mx-auto max-w-[1500px]">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {lede && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {lede}
          </p>
        )}
        {children}
      </Reveal>
    </section>
  );
}
