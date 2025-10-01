import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import Grid from "./components/Grid";
import Sidebar from "./components/Sidebar";
import { DURATION_MS, grid, hintForLevel, levels } from "./levels";

export default function App() {
  const [level, setLevel] = useState(0);
  const [isFlashing, setIsFlashing] = useState(true);
  const [flashOn, setFlashOn] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [dark, setDark] = useState(true);
  const [progress, setProgress] = useState(0);

  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const correctSet = useMemo(() => {
    const ids = grid.filter(levels[level]).map((c) => c.id);
    return new Set(ids);
  }, [level]);

  // flashing + timer
  useEffect(() => {
    setSelected([]);
    setSubmitted(false);
    setIsFlashing(true);
    setFlashOn(false);
    setProgress(0);
    startRef.current = null;

    // blink each 500ms
    const intId = setInterval(() => setFlashOn((p) => !p), 500);

    //  progress bar
    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const elapsed = t - startRef.current!;
      setProgress(Math.min(1, elapsed / DURATION_MS));
      if (elapsed < DURATION_MS) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setIsFlashing(false);
        setFlashOn(false);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      clearInterval(intId);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [level]);

  const toggleCell = (id: number) => {
    if (isFlashing || submitted) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const onSubmit = () => {
    if (submitted || isFlashing) return;
    setSubmitted(true);

    const isPerfect =
      selected.length === correctSet.size && selected.every((id) => correctSet.has(id));

    const correctPicks = selected.filter((id) => correctSet.has(id)).length;
    const wrongPicks = selected.length - correctPicks;
    const partial = Math.max(0, correctPicks - wrongPicks);
    setScore((s) => s + (isPerfect ? 10 : partial));

    setTimeout(() => {
      if (isPerfect) setLevel((l) => (l + 1) % levels.length);
      setSubmitted(false);
      // re-trigger flashing 
      setIsFlashing(true);
      setSelected([]);
      setProgress(0);
      startRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }, 1200);
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-white text-zinc-900 transition-colors dark:bg-zinc-900 dark:text-zinc-100">
        <Header
          level={level}
          total={levels.length}
          score={score}
          dark={dark}
          onToggleDark={() => setDark((d) => !d)}
        />

        <main className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-4 pb-10 md:grid-cols-3">
          <section className="md:col-span-2">
            <Grid
              cells={grid}
              isFlashing={isFlashing}
              flashOn={flashOn}
              selected={selected}
              submitted={submitted}
              correctSet={correctSet}
              onToggle={toggleCell}
            />
          </section>

          <Sidebar
            isFlashing={isFlashing}
            submitted={submitted}
            selectedCount={selected.length}
            hint={hintForLevel(level)}
            progress={progress}
            onSubmit={onSubmit}
            onRestart={() => {
              setLevel(0);
              setScore(0);
              setSelected([]);
              setSubmitted(false);
              setIsFlashing(true);
              setProgress(0);
            }}
          />
        </main>

        <footer className="mx-auto max-w-4xl px-4 pb-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
          Built by Tahfiz using react and typescript.
        </footer>
      </div>
    </div>
  );
}
