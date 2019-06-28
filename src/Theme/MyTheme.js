import { createMuiTheme } from "@material-ui/core";

const MyFont = {
  fontFamily: "'Varela Round'",
  fontStyle: "strong",
  fontDisplay: "swap",
  fontWeight: 600
};

export const theme = createMuiTheme({
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
