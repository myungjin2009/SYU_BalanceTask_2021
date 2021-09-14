import axios from "axios";
import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_USER,
  AUTH_USER_EMAIL,
  FIND_PASSWORD,
  CHANGE_PASSWORD,
  RECEIVE_MYPAGE,
  UPDATE_MESSAGE,
  UPDATE_IMAGE,
  LOADING_MYPAGE,
  RECEIVE_USERLIST,
  RECEIVE_APPLICATION
} from "./types";
//로그인 할 때
export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/user/login", dataToSubmit)
    .then((response) => response.data)
    .catch((err) => console.log(err));
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
//회원가입 할 때
export function signupUser(dataToSubmit){
  const request = axios.post("/api/signup", dataToSubmit)
  .then(response => response.data).catch(err => console.log(err));
  console.log(request);
  return{
    type: SIGNUP_USER,
    payload: request,
  };
}
//비밀번호 찾을 때
export function findPassword(dataToSubmit) {
  const request = axios
    .post("/api/user/check_id", dataToSubmit)
    .then((response) => response.data)
    .catch((err) => console.log(err));

  return {
    type: FIND_PASSWORD,
    payload: request,
  };
}
//비밀번호 변경할 때

export function changePassword(dataToSubmit) {
  const request = axios
    .post("/api/user/changing_password", dataToSubmit)
    .then((response) => response.data)
    .catch((err) => console.log(err));

  return {
    type: CHANGE_PASSWORD,
    payload: request,
  };
}

//이메일 인증할 때
export function authUserEmail(dataToSubmit) {
  const request = axios
    .post("/api/user_email", dataToSubmit)
    .then((response) => response.data)
    .catch((err) => console.log(err));
  return {
    type: AUTH_USER_EMAIL,
    payload: request,
  };
}
//회원인지 아닌지 매 페이지 마다 인증 할 때
export function auth() {
  const request = axios
    .get("/api/user/auth")
    .then((response) => response.data)
    .catch((err) => console.log(err));

  return {
    type: AUTH_USER,
    payload: request,
  };
}
//마이페이지에서 마이페이지 데이터 받기
export function receiveProjectMypage(){
  const request = axios.get('/api/user/receive_mypage')
  .then(res => res.data);

  return {
    type: RECEIVE_MYPAGE,
    payload: request
  }
}

//다른 사용자가 그룹 리더에게 그룹 신청할 때 오는 알림 받기
export function receiveApplication(){
  const request = axios.get('/api/user/receive_mypage/notice')
  .then(res=> res.data);
  return {
    type: RECEIVE_APPLICATION,
    payload: request
  }
}

//마이페이지에서 마이페이지 중 메시지만 데이터 업데이티하기
export function updateMessage(dataToSubmit){
  const request = axios.post('/api/user/update_mypage/message', dataToSubmit)
  .then(res => res.data);

  return {
    type: UPDATE_MESSAGE,
    payload: request
  }
}

//이미지 업데이터
export function updateImage(dataToSubmit, config){
  const request = axios.post('/api/user/update_mypage/photo', dataToSubmit, config)
  .then(res=> res.data);

  return {
    type: UPDATE_IMAGE,
    payload: request
  }
}

//워커리스트-유저 불러오기
export function loadWorker(dataToSubmit) {
  const request = axios.post('/api/user/load_worker', dataToSubmit)
  .then(res=> res.data);

  return {
    type: RECEIVE_USERLIST,
    payload: request
  }
}

//로딩을 알려주는 함수
export function chooseLoading(isLoading){
  return {
    type: LOADING_MYPAGE,
    isLoading
  }
}