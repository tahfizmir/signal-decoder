type SidebarProps = {
  isFlashing: boolean;
  submitted: boolean;
  selectedCount: number;
  hint: string;
  progress: number;
  giveHint: boolean;
  onGiveHint: () => void;
  lastPerfect?: boolean;
  onNextLevel?: () => void;
  onSubmit: () => void;
  onRestart: () => void;
};

export default function Sidebar({
  isFlashing,
  submitted,
  selectedCount,
  hint,
  progress,
  giveHint,
  lastPerfect,
  onNextLevel,
  onSubmit,
  onRestart,
  onGiveHint,
}: SidebarProps) {
  return (
    <aside className="flex flex-col gap-4">
      <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="mb-2 text-lg font-semibold">Phase</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {isFlashing
            ? "Watch the flashing pattern…"
            : "Select the squares you saw."}
        </p>
      </div>

      <div className="h-2 w-full rounded bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-2 rounded bg-indigo-600 transition-[width] dark:bg-indigo-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {!submitted && (
        <button
          onClick={onSubmit}
          disabled={isFlashing}
          className={[
            "rounded-2xl px-4 py-3 text-center text-base font-semibold transition",
            isFlashing
              ? "cursor-not-allowed bg-zinc-300 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400"
              : "bg-indigo-600 text-white hover:opacity-95 active:opacity-90 dark:bg-indigo-500",
          ].join(" ")}
        >
          Submit
        </button>
      )}

      {submitted && lastPerfect && (
        <button
          onClick={onNextLevel}
          className="rounded-2xl bg-emerald-600 px-4 py-3 text-center text-base font-semibold text-white hover:opacity-95 active:opacity-90 dark:bg-emerald-500"
        >
          Next Level
        </button>
      )}

      {!isFlashing && !submitted && selectedCount === 0 && (
        <p className="text-xs text-zinc-500">
          Tip: tap squares to select them.
        </p>
      )}

      {submitted && (
        <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
          <h3 className="mb-1 text-base font-semibold">Feedback</h3>
          <ul className="text-sm text-zinc-700 dark:text-zinc-300">
            <li>✅ Green: correct picks</li>
            <li>❌ Red: incorrect picks</li>
            <li>🟨 Yellow: missed squares</li>
          </ul>
          {lastPerfect ? (
            <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">Perfect round! You can proceed.</p>
          ) : (
            <p className="mt-2 text-xs text-zinc-500">Review your result or restart.</p>
          )}
        </div>
      )}
      {!isFlashing && (
        <button
          onClick={onGiveHint}
          className="rounded-2xl border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          {!giveHint ? "Show hint" : "Hide"}
        </button>
      )}
      {!isFlashing && !submitted && giveHint && (
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
      <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800 shadow-md">
  <h3 className="mb-3 text-lg font-semibold text-indigo-600 dark:text-indigo-400">
    How to Play
  </h3>
  <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-700 dark:text-zinc-300 ml-1">
    <li>
      <strong>Watch:</strong> Memorize the squares that flash during the **Watch Phase**.
    </li>
    <li>
      <strong>Select:</strong> When the phase changes, tap the grid to select the squares you saw.
    </li>
    <li>
      <strong>Submit:</strong> Click **Submit** to check your memory and score points.
    </li>
    <li>
      <strong>Advance:</strong> Click **Restart** to move to the next level. (Clicking Restart before submitting resets your score.)
    </li>
    <li>
      <strong>Tip:</strong> Use the **Show Hint** button if you need a clue during the selection phase.
    </li>
  </ol>
</div>
    </aside>
  );
}
