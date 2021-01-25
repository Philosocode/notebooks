import { useLocation } from "react-router-dom";

type TAppLocation = "study" | "library" | "other";

export function useAppLocation(): TAppLocation {
  const { pathname } = useLocation();

  if (pathname.includes("library")) return "library";
  if (pathname.includes("login")) return "other";

  return "study";
}