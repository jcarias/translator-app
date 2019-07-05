import { createMuiTheme } from "@material-ui/core";

const MyFont = {
  fontFamily: "'Varela Round'",
  fontStyle: "strong",
  fontDisplay: "swap",
  fontWeight: 600,
  fontSize: "2em"
};

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#58a5f0",
      main: "#0277bd",
      dark: "#004c8c",
      contrastText: "#fff"
    },
    secondary: {
      light: "#819ca9",
      main: "#546e7a",
      dark: "#29434e",
      contrastText: "#fff"
    }
  },
  typography: {
    fontFamily: [
      "'Varela Round'",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [MyFont]
      }
    }
  }
});
