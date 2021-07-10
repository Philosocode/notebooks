import { useState } from "react";

export function useStep(min: number, max: number, initialValue?: number) {
  const [step, setStep] = useState(initialValue ?? min);

  function increment() {
    if (step === max) return;

    setStep((prevState) => prevState + 1);
  }

  function decrement() {
    if (step === min) return;

    setStep((prevState) => prevState - 1);
  }

  return { step, setStep, increment, decrement };
}
