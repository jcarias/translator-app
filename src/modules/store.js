import { createStore, applyMiddleware } from "redux";

// Logger with default options
import logger from "redux-logger";

import localizationReducer from "./localizationReducer";

export default function configureStore(initialState) {
  const store = createStore(
    localizationReducer,
    initialState,
    applyMiddleware(logger)
  );
  return store;
}
