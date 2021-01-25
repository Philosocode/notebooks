const BASE_FONT_SIZE = 1.6;
const FONT_MULTIPLIER = 1.3;
const BASE_SPACING_SIZE = 2.5;

export const theme = {
  animations: {
    transitionAppend: "0.3s ease-in-out",
  },
  boxShadows: {
    light: "0 0.25rem 0.75rem rgba(0,0,0,0.2)",
    default: "0 1rem 2rem rgba(0,0,0,0.2)",
    pressed: "0 0.5rem 1rem rgba(0,0,0,0.2)",
    alt: "0 5px 1.5rem rgba(0,0,0, 0.3)",
  },
  colors: {
    green: "#00B27D",
    red: "#EC4643",
  },
  componentSizes: {
    navbarHeight: "5rem",
    librarySidebarWidth: "25rem",
  },
  fonts: {},
  fontSizes: {
    "xs": `1.2rem`,
    "sm": `1.4rem`,
    "base": `${BASE_FONT_SIZE}rem`,
    "md": `${BASE_FONT_SIZE * FONT_MULTIPLIER}rem`,
    "lg": `${BASE_FONT_SIZE * (FONT_MULTIPLIER**2)}rem`,
    "xl": `${BASE_FONT_SIZE * (FONT_MULTIPLIER**3)}rem`,
    "2xl": `${BASE_FONT_SIZE * (FONT_MULTIPLIER**4)}rem`,
    "3xl": `${BASE_FONT_SIZE * (FONT_MULTIPLIER**5)}rem`,
    "4xl": `${BASE_FONT_SIZE * (FONT_MULTIPLIER**6)}rem`,
  },
  spacing: {
    xs: `${BASE_SPACING_SIZE / 3}rem`,
    sm: `${BASE_SPACING_SIZE / 2}rem`,
    base: `${BASE_SPACING_SIZE}rem`,
    md: `${BASE_SPACING_SIZE * 2}rem`,
    lg: `${BASE_SPACING_SIZE * 3}rem`,
    xl: `${BASE_SPACING_SIZE * 4}rem`,
  },
  timing: {
    alertShowTime: 3000,
  },
  other: {
    sideGap: "2.5%",
  }
};
