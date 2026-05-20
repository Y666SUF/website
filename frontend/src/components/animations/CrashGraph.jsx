import React, { useEffect, useState } from "react";

/**
 * Animated crash graph for NFG Crash.
 * - Multiplier climbs along a curve, then crashes vertically.
 * - Tick counter syncs with curve progression.
 * - Loops forever.
 *
 * Props:
 *   variant: "hero" | "card"   — hero is larger / shows tick counter.
 */
export default function CrashGraph({ variant = "hero" }) {
  const [cycle, setCycle] = useState(0);

  // Cycle: 0..1 climbing, ~1.0 crash, then reset.
  const DURATION = 5200; // ms per round (climb + crash + pause)
  const CLIMB_END = 0.78;
  const CRASH_END = 0.86;
  const PAUSE_END = 1.0;

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = ((now - start) % DURATION) / DURATION;
      setCycle(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Multiplier value
  const climbT = Math.min(cycle / CLIMB_END, 1);
  // Exponential climb feels right for a crash-style game
  const mult = Math.pow(1 + 24 * climbT, 1) / (1 + 0) ;
  const displayMult = (1 + Math.pow(climbT, 1.8) * 23.62).toFixed(2);

  // Curve path
  // From (5,180) going up-right, ease-out curve to (380, climbTopY)
  // After CLIMB_END → straight vertical drop to bottom.
  const W = 400;
  const H = 220;

  // Build path up to current cycle progress
  const samples = 50;
  let d = `M 8 ${H - 18}`;
  const lastClimbPoint = { x: 8, y: H - 18 };
  for (let i = 1; i <= samples; i++) {
    const p = i / samples;
    if (p > climbT) break;
    const x = 8 + p * (W - 80);
    // exponential rise
    const y = H - 18 - Math.pow(p, 1.6) * (H - 60);
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    lastClimbPoint.x = x;
    lastClimbPoint.y = y;
  }

  // Crash phase: vertical drop straight down
  const crashing = cycle >= CLIMB_END && cycle < CRASH_END;
  const crashed = cycle >= CRASH_END && cycle < PAUSE_END;

  let crashPath = "";
  if (crashing || crashed) {
    const crashT = Math.min((cycle - CLIMB_END) / (CRASH_END - CLIMB_END), 1);
    const fallY = lastClimbPoint.y + crashT * (H - 18 - lastClimbPoint.y);
    crashPath = `M ${lastClimbPoint.x.toFixed(1)} ${lastClimbPoint.y.toFixed(1)} L ${lastClimbPoint.x.toFixed(1)} ${fallY.toFixed(1)}`;
  }

  // Marker dot at the head
  const headX = lastClimbPoint.x;
  const headY = crashing || crashed ? H - 18 : lastClimbPoint.y;

  // Color shifts: cyan while climbing → magenta on crash
  const lineColor = crashing || crashed ? "#FF003C" : "#00F0FF";
  const glowColor = crashing || crashed ? "#FF003C" : "#00F0FF";

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ filter: `drop-shadow(0 0 12px ${glowColor}88)` }}
      >
        {/* Grid lines */}
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
          {[0.2, 0.4, 0.6, 0.8].map((p) => (
            <line key={`h${p}`} x1="0" y1={H * p} x2={W} y2={H * p} />
          ))}
          {[0.25, 0.5, 0.75].map((p) => (
            <line key={`v${p}`} x1={W * p} y1="0" x2={W * p} y2={H} />
          ))}
        </g>

        {/* Climb path */}
        <path
          d={d}
          fill="none"
          stroke={lineColor}
          strokeWidth={variant === "hero" ? 3 : 2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Fill under curve */}
        <path
          d={`${d} L ${lastClimbPoint.x.toFixed(1)} ${H} L 8 ${H} Z`}
          fill={`url(#crash-grad-${variant})`}
          opacity={crashing || crashed ? 0.15 : 0.28}
        />

        {/* Crash vertical drop */}
        {(crashing || crashed) && (
          <path
            d={crashPath}
            stroke="#FF003C"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="4 3"
          />
        )}

        {/* Head dot */}
        <circle
          cx={headX}
          cy={headY}
          r={crashing ? 7 : 5}
          fill={lineColor}
          opacity={crashed ? 0.4 : 1}
        >
          {!crashing && !crashed && (
            <animate attributeName="r" values="4;7;4" dur="1.2s" repeatCount="indefinite" />
          )}
        </circle>

        <defs>
          <linearGradient id={`crash-grad-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Multiplier readout */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div
            className="font-display font-black tracking-tighter leading-none"
            style={{
              fontSize: variant === "hero" ? "clamp(3rem, 8vw, 6rem)" : "2.2rem",
              color: crashing || crashed ? "#FF003C" : "#fff",
              textShadow:
                crashing || crashed
                  ? "0 0 30px rgba(255,0,60,0.8), 0 0 60px rgba(255,0,60,0.4)"
                  : "0 0 24px rgba(0,240,255,0.6)",
              transition: "color .15s linear",
            }}
          >
            {crashed ? "CRASHED" : crashing ? "CRASH!" : `${displayMult}×`}
          </div>
          {variant === "hero" && (
            <div className="mt-2 font-mono text-[0.65rem] tracking-[0.3em] text-zinc-500 uppercase">
              {crashed ? "round complete · next in" : crashing ? "void wins" : "multiplier climbing"}
            </div>
          )}
        </div>
      </div>

      {/* Corner ticks */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-start text-[0.6rem] font-mono uppercase tracking-[0.25em] pointer-events-none">
        <span className="text-cyan-400 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          LIVE
        </span>
        <span className="text-zinc-500">ROUND · {Math.floor((Date.now() / DURATION) % 9999).toString().padStart(4, "0")}</span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-[0.6rem] font-mono uppercase tracking-[0.25em] pointer-events-none">
        <span className="text-zinc-500">PEAK · 24.62×</span>
        <span className="text-fuchsia-400">CASH-OUT WINDOW</span>
      </div>
    </div>
  );
}
