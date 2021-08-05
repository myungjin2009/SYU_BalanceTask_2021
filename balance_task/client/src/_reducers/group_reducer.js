import { RECEIVE_GROUPS_CARD } from "../_actions/types";
import img1 from '../images/노답.jpg';
import img2 from '../images/멋쟁이들.jpg';
import img3 from '../images/별.jpg';

const initialState={
  groups_list:[{
    "title": "멋쟁이",
    "content": `열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.`,
    "writer": "박건형",
    "date": "2021-08-01 ~ 2021-09-01",
    "image": img1,
    "kind": '학교 조별 과제'
  },
  {
    "title": "두유개발자",
    "content": `열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
    열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.`,
    "writer": "거녕",
    "date": "2021-08-01 ~ 2021-09-01",
    "image": img2,
    "kind": '팀 프로젝트'
  },
  {
    "title": "키다리아저씨",
    "content": "재단에서 프로젝트 할 사람 모집",
    "writer": "키다리",
    "date": "2021-07-09 ~ 2021-08-03",
    "image": img3,
    "kind": '팀 프로젝트'
  }]
}

export default function(state=initialState,action){
  switch (action.type) {
    case RECEIVE_GROUPS_CARD:
      const {groups_list} = state;
      const new_array = {...groups_list, ...action.payload};
      return {...state, groups_list: new_array};
    default:
      return state;
  }
}