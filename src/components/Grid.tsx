import type { Cell } from "../levels";

type GridProps = {
  cells: Cell[];
  isFlashing: boolean;
  flashOn: boolean;
  selected: number[];
  submitted: boolean;
  correctSet: Set<number>;
  onToggle: (id: number) => void;
};

export default function Grid({
  cells,
  isFlashing,
  flashOn,
  selected,
  submitted,
  correctSet,
  onToggle,
}: GridProps) {
  const cls = (id: number) => {
    const isCorrect = correctSet.has(id);
    const isPicked = selected.includes(id);

    if (isFlashing) {
      return flashOn && isCorrect
        ? "bg-yellow-300 dark:bg-yellow-400"
        : "bg-zinc-300 dark:bg-zinc-700";
    }
    if (!submitted) {
      return isPicked ? "bg-emerald-500 text-white" : "bg-zinc-300 dark:bg-zinc-700";
    }
    if (submitted) {
      if (isPicked && isCorrect) return "bg-emerald-500 text-white"; // ✅ correct pick
      if (isPicked && !isCorrect) return "bg-rose-500 text-white";   // ❌ wrong pick
      if (!isPicked && isCorrect)
        return "bg-yellow-300 dark:bg-yellow-400 ring-2 ring-yellow-500"; // missed
    }
    return "bg-zinc-300 dark:bg-zinc-700";
  };

  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-3">
      {cells.map((c) => (
        <button
          key={c.id}
          onClick={() => onToggle(c.id)}
          className={[
            "aspect-square rounded-xl text-sm font-medium transition-colors",
            "ring-offset-2 focus:outline-none focus:ring-2 focus:ring-indigo-500",
            cls(c.id),
          ].join(" ")}
          aria-label={`Cell ${c.id}`}
        >
          <span className="text-[10px] opacity-40">{c.id}</span>
        </button>
      ))}
    </div>
  );
}
