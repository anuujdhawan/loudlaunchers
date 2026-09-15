import Link from "next/link";
import Image from "next/image";

export default function Logo({ href = "/", compact = false }) {
  return (
    <Link
      href={href}
      aria-label="Loud Launchers home"
      className="group flex items-center gap-3 rounded-xl px-1 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-400"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] shadow-lg shadow-pink-500/10 transition duration-300 group-hover:rotate-3 group-hover:scale-105 group-hover:border-[#ff176e]/40">
        <Image
          src="/logo-mark.webp"
          alt="Loud Launchers logo"
          width={40}
          height={40}
          priority
          className="h-10 w-10 object-contain drop-shadow-[0_0_10px_rgba(255,23,110,.4)]"
        />
      </span>
      {!compact && (
        <span className="hidden sm:block">
          <span className="block text-sm font-black uppercase leading-none tracking-[0.12em] text-white">
            Loud <span className="text-[#ff2d7d]">Launchers</span>
          </span>
          <span className="mt-1.5 block text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Digital launch studio
          </span>
        </span>
      )}
    </Link>
  );
}
