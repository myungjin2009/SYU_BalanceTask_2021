import axios from "axios";
import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_USER,
  AUTH_USER_EMAIL
}from './types';

export function loginUser(dataToSubmit){
  const request = axios.post("/api/user", dataToSubmit)
  .then(response => response.data).catch(err => console.log(err));
  return{
    type: LOGIN_USER,
    payload: request
  }
}

export function signupUser(dataToSubmit){
  const request = axios.post("/api/signup", dataToSubmit)
  .then(response => response.data).catch(err => console.log(err));
  return{
    type: SIGNUP_USER,
    payload: request
  }
}

export function authUserEmail(){
  const request = axios.get("/api/user_email")
  .then(response => response.data).catch(err => console.log(err));
  return{
    type: AUTH_USER_EMAIL,
    payload: request
  }
}

export function auth(){
  const request = axios.get('/api/user/auth')
  .then(response => response.data).catch(err => console.log(err));

  return{
    type: AUTH_USER,
    payload: request
  }
}

