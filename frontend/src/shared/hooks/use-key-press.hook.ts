import { useEffect } from "react";

export function useKeypress(key: string, action: () => void, isDisabled: boolean = false) {
  useEffect(() => {
    if (isDisabled) return;

    function onKeyup(event: KeyboardEvent) {
      if (event.key === key) action();
    }

    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keyup", onKeyup);
    // eslint-disable-next-line
  }, [action, isDisabled, key]);
}
