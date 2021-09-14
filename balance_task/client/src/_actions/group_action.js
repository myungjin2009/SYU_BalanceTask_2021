import {
  RECEIVE_GROUPS_CARD,
  LOADING,
  JOIN_GROUP,
  VOTE_FOR_POSTS,
  RECEIVE_NOTICE,
  RECEIVE_TIMELINE,
  CREATE_GROUP
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
    .then((response) => {
      console.log(dataToSubmit);
      return response.data;
    })
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
