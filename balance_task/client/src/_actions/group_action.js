import { RECEIVE_GROUPS_CARD } from "./types";
import axios from "axios";

export function receiveGroupSearchCard(dataToSubmit){
  const index_data = dataToSubmit.length-1; //마지막 번호
  const request = axios.post('/api/group/search_card',index_data) //마지막 번호 보내기
  .then(response => response.data).catch(err => console.log(err));
  
  return {
    type: RECEIVE_GROUPS_CARD,
    payload: request
  }
}