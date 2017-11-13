import assoc from "ramda/src/assoc";
import mergeAll from "ramda/src/mergeAll";
import { combineReducers } from "redux";

const initAccount = { loggedIn: "", error: false, auth: "" };
const account = (state = initAccount, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      state.auth = payload;
      return assoc("loggedIn", true, state);

    case "SET_ERROR":
      return assoc("error", payload, state);

    default:
      return state;
  }
};

const appReducer = combineReducers({
  account,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
