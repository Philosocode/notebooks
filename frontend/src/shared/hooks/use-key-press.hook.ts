import { useEffect } from "react";

interface IProps {
  key?: string;
  action: () => void;
}
export default function useKeypress({ action, key }: IProps) {
  useEffect(() => {
    if (!key) return;

    function onKeyup(event: KeyboardEvent) {
      if (event.key === key) action();
    }
    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keyup", onKeyup);
    // eslint-disable-next-line
  }, [action]);
}
