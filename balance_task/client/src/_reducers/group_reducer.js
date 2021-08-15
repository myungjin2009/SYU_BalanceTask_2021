import {
  RECEIVE_GROUPS_CARD,
  LOADING,
  JOIN_GROUP,
  VOTE_FOR_POSTS,
  RECEIVE_NOTICE,
  RECEIVE_TIMELINE,
} from "../_actions/types";
import img1 from "../images/노답.jpg";
import img2 from "../images/멋쟁이들.jpg";
import img3 from "../images/별.jpg";

const initialState = {
  groups_list: [
    {
      title: "멋쟁이",
      content: `열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.`,
      writer: "박건형",
      date: "2021-08-01 ~ 2021-09-01",
      image: img1,
      kind: "학교 조별 과제",
    },
    {
      title: "두유개발자",
      content: `열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.`,
      writer: "거녕",
      date: "2021-08-01 ~ 2021-09-01",
      image: img2,
      kind: "팀 프로젝트",
    },
    {
      title: "키다리아저씨",
      content: "재단에서 프로젝트 할 사람 모집",
      writer: "키다리",
      date: "2021-07-09 ~ 2021-08-03",
      image: img3,
      kind: "팀 프로젝트",
    },
    {
      title: "키다리아저씨",
      content: "재단에서 프로젝트 할 사람 모집",
      writer: "키다리",
      date: "2021-07-09 ~ 2021-08-03",
      image: img3,
      kind: "팀 프로젝트",
    },
    {
      title: "키다리아저씨",
      content: "재단에서 프로젝트 할 사람 모집",
      writer: "키다리",
      date: "2021-07-09 ~ 2021-08-03",
      image: img3,
      kind: "팀 프로젝트",
    },
    {
      title: "키다리아저씨",
      content: "재단에서 프로젝트 할 사람 모집",
      writer: "키다리",
      date: "2021-07-09 ~ 2021-08-03",
      image: img3,
      kind: "팀 프로젝트",
    },
    {
      title: "키다리아저씨",
      content: "재단에서 프로젝트 할 사람 모집",
      writer: "키다리",
      date: "2021-07-09 ~ 2021-08-03",
      image: img3,
      kind: "팀 프로젝트",
    },
    {
      title: "키다리아저씨",
      content: "재단에서 프로젝트 할 사람 모집",
      writer: "키다리",
      date: "2021-07-09 ~ 2021-08-03",
      image: img3,
      kind: "팀 프로젝트",
    },
    {
      title: "키다리아저씨",
      content: "재단에서 프로젝트 할 사람 모집",
      writer: "키다리",
      date: "2021-07-09 ~ 2021-08-03",
      image: img3,
      kind: "팀 프로젝트",
    },
    {
      title: "키다리아저씨",
      content: "재단에서 프로젝트 할 사람 모집",
      writer: "키다리",
      date: "2021-07-09 ~ 2021-08-03",
      image: img3,
      kind: "팀 프로젝트",
    },
    {
      title: "키다리아저씨",
      content: "재단에서 프로젝트 할 사람 모집",
      writer: "키다리",
      date: "2021-07-09 ~ 2021-08-03",
      image: img3,
      kind: "팀 프로젝트",
    },
    {
      title: "키다리아저씨",
      content: "재단에서 프로젝트 할 사람 모집",
      writer: "키다리",
      date: "2021-07-09 ~ 2021-08-03",
      image: img3,
      kind: "팀 프로젝트",
    },
    {
      title: "키다리아저씨",
      content: "재단에서 프로젝트 할 사람 모집",
      writer: "키다리",
      date: "2021-07-09 ~ 2021-08-03",
      image: img3,
      kind: "팀 프로젝트",
    },
    {
      title: "키다리아저씨",
      content: "재단에서 프로젝트 할 사람 모집",
      writer: "키다리",
      date: "2021-07-09 ~ 2021-08-03",
      image: img3,
      kind: "팀 프로젝트",
    },
    {
      title: "키다리아저씨",
      content: "재단에서 프로젝트 할 사람 모집",
      writer: "키다리",
      date: "2021-07-09 ~ 2021-08-03",
      image: img3,
      kind: "팀 프로젝트",
    },
  ],
  timelineList: [
    {
      id:1,
      group: '두유개발자',
      photo_name: "오늘 공부한 것",
      photo_url: img1,
      content: `오늘 공부 했는데 오류가 나왔어요.. 
      그래도 노력했습니다! 노력 많이 했는데, 통과 시켜주시죠? 😊 제발 부탁드려요
      제발!!!!!!!!!!!!!!!!!!! 아아가가가가가각가가각 거의다 왔어!!!!!!!!!!!!!!!!!!!!!! 화이팅 오늘 공부 했는데 오류가 나왔어요.. 그래도 노력했습니다! 노력 많이 했는데, 통과 시켜주시죠? 😊 제발 부탁드려요
      제발!!!!!!!!!!!!!!!!!!! 아아가가가가가각가가각 거의다 왔어!!!!!!!!!!!!!!!!!!!!!! 화이팅`,
      user_name: "박건형",
      date: "2021.07.15 23:00",
      votes_list: [
        {
          user_name: "박건형",
          vote: "찬성",
        },
        {
          user_name: "하동호",
          vote: "찬성",
        },
        {
          user_name: "백정훈",
          vote: "반대",
        },
        {
          user_name: "김명진",
          vote: "찬성",
        },
      ],
      kind: "timeline",
      profileImage: img2
    },
    {
      id:2,
      group: '두유개발자',
      photo_name: "저희 좀 멋지죠?",
      photo_url: img2,
      content: "멘토님을 만나서 프로젝트 회의했다.",
      user_name: "김명진",
      date: "2021.07.15 13:00",
      votes_list: [
        {
          user_name: "박건형",
          vote: 0,
        },
        {
          user_name: "하동호",
          vote: "반대",
        },
        {
          user_name: "백정훈",
          vote: "반대",
        },
        {
          user_name: "김명진",
          vote: "찬성",
        },
      ],
      kind: "timeline",
      profileImage: img2
    },
    {
      id:3,
      group: '두유개발자',
      photo_name: "저희 좀 멋지죠?",
      photo_url: img3,
      content: "하동호 열심히 하자!",
      user_name: "박건형",
      date: "2021.07.15 13:00",
      votes_list: [
        {
          user_name: "박건형",
          vote: "찬성",
        },
        {
          user_name: "하동호",
          vote: "반대",
        },
        {
          user_name: "백정훈",
          vote: "반대",
        },
        {
          user_name: "김명진",
          vote: "찬성",
        },
      ],
      kind: "timeline",
      profileImage: img2
    },
  ],
  noticeList:[
    {
      id:1,
      group: '두유개발자',
      photo_name : '멋진 사람들',
      photo_url : img3,
      content: '다음 주 목요일(7월 22일)에 만날까요?',
      user_name: '박건형',
      date: '2021.07.15 00:01',
      votes_list : [
        {
          user_name: '박건형',
          vote: 0
        },
        {
          user_name: '하동호',
          vote: '반대'
        },{
          user_name: '백정훈',
          vote: '반대'
        },{
          user_name: '김명진',
          vote: 0
        }
      ],
      kind: "notice",
      profileImage: img2
    }
  ]
  ,
  isLoading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_GROUPS_CARD:{
      const { groups_list } = state;
      if (action.payload === undefined) {
        return state;
      }
      let new_array = [...groups_list, ...action.payload.array];
      return { ...state, groups_list: new_array };
    }
    case LOADING:{
      return { ...state, isLoading: action.isLoading };
    }
    case JOIN_GROUP:{
      return { ...state, joinSuccess: action.payload };
    }
    case RECEIVE_TIMELINE:{
      const { timelineList } = state;
      if (action.payload === undefined) {
        return state;
      }
      //서버랑 연결되면 사용
      let new_array = [...timelineList, ...action.payload.array];
      return { ...state, timelineList: new_array };
    }
    case RECEIVE_NOTICE:{
      const { noticeList } = state;
      if (action.payload === undefined) {
        return state;
      }
      //서버랑 연결되면 사용
      // const new_array = [...noticeList, ...action.payload.noticeList];
      // return {...state, noticeList: new_array};  
    }
    case VOTE_FOR_POSTS:{
      const {payload : {dataToSubmit:{kind, id, current_vote}}} = action;
      if(kind === "timeline"){
        let new_array = state.timelineList;
        new_array[id].votes_list = current_vote;
        return {...state, timelineList: new_array}
      }else if(kind === "notice"){
        let new_array = state.noticeList;
        new_array[id].votes_list = current_vote;
        return {...state, noticeList: new_array}
      }
    }
    default:
      return state;
  }
}
