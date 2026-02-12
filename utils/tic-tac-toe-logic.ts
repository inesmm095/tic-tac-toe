export type PlayerMark = "X" | "O";
export type CellValue = PlayerMark | null;
export type GameMode = "one" | "two" | null;
export type Step = 1 | 2 | 3;

const winningLines: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateWinner(cells: CellValue[]): PlayerMark | null {
  for (const [a, b, c] of winningLines) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

export function evaluateBoard(
  cells: CellValue[]
): { winner: PlayerMark | null; isDraw: boolean } {
  const winner = calculateWinner(cells);
  if (winner) {
    return { winner, isDraw: false };
  }

  const isDraw = cells.every((cell) => cell !== null);
  return { winner: null, isDraw };
}

export function makeRandomMove(
  cells: CellValue[],
  mark: PlayerMark
): { board: CellValue[]; winner: PlayerMark | null; isDraw: boolean } {
  const emptyIndices = cells
    .map((cell, idx) => (cell === null ? idx : -1))
    .filter((idx) => idx !== -1);

  if (emptyIndices.length === 0) {
    const { winner, isDraw } = evaluateBoard(cells);
    return { board: cells, winner, isDraw };
  }

  const randomIndex =
    emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  const nextBoard = [...cells];
  nextBoard[randomIndex] = mark;

  const { winner, isDraw } = evaluateBoard(nextBoard);
  return { board: nextBoard, winner, isDraw };
}

