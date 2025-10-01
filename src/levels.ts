
export type Cell = { id: number; row: number; col: number };

export const N = 5;
export const DURATION_MS = 10_000;

export const grid: Cell[] = Array.from({ length: N * N }, (_, id) => ({
  id,
  row: Math.floor(id / N),
  col: id % N,
}));


export const levels: Array<(c: Cell) => boolean> = [
  // 1) even indices
  (c) => c.id % 2 === 0,
  // 2) diagonals
  (c) => c.row === c.col || c.row + c.col === N - 1,
  // 3) primes by index
  (c) => {
    if (c.id < 2) return false;
    for (let i = 2; i * i <= c.id; i++) if (c.id % i === 0) return false;
    return true;
  },
  // 4) center cluster (12 plus its neighbors)
  (c) => {
    const center = 12;
    return (
      c.id === center ||
      c.id === center - 1 ||
      c.id === center + 1 ||
      c.id === center - N ||
      c.id === center + N
    );
  },
  // 5) (row + col) % 3 === 0
  (c) => (c.row + c.col) % 3 === 0,
];

export const hintForLevel = (level: number) => {
  switch (level) {
    case 0: return "Think even positions (0-based).";
    case 1: return "Look at both diagonals.";
    case 2: return "Only divisible by 1 and itself.";
    case 3: return "Center (12) and its neighbors.";
    case 4: return "(row + col) with a modulus.";
    default: return "";
  }
};
