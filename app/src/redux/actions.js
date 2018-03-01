import { createAction } from "redux-actions";
export const setTmpData = createAction("SET_TMP_DATA");
export const clearTmp = createAction("CLEAR_TMP");
export const updateCoords = createAction("UPDATE_COORDS");
export const updateAdress = createAction("UPDATE_ADDRESS");
export const create = createAction("CREATE");
export const login = createAction("LOGIN");
export const logout = createAction("LOGOUT");

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
