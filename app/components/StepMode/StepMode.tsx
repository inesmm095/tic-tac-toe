import type { GameMode } from "../../../utils/tic-tac-toe-logic";
import styles from "./StepMode.module.css";

interface StepModeProps {
  gameMode: GameMode;
  onSelectMode: (mode: Exclude<GameMode, null>) => void;
  onContinue: () => void;
}

export function StepMode({ gameMode, onSelectMode, onContinue }: StepModeProps) {
  const isSelected = (mode: Exclude<GameMode, null>) =>
    gameMode === mode ? `${styles.card} ${styles.cardSelected}` : styles.card;

  return (
    <section className={styles.root}>
      <h2 className={styles.title}>Step 1 · Choose players</h2>
      <div className={styles.modeGrid}>
        <button
          type="button"
          onClick={() => onSelectMode("one")}
          className={isSelected("one")}
        >
          <div className={styles.cardTitle}>One player</div>
          <div className={styles.cardDescription}>
            You vs computer (random moves)
          </div>
        </button>
        <button
          type="button"
          onClick={() => onSelectMode("two")}
          className={isSelected("two")}
        >
          <div className={styles.cardTitle}>Two players</div>
          <div className={styles.cardDescription}>
            Local multiplayer (X vs O)
          </div>
        </button>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={onContinue}
          disabled={!gameMode}
          className={styles.continueButton}
        >
          Continue
        </button>
      </div>
    </section>
  );
}

