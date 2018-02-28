import {createAction} from 'redux-actions';
export const setTmpData = createAction('SET_TMP_DATA');
export const clearTmp = createAction('CLEAR_TMP');
export const updateCoords = createAction('UPDATE_COORDS');
export const updateAdress = createAction('UPDATE_ADDRESS');
export const create = createAction('CREATE');

export const register = obj => (dispatch, getState) => {

  return fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: obj,
  });
};

export const login = obj => (dispatch, getState) => {
  
}