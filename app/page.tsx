"use client";

import { useState } from "react";

import {
  type CellValue,
  type GameMode,
  type PlayerMark,
  type Step,
  evaluateBoard,
  makeRandomMove,
} from "../utils/tic-tac-toe-logic";
import { StepIndicator } from "./components/StepIndicator/StepIndicator";
import { StepMode } from "./components/StepMode/StepMode";
import { StepNames } from "./components/StepNames/StepNames";
import { GameStep } from "./components/GameStep/GameStep";

export default function Home() {
  const [step, setStep] = useState<Step>(1);
  const [gameMode, setGameMode] = useState<GameMode>(null);

  const [playerX, setPlayerX] = useState<string>("Player X");
  const [playerO, setPlayerO] = useState<string>("Player O");
  const [singlePlayerName, setSinglePlayerName] = useState<string>("Player 1");

  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<PlayerMark>("X");
  const [winner, setWinner] = useState<PlayerMark | "Draw" | null>(null);
  const [humanMark, setHumanMark] = useState<PlayerMark | null>(null);
  const [computerMark, setComputerMark] = useState<PlayerMark | null>(null);

  const trimmedPlayerX = playerX.trim() || "Player X";
  const trimmedPlayerO = playerO.trim() || "Player O";

  const getNameForMark = (mark: PlayerMark): string => {
    if (gameMode === "one" && humanMark && computerMark) {
      const humanName = humanMark === "X" ? trimmedPlayerX : trimmedPlayerO;
      const computerName = humanMark === "X" ? trimmedPlayerO : trimmedPlayerX;
      return mark === humanMark ? humanName : computerName;
    }

    return mark === "X" ? trimmedPlayerX : trimmedPlayerO;
  };

  const resetBoardState = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  const startGameFromSetup = () => {
    if (!gameMode) return;

    // Two player mode
    if (gameMode === "two") {
      if (!playerX.trim() || !playerO.trim()) {
        setStep(2);
        return;
      }

      resetBoardState();
      setHumanMark(null);
      setComputerMark(null);
      setStep(3);
      return;
    }

    // One player mode
    if (!singlePlayerName.trim()) {
      setStep(2);
      return;
    }

    const humanName = singlePlayerName.trim();
    const computerName = "Computer";

    const humanStartsAs: PlayerMark = Math.random() < 0.5 ? "X" : "O";
    const compMark: PlayerMark = humanStartsAs === "X" ? "O" : "X";

    // Assign names to X and O based on who is human
    setPlayerX(humanStartsAs === "X" ? humanName : computerName);
    setPlayerO(humanStartsAs === "O" ? humanName : computerName);

    setHumanMark(humanStartsAs);
    setComputerMark(compMark);

    const initialBoard: CellValue[] = Array(9).fill(null);
    let updatedBoard = initialBoard;
    let newWinner: PlayerMark | null = null;
    let isDraw = false;
    let nextTurn: PlayerMark = "X";

    // If computer is X, let it make the first random move
    if (compMark === "X") {
      const result = makeRandomMove(initialBoard, compMark);
      updatedBoard = result.board;
      newWinner = result.winner;
      isDraw = result.isDraw;
      nextTurn = humanStartsAs;
    } else {
      // Human is X and starts
      nextTurn = "X";
    }

    setBoard(updatedBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (isDraw) {
      setWinner("Draw");
    } else {
      setWinner(null);
    }

    setCurrentPlayer(nextTurn);
    setStep(3);
  };

  const handleCellClick = (index: number) => {
    if (step !== 3 || winner || board[index] !== null) return;

    // Two player mode: regular alternation
    if (gameMode === "two" || !gameMode) {
      const nextBoard = [...board];
      nextBoard[index] = currentPlayer;
      setBoard(nextBoard);

      const { winner: nextWinner, isDraw } = evaluateBoard(nextBoard);
      if (nextWinner) {
        setWinner(nextWinner);
        return;
      }

      if (isDraw) {
        setWinner("Draw");
        return;
      }

      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      return;
    }

    // One player mode: human vs random computer
    if (!humanMark || !computerMark) return;

    // Only allow moves when it's the human's turn
    if (currentPlayer !== humanMark) return;

    // Human move
    let nextBoard = [...board];
    nextBoard[index] = humanMark;
    setBoard(nextBoard);

    const result = evaluateBoard(nextBoard);
    if (result.winner) {
      setWinner(result.winner);
      return;
    }

    if (result.isDraw) {
      setWinner("Draw");
      return;
    }

    // Computer random move
    const computerResult = makeRandomMove(nextBoard, computerMark);
    nextBoard = computerResult.board;
    setBoard(nextBoard);

    if (computerResult.winner) {
      setWinner(computerResult.winner);
      setCurrentPlayer(computerMark);
      return;
    }

    if (computerResult.isDraw) {
      setWinner("Draw");
      return;
    }

    // Back to human
    setCurrentPlayer(humanMark);
  };

  const handleBackToMode = () => {
    resetBoardState();
    setGameMode(null);
    setHumanMark(null);
    setComputerMark(null);
    setStep(1);
  };

  const handleBackToNames = () => {
    resetBoardState();
    setWinner(null);
    setStep(2);
  };

  const getStatusMessage = () => {
    if (winner === "Draw") {
      return "It's a draw! Play again or change setup.";
    }

    if (winner) {
      const winnerName = getNameForMark(winner);
      return `Winner: ${winnerName} (${winner})`;
    }

    const currentName = getNameForMark(currentPlayer);

    if (gameMode === "one" && humanMark && computerMark) {
      if (currentPlayer === humanMark) {
        return `Your turn: ${currentName} (${currentPlayer})`;
      }

      return `Computer's turn: ${currentName} (${currentPlayer})`;
    }

    return `Current turn: ${currentName} (${currentPlayer})`;
  };

  const statusMessage = getStatusMessage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 font-sans dark:bg-zinc-950">
      <main className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
        <h1 className="mb-4 text-center text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Tic Tac Toe
        </h1>

        <StepIndicator step={step} />

        {step === 1 && (
          <StepMode
            gameMode={gameMode}
            onSelectMode={(mode) => setGameMode(mode)}
            onContinue={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <StepNames
            gameMode={gameMode}
            playerX={playerX}
            playerO={playerO}
            singlePlayerName={singlePlayerName}
            onChangePlayerX={setPlayerX}
            onChangePlayerO={setPlayerO}
            onChangeSinglePlayerName={setSinglePlayerName}
            onBackToMode={handleBackToMode}
            onStartGame={startGameFromSetup}
          />
        )}

        {step === 3 && (
          <GameStep
            gameMode={gameMode}
            board={board}
            currentPlayer={currentPlayer}
            winner={winner}
            trimmedPlayerX={trimmedPlayerX}
            trimmedPlayerO={trimmedPlayerO}
            statusMessage={statusMessage}
            onCellClick={handleCellClick}
            onPlayAgain={startGameFromSetup}
            onChangeSetup={handleBackToNames}
          />
        )}
      </main>
    </div>
  );
}
