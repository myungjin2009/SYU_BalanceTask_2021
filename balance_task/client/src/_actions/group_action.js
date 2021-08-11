import { RECEIVE_GROUPS_CARD, LOADING, JOIN_GROUP, VOTE_FOR_POSTS, RECEIVE_NOTICE, RECEIVE_TIMELINE} from "./types";
import axios from "axios";
//그룹 찾기 페이지에서 그룹카드들 받기
export function receiveGroupCard(indexToSubmit){
  const index_data = indexToSubmit.length-1; //마지막 번호
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
//timeline 게시물 데이터 받기
export function receiveTimeline(indexToSubmit){
  const index_data = indexToSubmit.length-1; //마지막 번호
  const request = axios.post("/api/group/timeline", index_data)
  .then(response => response.data).catch(err =>console.log(err));
  return{
    type: RECEIVE_TIMELINE,
    payload: request
  }
}
//notice 게시물 데이터 받기
export function receiveNotice(indexToSubmit){
  const index_data = indexToSubmit.length-1; //마지막 번호
  const request = axios.post('/api/group/notice', index_data)
  .then(response => response.data).catch(err => console.log(err));

  return {
    type: RECEIVE_NOTICE,
    payload: request
  }
}
// notice, timeline 모든 게시물 투표하기
export function voteForPosts(dataToSubmit){
  const request = axios.post('/api/group/vote', dataToSubmit) //서버에서 이사람의 정보를 수정해주면된다.
  .then(response => response.data).catch(err => console.log(err));
  return {
    type: VOTE_FOR_POSTS,
    payload: {request, dataToSubmit}
  }
}

