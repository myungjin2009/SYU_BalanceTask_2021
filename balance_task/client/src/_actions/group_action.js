import {
  RECEIVE_GROUPS_CARD,
  LOADING,
  JOIN_GROUP,
  VOTE_FOR_POSTS,
  RECEIVE_NOTICE,
  RECEIVE_TIMELINE,
  CREATE_GROUP,
  RESET_POSTS,
  RECEIVE_GROUP_MEMBER,
  SEND_EVALUATION,
  END_PROJECT,
  SEND_ALERT_MESSAGE,
  UPDATE_GROUP_CARD,
  DELETE_GROUP_CARD,
  DELETE_POST
} from "./types";
import axios from "axios";

//로딩을 알려주는 함수
export function chooseLoadingGroup(isLoading) {
  return {
    type: LOADING,
    isLoading,
  };
}

/* 그룹 찾기 페이지 */
//그룹카드들 받기
export function receiveGroupCard(dataToSubmit) {
  //const body = {
  //   last_number: groups_list.length-1, => 현재까지 groups_list의 마지막 데이터 번호를 볼 수 있다.
  // };
  const request = axios
    .post("/api/group/search_card", dataToSubmit) //마지막 번호 보내기
    .then((response) => response.data)
    .catch((err) => console.log(err));

  return {
    type: RECEIVE_GROUPS_CARD,
    payload: request,
  };
}

//해당 그룹을 삭제하기
export function deleteGroupCard(dataToSubmit){
  const request = axios.delete('/api/group/search_card', {data:{dataToSubmit}})
  .then(res => Promise.resolve({server_data: res.data, removed_post_id: dataToSubmit.id}))
  .catch(err => console.log(err));
  return {
    type: DELETE_GROUP_CARD,
    payload: request
  }
}

//해당 그룹을 업데이트하기
export function updateGroupCard(formData, config){
  const request = axios.put('/api/group/search_card', formData, config)
  .then(res => Promise.resolve({server_data: res.data, updated_post: formData}))
  .catch(err => console.log(err));
  return {
    type: UPDATE_GROUP_CARD,
    payload: request
  }
}

//해당 그룹에 가입신청하기
export function joinGroup(dataToSubmit) {
  const request = axios
    .post("/api/group/participation", dataToSubmit)
    .then((response) => response.data)
    .catch((err) => console.log(err));

  return {
    type: JOIN_GROUP,
    payload: request,
  };
}

/* 그룹 만들기 페이지 */
export function createGroup(formData, config){
  const request = axios.post('/api/group/create_group', formData, config)
  .then(response => response.data)
  .catch((err) => console.log(err));
  
  return {
    type: CREATE_GROUP,
    payload: request
  }
}
export function resetPosts(dataToSubmit){
  return {
    type: RESET_POSTS,
    payload:dataToSubmit
  }
}
/*프로젝트 현황 페이지 */
//timeline 게시물 데이터 받기
export function receiveTimeline(dataToSubmit) {
  // dataToSubmit에는 밑에 데이터가 있음
  //const body = {
  //   last_number: entireTimeline.length-1, => 현재까지 timelineList의 마지막 데이터 번호를 볼 수 있다.
  //   group: userData.group
  // };
  //다른 것도 자세히 알고싶다면, receiveTimeline같은 action creator함수를 ctrl + 왼쪽 클릭하면 이 함수를 어디에서 썼는지 볼 수 있다.
  const request = axios
    .post("/api/group/timeline", dataToSubmit)
    .then((response) => response.data)
    .catch((err) => console.log(err));
  return {
    type: RECEIVE_TIMELINE,
    payload: request,
  };
}

/*프로젝트 공지사항 페이지 */
//notice 게시물 데이터 받기
export function receiveNotice(dataToSubmit) {
  const request = axios
    .post("/api/group/notice", dataToSubmit)
    .then((response) => response.data)
    .catch((err) => console.log(err));

  return {
    type: RECEIVE_NOTICE,
    payload: request,
  };
}

// notice, timeline 모든 게시물 투표하기
export function voteForPosts(dataToSubmit) {
  const request = axios
    .post("/api/group/vote", dataToSubmit) //서버에서 이사람의 정보를 수정해주면된다.
    .then((response) => {
      console.log(dataToSubmit);
      return Promise.resolve({ data: response.data, dataToSubmit });
    })
    .catch((err) => console.log(err));
  return {
    type: VOTE_FOR_POSTS,
    payload: request,
  };
}

export function receiveMember(dataToSubmit){
  const request = axios.post('/api/group/member', dataToSubmit)
  .then(response => response.data)
  .catch((err) => console.log(err));
  return {
    type: RECEIVE_GROUP_MEMBER,
    payload: request
  }
}

export function sendEvaluation(dataToSubmit){
  console.log(dataToSubmit);
  const request = axios.post('/api/group/evaluation', dataToSubmit)
  .then(response => response.data)
  .catch((err) => console.log(err));
  return {
    type: SEND_EVALUATION,
    payload: request
  }
}

export function endProject(dataToSubmit){
  const request = axios.post('/api/group/completion', dataToSubmit)
  .then(res => Promise.resolve({project_end_data: res.data, group: dataToSubmit.group}))
  .catch((err) => console.log(err));
  return {
    type: END_PROJECT, 
    payload: request
  }
}

export function sendAlertMessage(dataToSubmit){
  const request = axios.post('/api/group/alert_message', dataToSubmit)
  .then(res => res.data)
  .catch(err => console.log(err));
  return {
    type: SEND_ALERT_MESSAGE,
    payload: request
  }
}

//게시글 지우기
export function deletePost(dataToSubmit){
  const request = axios.delete('/api/group/post', dataToSubmit)
  .then(response => response.data)
  .catch((err) => console.log("게시글 삭제 오류! : " + err));

  return {
    type: DELETE_POST,
    payload: request
  }
}