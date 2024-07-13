import { csrfFetch } from "./csrf";

const LOGIN = "/session/LOGIN";
const LOGOUT = "/session/LOGOUT";

/* --------------------
*Regular Action Creators
--------------------*/

const loginSession = (user) => {
  return {
    type: LOGIN,
    payload: user,
  };
};

const logoutSession = () => {
  return {
    type: LOGOUT,
  };
};


/* ------------------
* Thunks
--------------------*/

export const login = (user) => 
  async (dispatch) => {
    
    const { credential, password } = user;
    const url = "/api/session";
    const method = "POST";
    const body = JSON.stringify({ credential, password });
    const options = { method, body };

    const response = await csrfFetch(url, options);

    if (response.ok) {
      const data = await response.json();
      dispatch(loginSession(data.user));
      return data.user;
    }
  };

export const restoreUser = () => 
  async (dispatch) => {

    const response = await csrfFetch('/api/session')

    if(response.ok){
      const data = await response.json()
      dispatch(loginSession(data.user))
      return data.user; 
    }
  }


export const logout = () => 
  async (dispatch) => {
    const url = "/api/session";
    const method = "DELETE";
    const options = { method };

    const response = await csrfFetch(url, options);

    
      dispatch(logoutSession());
      return response
    
    
  };


export const signUp = (signUpData) =>
  async (dispatch) => {

    const url = '/api/users'
const method = 'POST';
const body = JSON.stringify(signUpData)

const options = {method, body}

const response = await csrfFetch(url, options)

if(response.ok){

  const res = await response.json()
  dispatch(loginSession(res.user))
  return res.user;
}


  } 

/* ------------------
*Reducers
--------------------*/

export default function sessionReducer(state = { user: null }, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };

    case LOGOUT:
      return { ...state, user: null };

    default:
      return state;
  }
}
