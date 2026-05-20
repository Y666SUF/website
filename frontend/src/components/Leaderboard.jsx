import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      let res = await axios.get(`${API}/leaderboard?game=nfg_crash&limit=12`);
      if (!res.data || res.data.length === 0) {
        await axios.post(`${API}/leaderboard/seed`);
        res = await axios.get(`${API}/leaderboard?game=nfg_crash&limit=12`);
      }
      setEntries(res.data || []);
      setError(null);
    } catch (e) {
      console.error(e);
      setError("signal lost");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <section id="leaderboard" data-testid="leaderboard-section" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <span className="label-tag">// NFG CRASH</span>
          <h2 className="font-display font-black uppercase text-4xl md:text-6xl tracking-tighter mt-3">
            TOP OF THE <span className="neon-text-cyan">VOID</span>
          </h2>
          <p className="mt-5 text-zinc-400 max-w-md">
            Live leaderboard pulled straight from the NFG Crash engine.
            Submit a score from the game and your name lights up the constellation.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={load}
              data-testid="leaderboard-refresh"
              className="btn-ghost text-xs"
            >
              ↻ Refresh Signal
            </button>
            <span className="font-mono text-xs text-zinc-500">{entries.length} / 12</span>
          </div>

          <div className="mt-10 hidden lg:block">
            <div className="rounded-2xl border border-cyan-400/20 p-5 bg-black/60">
              <div className="label-tag">// API ENDPOINT</div>
              <code className="block mt-2 font-mono text-xs text-cyan-300 break-all">
                POST /api/leaderboard/score
              </code>
              <pre className="mt-3 font-mono text-[0.7rem] text-zinc-400 leading-relaxed whitespace-pre-wrap">{`{
  "player_name": "VOIDRUNNER",
  "score": 98420,
  "multiplier": 24.6,
  "game": "nfg_crash"
}`}</pre>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div
            data-testid="leaderboard-table"
            className="relative rounded-2xl border border-cyan-400/25 bg-black/70 overflow-hidden grain-overlay"
            style={{ boxShadow: "0 0 50px -10px rgba(0,240,255,0.18)" }}
          >
            <div className="px-6 py-4 border-b border-cyan-400/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-300">/ leaderboard.nfg_crash</span>
              </div>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">live · auto-sync</span>
            </div>

            {loading ? (
              <div className="p-10 text-center font-mono text-sm text-zinc-500" data-testid="leaderboard-loading">
                ⟳ pulling signal...
              </div>
            ) : error ? (
              <div className="p-10 text-center font-mono text-sm text-red-400">
                {error}
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-12 px-6 py-3 text-[0.65rem] font-mono uppercase tracking-[0.25em] text-zinc-500 border-b border-white/5">
                  <span className="col-span-1">#</span>
                  <span className="col-span-6">Player</span>
                  <span className="col-span-3 text-right">Score</span>
                  <span className="col-span-2 text-right">Mult</span>
                </div>
                {entries.map((e, idx) => (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    data-testid={`leaderboard-row-${idx}`}
                    className={`grid grid-cols-12 px-6 py-3 items-center border-b border-white/5 last:border-b-0 hover:bg-cyan-400/5 transition-colors ${
                      idx === 0 ? "bg-cyan-400/[0.04]" : ""
                    }`}
                  >
                    <span className={`col-span-1 font-mono text-sm ${
                      idx === 0 ? "neon-text-cyan font-bold" : idx === 1 ? "text-fuchsia-300" : idx === 2 ? "text-purple-300" : "text-zinc-500"
                    }`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="col-span-6 font-display font-semibold tracking-tight text-white truncate">
                      {idx === 0 && <span className="text-cyan-400 mr-2">★</span>}
                      {e.player_name}
                    </span>
                    <span className="col-span-3 text-right font-mono text-sm tabular-nums text-white">
                      {e.score.toLocaleString()}
                    </span>
                    <span className="col-span-2 text-right font-mono text-xs text-fuchsia-300">
                      {e.multiplier ? `${e.multiplier.toFixed(1)}x` : "—"}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
