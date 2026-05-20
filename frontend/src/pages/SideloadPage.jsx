import React from "react";
import CosmicSubpageShell from "@/components/CosmicSubpageShell";

export default function SideloadPage() {
  return (
    <CosmicSubpageShell testId="sideload-page-shell">
      <div className="mx-auto max-w-5xl px-6 md:px-10 mt-8">
        <div className="rounded-2xl border border-cyan-400/30 bg-black/65 p-7 md:p-9" data-testid="sideload-header">
          <span className="label-tag">// iPhone setup</span>
          <h1 className="mt-3 font-display font-black uppercase text-4xl md:text-5xl tracking-tight">
            Install NFG <span className="neon-text-cyan">Crash</span>
          </h1>
          <p className="mt-4 text-zinc-300">
            This guide is for test installs before App Store release. Download the latest IPA and install using Sideloadly
            (Windows/Mac) or AltStore.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href="https://y666suf.com/download/nfg-crash.ipa" className="btn-neon" data-testid="sideload-download-ipa">
              ► Download NFG Crash .ipa
            </a>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <article className="rounded-2xl border border-cyan-400/20 bg-black/55 p-6" data-testid="sideload-method-sideloadly">
            <h2 className="font-display font-black uppercase text-2xl tracking-tight">
              Method 1: Sideloadly (recommended on Windows)
            </h2>
            <ol className="mt-4 space-y-3 text-zinc-300 text-sm list-decimal list-inside">
              <li>Install iTunes + iCloud from Apple website (not Microsoft Store).</li>
              <li>
                Install Sideloadly from{" "}
                <a className="text-cyan-300" href="https://sideloadly.io/">
                  sideloadly.io
                </a>
                .
              </li>
              <li>Connect iPhone to PC, unlock device, tap Trust if prompted.</li>
              <li>Open Sideloadly, choose your device, drag in the downloaded `.ipa`.</li>
              <li>Sign with your Apple ID and start sideload.</li>
              <li>On iPhone: Settings -&gt; General -&gt; VPN &amp; Device Management -&gt; Trust your developer profile.</li>
              <li>On iOS 16+: enable Developer Mode in Settings -&gt; Privacy &amp; Security.</li>
            </ol>
          </article>

          <article className="rounded-2xl border border-fuchsia-400/20 bg-black/55 p-6" data-testid="sideload-video-card">
            <h2 className="font-display font-black uppercase text-2xl tracking-tight">Video tutorial</h2>
            <p className="mt-6 text-zinc-400 text-xs">
              Video walkthrough:{" "}
              <a className="text-cyan-300" href="https://www.youtube.com/watch?v=x_gvrT2tv-g" data-testid="sideload-video-link">
                Install Sideloadly Properly: Windows Guide
              </a>
            </p>
          </article>
        </div>

        <article className="mt-6 rounded-2xl border border-fuchsia-400/20 bg-black/55 p-6" data-testid="sideload-method-altstore">
          <h2 className="font-display font-black uppercase text-2xl tracking-tight">Method 2: AltStore (alternative)</h2>
          <p className="mt-4 text-zinc-300 text-sm">
            If you prefer AltStore, use the official docs:
            {" "}
            <a className="text-cyan-300" href="https://faq.altstore.io/">
              faq.altstore.io
            </a>
          </p>
        </article>
      </div>
    </CosmicSubpageShell>
  );
}
