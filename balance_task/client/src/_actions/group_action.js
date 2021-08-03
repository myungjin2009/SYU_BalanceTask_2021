import { RECEIVE_POSTS } from "./types";
import axios from "axios";

export function receivePosts(){
  const request = axios.get('/api/group/posts')
  .then(response => response.data).catch(err => console.log(err));
  
  return {
    type: RECEIVE_POSTS,
    payload: request
  }
}