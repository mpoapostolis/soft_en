import assoc from "ramda/src/assoc";
import merge from "ramda/src/merge";
import { combineReducers } from "redux";

const tmpDataInit = {};

const tmpData = (state = tmpDataInit, { type, payload }) => {
  switch (type) {
    case "SET_TMP_DATA":
      return merge(state, payload);
    case "CLEAR_TMP":
      return tmpDataInit;
    default:
      return state;
  }
};

const initActivities = {data:[]};

const activities = (state = tmpDataInit, { type, payload }) => {
  switch (type) {
    case "SET_ACTIVITIES":
    
    return assoc("data", payload, state);
    default:
      return state;
  }
};
const initFilters = {
  Date: Date.now(),
  Max_price: 999,
  Min_price: 0,
  Distance: 5,
  Lat: 37.98381,
  Long: 23.727539,
  Search: ""
};

const filters = (state = initFilters, { type, payload }) => {
  switch (type) {
    case "UPDATE_FILTERS":
      return merge(state, payload);
    case "UPDATE_SEARCH":
      return assoc("Search", payload, state);
    case "UPDATE_COORDS":
      return merge(state, payload);

    default:
      return state;
  }
};

const initAccount = {
  access_token: "",
  refresh_token: "",
  expires_in: 0,
  Role: "Admin",
  status: "ACTIVE",
  error: false,
  lang: "En",
  address: ""
};

const account = (state = initAccount, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return merge(state, payload);
    case "CHANGE_LANGUAGE":
      return assoc("lang", payload, state);

    case "UPDATE_ADDRESS":
      return assoc("address", payload, state);
    case "SET_TOKEN":
      return assoc("access_token", payload, state);

    case "SET_ERROR":
      return assoc("error", payload, state);
    default:
      return state;
  }
};

const appReducer = combineReducers({
  account,
  tmpData,
  activities,
  filters
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
