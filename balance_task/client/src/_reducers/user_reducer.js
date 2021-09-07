import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_USER,
  AUTH_USER_EMAIL,
  FIND_PASSWORD,
  CHANGE_PASSWORD,
  RECEIVE_MYPAGE,
  UPDATE_MESSAGE,
  LOADING_MYPAGE
} from "../_actions/types";
import hanium_logo from '../images/hanium_logo.jpg';
import profile_default from '../images/profile_sample.jpg';

const initialState = {
  profile:{
    ProfileName: '',
    ProfileImage: profile_default,
    FinishedPJ: 0,
    ContinuingPJ: 0,
    Score: '',
    ProfileMessage: `ㄴㄴ`,
  },
  project_list:[
    {
      id: 1,
      group: "두유개발자",
      project_Host: "주식회사한이음",
      project_StartZLine: 20210820,
      project_DeadLine: 20210920,
      favoriteList: false,
      Finished: false,
      logo: hanium_logo
    },
  ],
  isLoading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case SIGNUP_USER:
      return { ...state, signupSuccess: action.payload };
    case AUTH_USER:{
      const data={...state, userData: action.payload, profile: {...state.profile, ProfileName: action.payload.name}};
      return data;
    }
    case AUTH_USER_EMAIL:
      return { ...state, emailAuth: action.payload };
    case FIND_PASSWORD:
      return { ...state, findingPasswordSuccess: action.payload };
    case CHANGE_PASSWORD:
      return { ...state, changingPasswordSuccess: action.payload };
    case RECEIVE_MYPAGE:{
      if(action.payload === undefined || action.payload === null){
        return state;
      }
      return { ...state, profile: action.payload.profile, 
        project_list: action.payload.project_list};
    }
    case UPDATE_MESSAGE:{
      return {...state, updateMessageSuccess: action.payload.success}
    }
    case LOADING_MYPAGE:{
      return {...state, isLoading: action.isLoading}
    }
    default:
      return state;
  }
}
