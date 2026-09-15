import Button from "@/components/Button";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[28rem] w-[40rem] -translate-x-1/2 rounded-full bg-[#b80852]/20 blur-3xl"
      />
      <div className="flex flex-col items-center text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
          Signal lost
        </p>
        <h1 className="mt-5 text-[clamp(4rem,12vw,9rem)] font-black uppercase leading-[0.85] tracking-[-0.06em] text-white">
          4<span className="text-[#ff176e]">0</span>4
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
          This page drifted off the launch trajectory. Let&apos;s get you back
          to the pad.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/blog" variant="outline" arrow={false}>
            Read insights
          </Button>
        </div>
      </div>
    </section>
  );
}
