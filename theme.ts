"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
});

export const customTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#FCFCFC", //radix-gray-1 lightmode
          paper: "#F9F9F9", //radix-gray-2 lightmode
        },
        text: {
          primary: "#202020", //radix-gray-12 lightmode
          secondary: "##646464", //radix-gray-11 lightmode
        },
        primary: {
          main: "#E8E8E8", //radix gray-4 lightmode
          light: "#F0F0F0", //radix gray-5 lightmode
          dark: "#E0E0E0", //radix gray-3 lightmode
          contrastText: "#646464", //radix gray-11 lightmode
        },
        secondary: {
          main: "#E9E8E6", //radix sand-4 lightmode
          light: "#F1F0EF", //radix sand-5 lightmode
          dark: "#E2E1DE", //radix sand-3 lightmode
          contrastText: "#63635E", //radix sand-11 lightmode
        },
        error: {
          main: "#B71C1C", //m-io red-900
        },
        warning: {
          main: "#E65100", //m-io orange-900
        },
        info: {
          main: "#03A9F4", //m-io light blue-500
        },
        success: {
          main: "#4CAF50", //m-io green-500
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#111111", //radix-gray-1
          paper: "#191919", //radix-gray-2
        },
        text: {
          primary: "#EEEEEE", //radix-gray-12
          secondary: "#B4B4B4", //radix-gray-11
        },
        primary: {
          main: "#F5F5F5", //radix gray-4
          light: "#FAFAFA", //radix gray-5
          dark: "#EEEEEE", //radix gray-3
          contrastText: "#B4B4B4", //radix gray-11
        },
        secondary: {
          main: "#acc8e6", //radix sand-4
          light: "#dde9f5", //radix sand-5
          dark: "#77a5d5", //radix sand-3
          contrastText: "#B5B3AD", //radix sand-11
        },
        error: {
          main: "#B71C1C", //m-io red-900
        },
        warning: {
          main: "#E65100", //m-io orange-900
        },
        info: {
          main: "#03A9F4", //m-io light blue-500
        },
        success: {
          main: "#4CAF50", //m-io green-500
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },

  transitions: {
    easing: {
      // This is the most common easing curve.
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },
});

export default theme;
