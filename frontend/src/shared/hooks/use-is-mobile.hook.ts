import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  function updateIsMobile() {
    const isMobile = window.innerWidth <= 600;
    setIsMobile(isMobile);
  }

  return isMobile;
}