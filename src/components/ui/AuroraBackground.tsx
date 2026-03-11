"use client";

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Base dark */}
      <div className="absolute inset-0 bg-dark-950" />

      {/* Aurora wave layers – red brand palette simulating ocean waves */}
      <div
        className="absolute w-[200%] h-[60%] opacity-[0.07] blur-[80px]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, #e53935 40%, #b91c1c 60%, transparent 100%)",
          bottom: "10%",
          left: "-50%",
          animation: "aurora-wave-1 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[200%] h-[50%] opacity-[0.05] blur-[100px]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, #f87171 30%, #e53935 50%, transparent 100%)",
          bottom: "20%",
          left: "-30%",
          animation: "aurora-wave-2 16s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[180%] h-[40%] opacity-[0.04] blur-[120px]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, #fca5a5 30%, #f87171 60%, transparent 100%)",
          bottom: "5%",
          left: "-40%",
          animation: "aurora-wave-3 20s ease-in-out infinite",
        }}
      />

      {/* Subtle white highlight shimmer on top */}
      <div
        className="absolute w-[150%] h-[30%] opacity-[0.02] blur-[80px]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
          top: "15%",
          left: "-25%",
          animation: "aurora-wave-2 18s ease-in-out infinite reverse",
        }}
      />

      {/* Noise texture for organic feel */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <filter id="auroraNoiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#auroraNoiseFilter)" />
      </svg>

      <style jsx>{`
        @keyframes aurora-wave-1 {
          0%, 100% { transform: translateX(0%) translateY(0%) rotate(-2deg); }
          33% { transform: translateX(8%) translateY(-5%) rotate(1deg); }
          66% { transform: translateX(-5%) translateY(3%) rotate(-1deg); }
        }
        @keyframes aurora-wave-2 {
          0%, 100% { transform: translateX(0%) translateY(0%) rotate(1deg); }
          40% { transform: translateX(-10%) translateY(-8%) rotate(-2deg); }
          70% { transform: translateX(6%) translateY(4%) rotate(2deg); }
        }
        @keyframes aurora-wave-3 {
          0%, 100% { transform: translateX(0%) translateY(0%); }
          50% { transform: translateX(12%) translateY(-6%) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
}
