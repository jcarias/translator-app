import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/styles";
import * as serviceWorker from "./serviceWorker";
import { theme } from "./Theme/MyTheme";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./modules/store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ReduxProvider store={configureStore()}>
      <App />
    </ReduxProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
