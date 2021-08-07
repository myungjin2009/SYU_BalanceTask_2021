import { RECEIVE_GROUPS_CARD, LOADING, JOIN_GROUP} from "./types";
import axios from "axios";

export function receiveGroupCard(dataToSubmit){
  const index_data = dataToSubmit.length-1; //마지막 번호
  const request = axios.post('/api/group/search_card',index_data) //마지막 번호 보내기
  .then(response => response.data).catch(err => console.log(err));
  
  return {
    type: RECEIVE_GROUPS_CARD,
    payload: request
  }
}
//해당 그룹에 가입신청하기
export function joinGroup(dataToSubmit){
  const request = axios.post("/api/group/participation", dataToSubmit)
  .then(response => response.data).catch(err => console.log(err));

  return {
    type: JOIN_GROUP,
    payload: request
  }
}
//로딩을 알려주는 함수
export function chooseLoading(isLoading){
  return {
    type: LOADING,
    isLoading
  }
}
