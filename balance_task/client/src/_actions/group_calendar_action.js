import axios from 'axios';
import {ADD_DATE, RECEIVE_DATE, UPDATE_DATE, DELETE_DATE} from './types';
//그룹 캘린더에서는 조회, 삭제, 업데이트, 생성 모두 데이터가 바뀌어야한다.
//순서를 살펴보자
//처음에 캘린더를 키면 데이터베이스의 데이터를 가져와야한다.
//만약 데이트를 추가를 한다면 리덕스 store에 저장된 데이터도 수정하고

export function addDate(dataToSubmit){
  const request = axios.post('/api/group_calendar/adding_date', dataToSubmit)
  .then(response => response.data);

  return {
    type: ADD_DATE,
    payload: request
  }
}

export function receiveDate(){
  const request = axios.post('/api/group_calendar/adding_date')
  .then(response => response.data);

  return {
    type: RECEIVE_DATE,
    payload: request
  }
}

export function updateDate(dataToSubmit){
  const request = axios.post('/api/group_calendar/adding_date', dataToSubmit)
  .then(response => response.data);

  return {
    type: UPDATE_DATE,
    payload: request
  }
}

export function deleteDate(dataToSubmit){
  const request = axios.post('/api/group_calendar/adding_date', dataToSubmit)
  .then(response => response.data);

  return {
    type: DELETE_DATE,
    payload: request
  }
}

