import { createAction } from "redux-actions";
export const setTmpData = createAction("SET_TMP_DATA");
export const clearTmp = createAction("CLEAR_TMP");
export const updateCoords = createAction("UPDATE_COORDS");
export const updateAdress = createAction("UPDATE_ADDRESS");
export const create = createAction("CREATE");
export const login = createAction("LOGIN");
export const logout = createAction("LOGOUT");
export const updateFilters = createAction("UPDATE_FILTERS");
export const updateSearch = createAction("UPDATE_SEARCH");
export const setActivities = createAction("SET_ACTIVITIES");

export const getActivities = (obj, push) => (dispatch, getState) => {
  const state = getState();
  const {
    Date = Date.now(),
    Max_price = 999,
    Min_price = 0,
    Distance = 5,
    Lat = 37.98381,
    Long = 23.727539,
    Search = ""
  } = state.filters;

  return fetch(
    `/activity?Search=${Search}&Max_price=${Max_price}&Min_price=${Min_price}&Distance=${3000}&Lat=${Lat}&Long=${Long}`
  )
    .then(res => res.json())
    .then(arr => dispatch(setActivities(arr)));
};

export const register = (obj, push) => (dispatch, getState) => {
  return fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: obj
  }).then(res => {
    if (res.status === 201) push("/");
  });
};

export const callToLogin = (obj, push) => (dispatch, getState) => {
  return fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: obj
  })
    .then(res => {
      if (res.status === 200) return res.text();
      else throw new Error("wrong creds");
    })
    .then(token => {
      const encToken = token.split(".")[1];
      const decToken = JSON.parse(atob(encToken));
      dispatch(login({ ...decToken, access_token: token }));
      push("/");
    })
    .catch(e => console.log(e));
};
