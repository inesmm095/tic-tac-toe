import type { CellValue, GameMode, PlayerMark } from "../../../utils/tic-tac-toe-logic";
import styles from "./GameStep.module.css";

interface GameStepProps {
  gameMode: GameMode;
  board: CellValue[];
  currentPlayer: PlayerMark;
  winner: PlayerMark | "Draw" | null;
  trimmedPlayerX: string;
  trimmedPlayerO: string;
  statusMessage: string;
  onCellClick: (index: number) => void;
  onPlayAgain: () => void;
  onChangeSetup: () => void;
}

export function GameStep({
  gameMode,
  board,
  winner,
  trimmedPlayerX,
  trimmedPlayerO,
  statusMessage,
  onCellClick,
  onPlayAgain,
  onChangeSetup,
}: GameStepProps) {
  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <div>
          <div className={styles.modeTitle}>
            {gameMode === "one" ? "One player" : "Two players"}
          </div>
          <div className={styles.players}>
            <div>
              X: <span>{trimmedPlayerX}</span>
            </div>
            <div>
              O: <span>{trimmedPlayerO}</span>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={onPlayAgain}
            className={styles.secondaryButton}
          >
            Play again
          </button>
          <button
            type="button"
            onClick={onChangeSetup}
            className={styles.primaryButton}
          >
            Change setup
          </button>
        </div>
      </div>

      <p className={styles.status}>{statusMessage}</p>

      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          {board.map((cell, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onCellClick(index)}
              className={styles.cell}
              disabled={!!winner || cell !== null}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

