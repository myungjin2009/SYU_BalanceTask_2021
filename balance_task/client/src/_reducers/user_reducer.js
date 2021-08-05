import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_USER,
  AUTH_USER_EMAIL,
  FIND_PASSWORD,
  CHANGE_PASSWORD,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case SIGNUP_USER:
      return { ...state, signupSuccess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case AUTH_USER_EMAIL:
      return { ...state, emailAuth: action.payload };
    case FIND_PASSWORD:
      return { ...state, findingPasswordSuccess: action.payload };
    case CHANGE_PASSWORD:
      return { ...state, changingPasswordSuccess: action.payload };
    default:
      return state;
  }
}
