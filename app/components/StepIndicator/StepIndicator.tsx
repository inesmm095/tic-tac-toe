import type { Step } from "../../../utils/tic-tac-toe-logic";
import styles from "./StepIndicator.module.css";

interface StepIndicatorProps {
  step: Step;
}

export function StepIndicator({ step }: StepIndicatorProps) {
  return (
    <div className={styles.root}>
      <span className={step === 1 ? styles.active : undefined}>1. Mode</span>
      <span className={step === 2 ? styles.active : undefined}>2. Names</span>
      <span className={step === 3 ? styles.active : undefined}>3. Game</span>
    </div>
  );
}

