import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_USER,
  AUTH_USER_EMAIL
}from '../_actions/types';

export default function(state = {}, action){
  switch (action.type) {
    case LOGIN_USER:
      return {...state, loginSuccess: action.payload}
    case SIGNUP_USER:
      return {...state, signupSuccess: action.payload}
    case AUTH_USER:
      return {...state, userData: action.payload}
    case AUTH_USER_EMAIL:
      return {...state, emailAuth: action.payload}
    default:
      return state;
  }
}