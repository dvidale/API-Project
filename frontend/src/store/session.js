import { csrfFetch } from "./csrf";

const LOGIN = "/session/LOGIN";
const DELETE = "/session/DELETE";
/* --------------------
*Regular Action Creators
--------------------*/

const loginSession = (user) => {
  return {
    type: LOGIN,
    payload: user,
  };
};

const deleteSession = () => {
  return {
    type: DELETE,
  };
};

/* ------------------
* Thunks
--------------------*/

export const login = (user) => {
  async (dispatch) => {
    console.log(">>>inside login thunk <<<");
    const { credential, password } = user;
    const url = "/api/session";
    const method = "POST";
    const body = JSON.stringify({ credential, password });
    const options = { method, body };

    const response = await csrfFetch(url, options);
console.log(">>> response to csrfFetch from login thunk ----", response);
    if (response.ok) {
      const data = await response.json();
      dispatch(loginSession(data.user));
      return data.user;
    }
  };
};

export const deleteCurrentSession = () => {
  async (dispatch) => {
    const url = "/api/session";
    const method = "DELETE";
    const options = { method };

    const response = await csrfFetch(url, options);

    if (response.message === "success") {
      dispatch(deleteSession());
    }
  };
};

/* ------------------
*Reducers
--------------------*/

export default function sessionReducer(state = { user: null }, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };

    case DELETE:
      return (state = { ...state, user: null });

    default:
      return state;
  }
}
