import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_USER,
  AUTH_USER_EMAIL,
  FIND_PASSWORD,
  CHANGE_PASSWORD,
  RECEIVE_MYPAGE,
  UPDATE_MESSAGE,
  UPDATE_IMAGE,
  LOADING_MYPAGE,
  LOADING_WORKERLIST_DATA,
  RECEIVE_USERLIST,
  POST_NOTICE_CONFIRM,
  POST_NOTICE_REJECT,
  ADD_WORKER_IN_GROUP,
  DELETE_WORKER,
  SET_PROJECT_LIST
} from "../_actions/types";
import Default_Profile from "../images/profile_sample.jpg";   //기본 프사
// import hanium_logo from '../images/hanium_logo.jpg';

const initialState = {
  profile:{
    ProfileName: '',
    ProfileImage: '',
    FinishedPJ: 0,
    ContinuingPJ: 0,
    Score: '',
    ProfileMessage: `ㄴㄴ`
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
      logo: ''
    },
  ],
  worker_list:[
    {
      ProfileImage: null,
      ProfileMessage: "Loading",
      ProfileName: "Loading"
    },
  ],
  isLoading: true,
  isDataLoading : true,
  workerNum: -1,
}

export default function reducer(state = initialState, action) {
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
      if(action.payload.profile.ProfileImage == "DEFAULT"){       //프로필 이미지가 DEFAULT일 경우, 기본프로필로 강제 변경
        action.payload.profile.ProfileImage = Default_Profile;
      }
      // return { ...state, profile: action.payload.profile, 
      //   project_list: action.payload.project_list};
      console.log(action.payload);
      return { ...state, profile: action.payload.profile, project_list: action.payload.project_list, aramsdata: action.payload.aramsdata, members: action.payload.members};
    }
    case UPDATE_MESSAGE:{
      return {...state, updateMessageSuccess: action.payload.success}
    }
    case UPDATE_IMAGE: {
      return {...state, Success: action.payload.success}
    }
    case RECEIVE_USERLIST: {
      console.log(action.payload.array);
      const new_array = action.payload.array.map((val) => {     
        if(val.ProfileImage == "DEFAULT") {                       //프로필 이미지가 DEFAULT일 경우, 기본프로필로 강제 변경
          val.ProfileImage = Default_Profile;
          return(val);
        } else {
          return(val);
        }
      });
      return {...state, Success: action.payload.success, worker_list: new_array}
    }

    case POST_NOTICE_CONFIRM: { 
      const new_array = state.aramsdata.filter(data =>{
        if(data.no === action.payload.no_to_delte){
          return '';
        }
        return data;
      })
      return {...state, notice_confirm_success: action.payload.notice_success, aramsdata: [...new_array]}
    }

    case POST_NOTICE_REJECT: { 
      const new_array = state.aramsdata.filter(data =>{
        if(data.no === action.payload.no_to_delte){
          return '';
        }
        return data;
      })
      return {...state, notice_reject_success: action.payload.notice_success, aramsdata: [...new_array]}
    }

    case LOADING_MYPAGE:{
      return {...state, isLoading: action.isLoading}
    }

    case LOADING_WORKERLIST_DATA:{
      return {...state, isDataLoading: action.isDataLoading}
    }

    case ADD_WORKER_IN_GROUP:{
      const {success} = action.payload;
      console.log("그룹에서 워커 추가:",success);
      return state;
    }
    case DELETE_WORKER:{
      const {worker_list} = state;
      const new_array = worker_list.filter(el => el.id!==action.payload.deleted_worker);
      return {...state, worker_list: new_array}
    }
    case SET_PROJECT_LIST:{
      const {project_list} = state;
      const new_array = project_list.filter(el => el.id!== action.payload.id);
      console.log(action.payload.id);
      return {...state, project_list: new_array}
    }
    default:
      return state;
  }
}
