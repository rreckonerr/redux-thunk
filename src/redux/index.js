import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

let middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { createLogger } = require(`redux-logger`);

  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error
  });

  middlewares.push(logger);
}

const store = compose(
  applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore)(reducer);

// dev only
window.store = store;

export default store;
