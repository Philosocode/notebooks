import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export type TAppLocation = "concepts" | "notebooks" | "notebook-detail" | "library" | "other" | "sections" | "practice" | "workflows";

export function useAppLocation(): TAppLocation {
  const [appLocation, setAppLocation] = useState<TAppLocation>("other");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/library"))    setAppLocation("library");
    if (pathname.startsWith("/login"))      setAppLocation("other");
    if (pathname.startsWith("/concepts"))   setAppLocation("concepts");
    if (pathname.startsWith("/notebooks"))  setAppLocation("notebooks");
    if (pathname.startsWith("/notebooks/")) setAppLocation("notebook-detail");
    if (pathname.startsWith("/sections"))   setAppLocation("sections");
    if (pathname.startsWith("/practice"))   setAppLocation("practice");
    if (pathname.startsWith("/workflows"))  setAppLocation("workflows");
  }, [pathname]);

  return appLocation;
}