/** Decorative soft gradient blobs used as a page background. */
export function GradientBlobs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-indigo-400/20 blur-[140px] dark:bg-indigo-600/20" />
      <div className="absolute top-[20%] right-[-10%] h-[34rem] w-[34rem] rounded-full bg-purple-400/20 blur-[150px] dark:bg-purple-600/15" />
      <div className="absolute bottom-[-10%] left-[20%] h-[32rem] w-[32rem] rounded-full bg-cyan-300/20 blur-[150px] dark:bg-cyan-500/10" />
      {/* Subtle dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground) / 0.18) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
    </div>
  );
}
