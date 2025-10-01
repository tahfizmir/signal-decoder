type HeaderProps = {
  level: number;
  total: number;
  score: number;
  dark: boolean;
  onToggleDark: () => void;
};

export default function Header({ level, total, score, dark, onToggleDark }: HeaderProps) {
  return (
    <header className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-5">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-indigo-600 dark:bg-indigo-500" />
        <div>
          <h1 className="text-xl font-semibold">Signal Decoder</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">The Invisible Pattern Game</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-zinc-200 px-3 py-1 text-sm dark:border-zinc-700">
          Level <span className="font-semibold">{level + 1}</span> / {total}
        </div>
        <div className="rounded-lg border border-zinc-200 px-3 py-1 text-sm dark:border-zinc-700">
          Score <span className="font-semibold">{score}</span>
        </div>
        <button
          onClick={onToggleDark}
          className="rounded-lg border border-zinc-200 px-3 py-1 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          aria-label="Toggle theme"
        >
          {dark ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}
