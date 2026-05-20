import React from "react";

export default function Footer() {
  return (
    <footer data-testid="footer" className="relative border-t border-cyan-400/15 bg-black">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 grid md:grid-cols-3 gap-8 items-start">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-cyan-400/60 bg-black">
              <span className="font-display font-black text-cyan-300 text-sm">Y</span>
            </span>
            <span className="font-display font-black text-white tracking-tight text-xl">
              Y666<span className="neon-text-cyan">.</span>SUF
            </span>
          </div>
          <p className="mt-4 text-sm text-zinc-500 max-w-xs">
            Interactive cosmic mini-games engineered for TikTok Live. Built by the void, played in the feed.
          </p>
        </div>

        <div>
          <div className="label-tag">// Channels</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="https://www.tiktok.com/@y666.suf"
                target="_blank" rel="noopener noreferrer"
                data-testid="footer-tiktok"
                className="text-zinc-300 hover:text-cyan-300 transition-colors"
              >
                TikTok · @y666.suf
              </a>
            </li>
            <li><span className="text-zinc-600">YouTube · soon</span></li>
            <li><span className="text-zinc-600">Discord · soon</span></li>
          </ul>
        </div>

        <div>
          <div className="label-tag">// Transmission</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#featured" className="text-zinc-300 hover:text-fuchsia-300">NFG Crash</a></li>
            <li><a href="#games" className="text-zinc-300 hover:text-fuchsia-300">Arsenal</a></li>
            <li><a href="#leaderboard" className="text-zinc-300 hover:text-fuchsia-300">Leaderboard</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <span>© {new Date().getFullYear()} Y666.SUF — All transmissions encrypted.</span>
          <span>BUILD · 1.0.0-VOID</span>
        </div>
      </div>
    </footer>
  );
}
