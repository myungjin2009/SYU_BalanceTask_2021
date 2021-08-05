import { RECEIVE_GROUPS_CARD } from "./types";
import axios from "axios";

export function receiveGroupSearchCard(){
  const request = axios.get('/api/group/search_card')
  .then(response => response.data).catch(err => console.log(err));
  
  return {
    type: RECEIVE_GROUPS_CARD,
    payload: request
  }
}