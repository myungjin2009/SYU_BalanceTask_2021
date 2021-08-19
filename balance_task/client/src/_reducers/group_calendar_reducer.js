import {ADD_DATE, RECEIVE_DATE, DELETE_DATE, UPDATE_DATE} from '../_actions/types';

export default function (state = {}, action){
  switch(action.type){
    case ADD_DATE: {
      if(state.calendarList === undefined || state.calendarList === null){
        const new_array = [action.payload.addedList];
        console.log(new_array);
        return {calendarList: new_array};
      }
      const new_array = [...state.calendarList , action.payload.addedList];
      console.log(new_array);
      
      return {calendarList: new_array};
    }
    case RECEIVE_DATE: {
      return {calendarList: action.payload.calendarList};
    }
    case DELETE_DATE: {
      const new_array = state.calendarList.filter((list)=>{
        if(list.title !== action.payload.deletedList.title && 
          list.email !== action.payload.deletedList.email &&
          list.start !== action.payload.deletedList.start &&
          list.end !== action.payload.deletedList.end){
            return list;
        }
      });
      
      return {calendarList: new_array};
    }
    case UPDATE_DATE: {
      const new_array = [...state.calendarList, action.payload.updatedList]
      return {calendarList: new_array};
    }
    default: 
      return state;
  }
}