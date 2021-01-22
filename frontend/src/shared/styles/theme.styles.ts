const BASE_FONT_SIZE = 1.6;
const FONT_MULTIPLIER = 1.3;
const BASE_SPACING_SIZE = 2.5;

export const theme = {
  colors: {
    green: "#00B27D",
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
  other: {
    sideGap: "2.5%",
    sidebarWidth: "25rem"
  }
};
