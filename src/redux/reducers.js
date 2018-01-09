import assoc from "ramda/src/assoc";
// import mergeAll from "ramda/src/mergeAll";
import { combineReducers } from "redux";

const initAccount = {
  access_token: "",
  refresh_token: "",
  expires_in: 0,
  role: "Admin",
  status: "ACTIVE",
  error: false,
  lang: "en",
};

const account = (state = initAccount, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return payload;
    case "CHANGE_LANGUAGE":
      return assoc("lang", payload, state);
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
