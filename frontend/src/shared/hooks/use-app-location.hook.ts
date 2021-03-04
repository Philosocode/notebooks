import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export type TAppLocation = "concepts" | "materials" | "library" | "other" | "parts";

export function useAppLocation(): TAppLocation {
  const [appLocation, setAppLocation] = useState<TAppLocation>("other");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/library"))    setAppLocation("library");
    if (pathname.startsWith("/login"))      setAppLocation("other");
    if (pathname.startsWith("/concepts"))   setAppLocation("concepts");
    if (pathname.startsWith("/materials"))  setAppLocation("materials");
    if (pathname.startsWith("/parts"))      setAppLocation("parts");
  }, [pathname]);

  return appLocation;
}