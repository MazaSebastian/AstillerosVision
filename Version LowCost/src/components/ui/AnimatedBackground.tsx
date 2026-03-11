"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">

      {/* Animated gradient orbs */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.07] blur-[120px] animate-orb-1"
        style={{
          background: "radial-gradient(circle, #e53935 0%, transparent 70%)",
          top: "-10%",
          right: "-10%",
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[100px] animate-orb-2"
        style={{
          background: "radial-gradient(circle, #1e3a5f 0%, transparent 70%)",
          bottom: "10%",
          left: "-5%",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[100px] animate-orb-3"
        style={{
          background: "radial-gradient(circle, #e53935 0%, transparent 70%)",
          top: "50%",
          left: "40%",
        }}
      />

      {/* Noise texture overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
