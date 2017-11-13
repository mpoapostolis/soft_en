import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers";
import { loadState, saveState } from "./localStorage";

const persistedData = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, persistedData, composeEnhancers(applyMiddleware(ReduxThunk)));

store.subscribe(() => {
  saveState(store.getState());
});
export default store;
