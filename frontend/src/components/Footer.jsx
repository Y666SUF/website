import React from "react";

export default function Footer() {
  return (
    <footer data-testid="footer" className="relative border-t border-cyan-400/15 bg-black">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 grid md:grid-cols-4 gap-8 items-start">
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
            NFG Games — interactive companion experiences for TikTok LIVE. Virtual points only.
          </p>
        </div>

        <div>
          <div className="label-tag">// Games</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/games/nfg-crash" className="text-zinc-300 hover:text-cyan-300 transition-colors" data-testid="footer-nfg-crash">NFG Crash</a></li>
            <li><a href="/games/nfg-wordwich" className="text-zinc-300 hover:text-cyan-300 transition-colors">NFG Wordwich</a></li>
            <li><a href="/games/nfg-wordwheel" className="text-zinc-300 hover:text-cyan-300 transition-colors">NFG Wordwheel</a></li>
            <li><a href="/games/nfg-hangman" className="text-zinc-300 hover:text-cyan-300 transition-colors">NFG Hangman</a></li>
          </ul>
        </div>

        <div>
          <div className="label-tag">// Install</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/download/nfg-crash.ipa" className="text-zinc-300 hover:text-fuchsia-300" data-testid="footer-download">Download .ipa</a></li>
            <li><a href="/sideload" className="text-zinc-300 hover:text-fuchsia-300" data-testid="footer-sideload">Sideload Guide</a></li>
            <li>
              <a
                href="https://www.tiktok.com/@y666.suf"
                target="_blank" rel="noopener noreferrer"
                data-testid="footer-tiktok"
                className="text-zinc-300 hover:text-fuchsia-300 transition-colors"
              >
                TikTok @y666.suf
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="label-tag">// Legal</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/privacy" className="text-zinc-300 hover:text-cyan-300" data-testid="footer-privacy">Privacy Policy</a></li>
            <li><a href="/legal" className="text-zinc-300 hover:text-cyan-300" data-testid="footer-legal">Legal &amp; Compliance</a></li>
            <li><span className="text-zinc-500">Game Terms</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <span>© {new Date().getFullYear()} Y666.SUF — NFG Games. Virtual points only · No cash-out.</span>
          <span>BUILD · 1.1.0</span>
        </div>
      </div>
    </footer>
  );
}
