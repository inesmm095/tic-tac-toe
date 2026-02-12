import type { GameMode } from "../../../utils/tic-tac-toe-logic";
import styles from "./StepNames.module.css";

interface StepNamesProps {
  gameMode: GameMode;
  playerX: string;
  playerO: string;
  singlePlayerName: string;
  onChangePlayerX: (value: string) => void;
  onChangePlayerO: (value: string) => void;
  onChangeSinglePlayerName: (value: string) => void;
  onBackToMode: () => void;
  onStartGame: () => void;
}

export function StepNames({
  gameMode,
  playerX,
  playerO,
  singlePlayerName,
  onChangePlayerX,
  onChangePlayerO,
  onChangeSinglePlayerName,
  onBackToMode,
  onStartGame,
}: StepNamesProps) {
  const isOnePlayerInvalid = gameMode === "one" && !singlePlayerName.trim();
  const isTwoPlayerInvalid =
    gameMode === "two" && (!playerX.trim() || !playerO.trim());

  return (
    <section className={styles.root}>
      <h2 className={styles.title}>Step 2 · Enter names</h2>

      {gameMode === "one" && (
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Your name</label>
          <input
            type="text"
            value={singlePlayerName}
            onChange={(e) => onChangeSinglePlayerName(e.target.value)}
            className={styles.input}
            placeholder="Enter your name"
          />
          <p className={styles.helper}>
            The computer will be named <strong>Computer</strong> and marks (X or O) will be
            assigned randomly.
          </p>
        </div>
      )}

      {gameMode === "two" && (
        <div className={styles.twoColumn}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Player X</label>
            <input
              type="text"
              value={playerX}
              onChange={(e) => onChangePlayerX(e.target.value)}
              className={styles.input}
              placeholder="Player X name"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Player O</label>
            <input
              type="text"
              value={playerO}
              onChange={(e) => onChangePlayerO(e.target.value)}
              className={styles.input}
              placeholder="Player O name"
            />
          </div>
        </div>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          onClick={onBackToMode}
          className={styles.backButton}
        >
          Back
        </button>
        <button
          type="button"
          onClick={onStartGame}
          disabled={isOnePlayerInvalid || isTwoPlayerInvalid}
          className={styles.startButton}
        >
          Start Game
        </button>
      </div>
    </section>
  );
}

