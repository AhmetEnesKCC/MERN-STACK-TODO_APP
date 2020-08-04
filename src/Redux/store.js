import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";
import allReducers from "./app";
const middleWare = [Thunk];
const store = createStore(
  allReducers,
  compose(
    applyMiddleware(...middleWare),
    (window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()) ||
      function (f) {
        return f;
      }
  )
);

export default store;
