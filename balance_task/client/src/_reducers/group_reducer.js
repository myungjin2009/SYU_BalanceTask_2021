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
  DELETE_POST,
  LOADING_WORKERLIST_NUM
} from "../_actions/types";
// import img1 from "../images/노답.jpg";
// import img2 from "../images/멋쟁이들.jpg";
// import img3 from "../images/별.jpg";

const initialState = {
  groups_list: [
    // {
    //   title: "멋쟁이",
    //   content: `열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    // 열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    // 열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    // 열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    // 열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    // 열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    // 열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    // 열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.`,
    //   writer: "박건형",
    //   date: "2021-08-01 ~ 2021-09-01",
    //   image: img1,
    //   kind: "학교 조별 과제",
    // },
  ],
  timelineList: [
    // {
    //   id:1,
    //   group: '두유개발자',
    //   photo_name: "오늘 공부한 것",
    //   photo_url: img1,
    //   content: `오늘 공부 했는데 오류가 나왔어요.. 
    //   그래도 노력했습니다! 노력 많이 했는데, 통과 시켜주시죠? 😊 제발 부탁드려요
    //   제발!!!!!!!!!!!!!!!!!!! 아아가가가가가각가가각 거의다 왔어!!!!!!!!!!!!!!!!!!!!!! 화이팅 오늘 공부 했는데 오류가 나왔어요.. 그래도 노력했습니다! 노력 많이 했는데, 통과 시켜주시죠? 😊 제발 부탁드려요
    //   제발!!!!!!!!!!!!!!!!!!! 아아가가가가가각가가각 거의다 왔어!!!!!!!!!!!!!!!!!!!!!! 화이팅`,
    //   user_name: "박건형",
    //   date: "2021.07.15 23:00",
    //   votes_list: [
    //     {
    //       user_name: "박건형",
    //       vote: "찬성",
    //     },
    //     {
    //       user_name: "하동호",
    //       vote: "찬성",
    //     },
    //     {
    //       user_name: "백정훈",
    //       vote: "반대",
    //     },
    //     {
    //       user_name: "김명진",
    //       vote: "찬성",
    //     },
    //   ],
    //   kind: "timeline",
    //   profileImage: img2
    // },
   ],
  noticeList:[
    // {
    //   id:1,
    //   group: '두유개발자',
    //   photo_name : '멋진 사람들',
    //   photo_url : img3,
    //   content: '다음 주 목요일(7월 22일)에 만날까요?',
    //   user_name: '박건형',
    //   date: '2021.07.15 00:01',
    //   votes_list : [
    //     {
    //       user_name: '박건형',
    //       vote: 0
    //     },
    //     {
    //       user_name: '하동호',
    //       vote: '반대'
    //     },{
    //       user_name: '백정훈',
    //       vote: '반대'
    //     },{
    //       user_name: '김명진',
    //       vote: 0
    //     }
    //   ],
    //   kind: "notice",
    //   profileImage: img2
    // },
  ],
  workerNum: 0,
  group_end_data: [],
  isLoading: {timeline: true, notice: true, group_search: true},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_GROUPS_CARD:{
      const { groups_list } = state;
      if (action.payload === undefined) {
        return state;
      }
      if(!action.payload.array_status){
        return state;
      }
      let new_array = [...groups_list, ...action.payload.array];
      return { ...state, groups_list: new_array };
    }
    case UPDATE_GROUP_CARD:{
      const {updated_post} = action.payload;
      let new_obj = {};
      for(var pair of updated_post.entries()) {
        new_obj[pair[0]] = pair[1];
      }
      let new_array = state.groups_list.map(el => {
        if(updated_post.board_number===el.id){
          return new_obj;
        }
        return el;
      });
      
      return {...state, groups_list: new_array};
    }
    case DELETE_GROUP_CARD:{
      console.log(action.payload);
      const {removed_post_id} = action.payload;
      let new_array = state.groups_list.filter(el => removed_post_id !== el.id);
      console.log("예전: "+ state.groups_list);
      console.log('지금: '+new_array);
      return {...state, groups_list: new_array};
    }
    case LOADING:{
      console.log(action.isLoading);
      return { ...state, isLoading: {...state.isLoading, ...action.isLoading} };
    }
    case JOIN_GROUP:{
      return { ...state, joinSuccess: action.payload };
    }
    case RESET_POSTS:{
      return {...state, timelineList:[], noticeList:[]}
    }
    case RECEIVE_TIMELINE:{
      const { timelineList } = state;
      if (action.payload === undefined) {
        return state;
      }else{
        //서버랑 연결되면 사용
        let new_array = [...timelineList, ...action.payload.array];
        console.log("1",timelineList);
        console.log("2",action.payload.array);
        return { ...state, timelineList: new_array };
      }
    }
    case RECEIVE_NOTICE:{
      const { noticeList } = state;
      if (action.payload === undefined) {
        return state;
      }
      //서버랑 연결되면 사용
      const new_array = [...noticeList, ...action.payload.array];
      return {...state, noticeList: new_array};  
    }
    case CREATE_GROUP:{
      return {...state, createGroupSuccess: action.payload}
    }
    case VOTE_FOR_POSTS:{
      if(action.payload.dataToSubmit){
        const {payload : {dataToSubmit:{current_vote, timeline_no}}} = action;
        let new_array = state.timelineList;
        new_array[timeline_no].votes_list = current_vote;
        return {...state, timelineList: new_array}
      }
      return state;
    }
    case RECEIVE_GROUP_MEMBER:{
      const {success, group_members, isLeader} = action.payload;
      if(group_members){
        console.log("팀원 리스트",success);
        return {...state, group_members};
      }
      return {...state, group_members:[]};
    }
    case SEND_EVALUATION:{
      return state;
    }
    case END_PROJECT:{
      console.log(action.payload);
      const {group, project_end_data} = action.payload;
      const new_obj = {
        group,
        group_completion: project_end_data.group_completion
      }
      return {...state, group_end_data: [...state.group_end_data, new_obj]}
    }
    case SEND_ALERT_MESSAGE: {
      return state;
    }

    case DELETE_POST:{  //이게 맞는건지 확인 못함
      console.log(action.payload);
      //const {removed_post_id} = action.payload;
      //let new_array = state.timelineList.filter(el => removed_post_id !== el); 
      //return { ...state, timelineList: new_array };
      return { ...state };
    }

    case LOADING_WORKERLIST_NUM:{
      return {...state, workerNum: action.workerNum}
    }

    default:
      return state;
  }
}
