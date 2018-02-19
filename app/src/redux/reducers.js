import assoc from "ramda/src/assoc";
import merge from "ramda/src/merge";
import { combineReducers } from "redux";

const tmpDataInit = {};

const tmpData = (state = tmpDataInit, { type, payload }) => {
  switch (type) {
    case "SET_TMP_DATA":
      return merge(state, payload);
    case "CLEAR_TMP":
      return {};
    default:
      return state;
  }
};

const initAccount = {
  access_token: "",
  refresh_token: "",
  coords: {},
  expires_in: 0,
  role: "Admin",
  status: "ACTIVE",
  error: false,
  lang: "En",
  address: ""
};

const account = (state = initAccount, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return payload;
    case "CHANGE_LANGUAGE":
      return assoc("lang", payload, state);

    case "UPDATE_COORDS":
      return assoc("coords", payload, state);
    case "UPDATE_ADDRESS":
      return assoc("address", payload, state);

    case "SET_ERROR":
      return assoc("error", payload, state);
    default:
      return state;
  }
};

const appReducer = combineReducers({
  account,
  tmpData
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
