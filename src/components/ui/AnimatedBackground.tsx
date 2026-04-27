"use client";


export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Top gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-radial-gradient" />

      {/* Floating orbs */}
      <div
        className="absolute top-20 left-[10%] w-72 h-72 rounded-full animate-float opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-40 right-[15%] w-96 h-96 rounded-full animate-float-delay opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-20 left-[30%] w-64 h-64 rounded-full animate-float opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
          animationDelay: "4s",
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}