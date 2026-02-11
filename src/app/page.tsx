"use client";

import { useState } from "react";

type PlayerMark = "X" | "O";
type CellValue = PlayerMark | null;

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

export default function Home() {
  const [playerX, setPlayerX] = useState<string>("Player 1");
  const [playerO, setPlayerO] = useState<string>("Player 2");
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<PlayerMark>("X");
  const [winner, setWinner] = useState<PlayerMark | "Draw" | null>(null);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const currentPlayerName =
    currentPlayer === "X" ? playerX.trim() || "Player 1" : playerO.trim() || "Player 2";

  const handleStartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setIsGameStarted(true);
  };

  const handleCellClick = (index: number) => {
    if (!isGameStarted || winner || board[index] !== null) return;

    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;
    setBoard(nextBoard);

    const nextWinner = calculateWinner(nextBoard);
    if (nextWinner) {
      setWinner(nextWinner);
      return;
    }

    if (nextBoard.every((cell) => cell !== null)) {
      setWinner("Draw");
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleResetBoard = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setIsGameStarted(false);
  };

  const handleResetEverything = () => {
    setPlayerX("Player 1");
    setPlayerO("Player 2");
    handleResetBoard();
  };

  const statusMessage = () => {
    if (!isGameStarted) {
      return "Enter player names and start the game.";
    }

    if (winner === "Draw") {
      return "It's a draw! Reset to play again.";
    }

    if (winner) {
      const winnerName =
        winner === "X" ? playerX.trim() || "Player 1" : playerO.trim() || "Player 2";
      return `Winner: ${winnerName} (${winner})`;
    }

    return `Current turn: ${currentPlayerName} (${currentPlayer})`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 font-sans dark:bg-zinc-950">
      <main className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
        <h1 className="mb-4 text-center text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Tic Tac Toe
        </h1>

        <section className="mb-6 space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Players
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-300">
                Player X
              </label>
              <input
                type="text"
                value={playerX}
                onChange={(e) => setPlayerX(e.target.value)}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
                placeholder="Player X name"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-300">
                Player O
              </label>
              <input
                type="text"
                value={playerO}
                onChange={(e) => setPlayerO(e.target.value)}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
                placeholder="Player O name"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={handleStartGame}
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 dark:bg-blue-500 dark:hover:bg-blue-400"
              disabled={!playerX.trim() || !playerO.trim()}
            >
              Start Game
            </button>
            <button
              type="button"
              onClick={handleResetBoard}
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Reset Board
            </button>
            <button
              type="button"
              onClick={handleResetEverything}
              className="inline-flex items-center justify-center rounded-full border border-transparent bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              Change Players
            </button>
          </div>
        </section>

        <section className="mb-4">
          <p className="text-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {statusMessage()}
          </p>
        </section>

        <section className="flex justify-center">
          <div className="grid grid-cols-3 gap-2">
            {board.map((cell, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleCellClick(index)}
                className="flex h-20 w-20 items-center justify-center rounded-lg border border-zinc-300 bg-zinc-50 text-3xl font-semibold text-zinc-900 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-80 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
                disabled={!isGameStarted || !!winner || cell !== null}
              >
                {cell}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function calculateWinner(cells: CellValue[]): PlayerMark | null {
  for (const [a, b, c] of winningLines) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}
