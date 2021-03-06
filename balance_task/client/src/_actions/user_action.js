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
  POST_NOTICE_CONFIRM,
  POST_NOTICE_REJECT,
  LOADING_WORKERLIST_DATA,
  ADD_WORKER_IN_GROUP,
  DELETE_WORKER,
  SET_PROJECT_LIST,
  GET_EVALUATION,
  SET_NUMBER
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
  .then(res => {return res.data;});
  
  return {
    type: RECEIVE_MYPAGE,
    payload: request
  }
}


//다른 사용자가 그룹 리더에게 그룹 신청할 때 오는 알림 받기
export function postNoticeConfirm(dataToSubmit){
  const request = axios.post('/api/user/notice/confirm', dataToSubmit)
  .then(res=> Promise.resolve({notice_success: res.data, no_to_delte: dataToSubmit.no}));
  return {
    type: POST_NOTICE_CONFIRM,
    payload: request
  }
}

export function postNoticeReject(dataToSubmit){
  const request = axios.post('/api/user/notice/reject', dataToSubmit)
  .then(res=> Promise.resolve({notice_success: res.data, no_to_delte: dataToSubmit.no}));
  return {
    type: POST_NOTICE_REJECT,
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

//마이페이지 프로필 이미지 업데이터
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

//워커 삭제하기
export function deleteWorker(dataToSubmit) {
  console.log(dataToSubmit);
  const request = axios.delete('/api/user/worker', {data:{dataToSubmit}})
  .then(res=> Promise.resolve({deleted_worker: dataToSubmit.friend_id, server_data: res.data}));

  return {
    type: DELETE_WORKER,
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

//워커리스트- 로딩 함수
export function dataLoad(isDataLoading){
  return {
    type: LOADING_WORKERLIST_DATA,
    isDataLoading
  }
}

//project_timeline 이나 project_notice 페이지에서 워커 추가 가능한 함수
export function addWorker(dataToSubmit){
  const request = axios.post('/api/user/add_worker', dataToSubmit)
  .then(response => response.data)
  .catch((err) => console.log(err));

  return {
    type: ADD_WORKER_IN_GROUP,
    payload: request
  }
}
//그룹이 삭제 되면 마이페이지의 현재 진행 중인 프로젝트도 삭제 되어야해서 만듦.
export function setProjectList(request){
  return {
    type: SET_PROJECT_LIST,
    payload: request
  }
}
//해당 유저의 평가된 기록보기 함수
export function getEvaluation(dataToSubmit){
  const request = axios.post('/api/user/user_evalueation', dataToSubmit)
  .then(response => response.data)
  .catch((err) => console.log(err));

  return {
    type: GET_EVALUATION,
    payload: request
  }
}

export function setNumber(request){
  return {
    type: SET_NUMBER,
    payload: request
  }
}
