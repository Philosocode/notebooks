import { useEffect } from "react";
import { useHistory } from "react-router-dom";

// scroll to top on route changes
export function useScrollToTop() {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      unlisten();
    };
    // eslint-disable-next-line
  }, [history, window.location.pathname]);
}
