import axios from "axios";
import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_USER,
  AUTH_USER_EMAIL,
  FIND_PASSWORD
}from './types';
//로그인 할 때
export function loginUser(dataToSubmit){
  const request = axios.post("/api/user", dataToSubmit)
  .then(response => response.data).catch(err => console.log(err));
  return{
    type: LOGIN_USER,
    payload: request
  }
}
//회원가입 할 때
export function signupUser(dataToSubmit){
  const request = axios.post("/api/signup", dataToSubmit)
  .then(response => response.data).catch(err => console.log(err));
  return{
    type: SIGNUP_USER,
    payload: request
  }
}
//이메일 인증할 때
export function authUserEmail(){
  const request = axios.get("/api/user_email")
  .then(response => response.data).catch(err => console.log(err));
  return{
    type: AUTH_USER_EMAIL,
    payload: request
  }
}
//회원인지 아닌지 매 페이지 마다 인증 할 때
export function auth(){
  const request = axios.get('/api/user/auth')
  .then(response => response.data).catch(err => console.log(err));

  return{
    type: AUTH_USER,
    payload: request
  }
}

