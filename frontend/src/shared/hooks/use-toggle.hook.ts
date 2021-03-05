import { useState } from "react";

export function useToggle(initialValue: boolean): [boolean, () => void] {
  const [state, setState] = useState(initialValue);

  function toggleState() {
    setState(prev => !prev);
  }

  return [state, toggleState];
}