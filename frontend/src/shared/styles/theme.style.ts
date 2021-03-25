const BASE_FONT_SIZE = 1.6;
const FONT_MULTIPLIER = 1.3;
const BASE_SPACING_SIZE = 2.5;


// Media Query Stuff: https://github.com/styled-components/styled-components/issues/2303#issuecomment-480047731
function customMediaQuery(maxWidth: number, type: string = "min") {
  return `@media (${type}-width: ${maxWidth}em)`;
}

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
    green: {
      100: "#d5fcea",
      200: "#4DFFCA",
      300: "#1ACC97",
      400: "#00B27D",
      500: "#007f59",
    },
    red: {
      100: "#F7B0AF",
      200: "#F17371",
      300: "#EC4643",
      400: "#C61714"
    },
    black: "#121212",
    white: "#FFF",
    offWhite: "#FAFAFA",
    gray: {
      100: "#EFEFEF",
      200: "#D9D9D9",
      300: "#B8B8B8",
      400: "#979797",
      500: "#757575",
      600: "#545454",
      700: "#333",
      800: "#2C2C2C",
    }
  },
  componentSizes: {
    navbarHeight: "5rem",
    appSidebarWidth: "10rem",
    tagSidebarWidth: "30rem",
    librarySidebarWidth: "25rem",
  },
  fonts: {},
  fontSizes: {
    "xs": `1.2rem`,
    "sm": `1.4rem`,
    "base": `${BASE_FONT_SIZE}rem`,
    "basePlus": "1.8rem",
    "md": `${BASE_FONT_SIZE * FONT_MULTIPLIER}rem`,
    "lg": `${BASE_FONT_SIZE * (FONT_MULTIPLIER**2)}rem`,
    "xl": `${BASE_FONT_SIZE * (FONT_MULTIPLIER**3)}rem`,
    "2xl": `${BASE_FONT_SIZE * (FONT_MULTIPLIER**4)}rem`,
    "3xl": `${BASE_FONT_SIZE * (FONT_MULTIPLIER**5)}rem`,
    "4xl": `${BASE_FONT_SIZE * (FONT_MULTIPLIER**6)}rem`,
  },
  media: {
    smallPhoneOnly: customMediaQuery(30, "max"),  // max: 480px
    phoneOnly: customMediaQuery(37.5, "max"),     // max: 600px
    tabPort: customMediaQuery(37.5),  // 600px
    tabLand: customMediaQuery(56.25), // 900px
    desktop: customMediaQuery(75), // 1200px
    bigDesktop: customMediaQuery(112.5), // 1800px
  },
  spacing: {
    xs: `${BASE_SPACING_SIZE / 3}rem`,
    sm: `${BASE_SPACING_SIZE / 2}rem`,
    base: `${BASE_SPACING_SIZE}rem`,
    md: `${BASE_SPACING_SIZE * 2}rem`,
    lg: `${BASE_SPACING_SIZE * 3}rem`,
    xl: `${BASE_SPACING_SIZE * 4}rem`,
    sideGap: "2.5%",
  },
  timing: {
    alertShowTime: 3000,
  },
  zIndices: {
    nav: 100,
    menu: 100,
    modal: 200,
  }
};
