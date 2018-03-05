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
export const updateOwner = createAction("UPDATE_OWNER");
export const updateParent = createAction("UPDATE_PARENT");

export const getActivities = () => (dispatch, getState) => {
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
    `/activity?search=${Search}&MaxPrice=${Max_price *
      10}&MinPrice=${Min_price *
      10}&Distance=${Distance}&Lat=${Lat}&Long=${Long}`
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

export const setListing = (obj, push) => (dispatch, getState) => {
  const tmpObj = JSON.parse(obj);
  const state = getState();
  const { account: { access_token }, filters: { activityId } } = state;
  console.log(tmpObj);
  let tmp = [];
  for (let i = 0; i < 10; i++) {
    if (tmpObj[`Remaining${i + 1}`] && tmpObj[`Date${i + 1}`]) {
      tmp.push({
        Remaining: tmpObj[`Remaining${i + 1}`],
        EventDate: new Date(tmpObj[`Date${i + 1}`]).getTime()
      });
    }
  }

  // return fetch(`/activity/7ea8c5f2-f779-4e75-be97-b200b793ef91`, {
  return fetch(`/activity/${activityId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify({ Listings: tmp })
  }).then(res => {
    if (res.status === 201) push("/");
  });
};

export const createActivity = (obj, push) => (dispatch, getState) => {
  const formData = new FormData();
  const state = getState();
  const { access_token } = state.account;

  for (let key in obj) {
    formData.append(key, obj[key]);
  }
  return fetch("/activity", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    body: formData
  })
    .then(res => res.text())
    .then(id =>
      Promise.resolve(dispatch(updateFilters({ activityId: id }))).then(
        push(`/listing-activity`)
      )
    );
};

export const getOwnerWallet = (obj, push) => (dispatch, getState) => {
  const state = getState();
  const { access_token } = state.account;

  return fetch("/owner/wallet", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
    .then(res => res.json())
    .then(data => dispatch(updateOwner(data)));
};

export const topUp = Amount => (dispatch, getState) => {
  const state = getState();
  const { access_token } = state.account;
  fetch(`/wallet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify({ Amount })
  })
    .then(res => res.json())
    .then(data => dispatch(updateParent(data)));
};

export const booking = obj => (dispatch, getState) => {
  const state = getState();
  const { access_token } = state.account;
  let tmp = [];
  for (let key in obj) {
    tmp.push(key);
  }
  Promise.all(
    tmp.map(id =>
      fetch(`/booking/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify({ Quantity: obj[id] })
      })
    )
  );
};

export const getParentWallet = (obj, push) => (dispatch, getState) => {
  const state = getState();
  const { access_token } = state.account;

  return fetch("/wallet", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
    .then(res => res.json())
    .then(data => dispatch(updateParent(data)));
};

export const getStatistics = (id, push) => (dispatch, getState) => {
  const state = getState();
  const { access_token } = state.account;

  return fetch(`/statistics/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
    .then(res => res.json())
    .then(data => dispatch(updateOwner({ statistics: data })));
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
