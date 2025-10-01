type SidebarProps = {
  isFlashing: boolean;
  submitted: boolean;
  selectedCount: number;
  hint: string;
  progress: number; // 0..1
  onSubmit: () => void;
  onRestart: () => void;
};

export default function Sidebar({
  isFlashing,
  submitted,
  selectedCount,
  hint,
  progress,
  onSubmit,
  onRestart,
}: SidebarProps) {
  return (
    <aside className="flex flex-col gap-4">
      <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="mb-2 text-lg font-semibold">Phase</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {isFlashing ? "Watch the flashing pattern…" : "Select the squares you saw."}
        </p>
      </div>

      <div className="h-2 w-full rounded bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-2 rounded bg-indigo-600 transition-[width] dark:bg-indigo-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={isFlashing || submitted}
        className={[
          "rounded-2xl px-4 py-3 text-center text-base font-semibold transition",
          isFlashing || submitted
            ? "cursor-not-allowed bg-zinc-300 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400"
            : "bg-indigo-600 text-white hover:opacity-95 active:opacity-90 dark:bg-indigo-500",
        ].join(" ")}
      >
        Submit
      </button>

      {!isFlashing && !submitted && selectedCount === 0 && (
        <p className="text-xs text-zinc-500">Tip: tap squares to select them.</p>
      )}

      {submitted && (
        <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
          <h3 className="mb-1 text-base font-semibold">Feedback</h3>
          <ul className="text-sm text-zinc-700 dark:text-zinc-300">
            <li>✅ Green: correct picks</li>
            <li>❌ Red: incorrect picks</li>
            <li>🟨 Yellow: missed squares</li>
          </ul>
          <p className="mt-2 text-xs text-zinc-500">Advancing or retrying…</p>
        </div>
      )}

      {!isFlashing && !submitted && (
        <div className="rounded-2xl border border-amber-300/40 bg-amber-50 p-4 text-amber-900 dark:border-amber-400/30 dark:bg-amber-950/20 dark:text-amber-200">
          <p className="text-sm">Need a nudge? {hint}</p>
        </div>
      )}

      <button
        onClick={onRestart}
        className="rounded-2xl border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        Restart
      </button>
    </aside>
  );
}
