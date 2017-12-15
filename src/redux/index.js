import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers";
import { loadState, saveState } from "./localStorage";

const persistedData = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const ench =
  process.env.NODE_ENV === "development" ? composeEnhancers(applyMiddleware(ReduxThunk)) : applyMiddleware(ReduxThunk);
const store = createStore(reducers, persistedData, ench);

store.subscribe(() => {
  saveState(store.getState());
});
export default store;
