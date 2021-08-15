import {ADD_DATE, RECEIVE_DATE, DELETE_DATE, UPDATE_DATE} from '../_actions/types';

export default function (state = {}, action){
  switch(action.type){
    case ADD_DATE: {
      //store에 calendarList가 없을 때
      //백엔드에서는 client에서 보내준 데이터를 다시 줘야함.
      if(state.calendarList === undefined || state.calendarList === null){
        const new_array = [action.payload.calendarList];
        return {calendarList: new_array};
      }
      const new_array = [...state.calendarList , action.payload.calendarList];
      return {calendarList: new_array};
    }
    case RECEIVE_DATE: {
      return {calendarList: action.payload.calendarList};
    }
    case DELETE_DATE: {
      return {calendarList: action.payload.calendarList};
    }
    case UPDATE_DATE: {
      return {calendarList: action.payload.calendarList};
    }
    default: 
      return state;
  }
}