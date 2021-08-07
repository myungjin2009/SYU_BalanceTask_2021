import axios from "axios";
import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_USER,
  AUTH_USER_EMAIL,
  FIND_PASSWORD,
  CHANGE_PASSWORD
}from './types';
//로그인 할 때
export function loginUser(dataToSubmit){
  const request = axios.post("/api/user/login", dataToSubmit)
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
  console.log(request);
  return{
    type: SIGNUP_USER,
    payload: request
  }
}
//비밀번호 찾을 때
export function findPassword(dataToSubmit){
  const request = axios.post("/api/user/check_id",dataToSubmit)
  .then(response => response.data).catch(err => console.log(err));

  return{
    type: FIND_PASSWORD,
    payload: request
  }
}
//비밀번호 변경할 때

export function changePassword(dataToSubmit){
  const request = axios.post('/api/user/changing_password', dataToSubmit)
  .then(response =>response.data).catch(err => console.log(err));

  return{
    type: CHANGE_PASSWORD,
    payload: request
  }
}

//이메일 인증할 때
export function authUserEmail(dataToSubmit){
  const request = axios.post("/api/user_email", dataToSubmit)
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

