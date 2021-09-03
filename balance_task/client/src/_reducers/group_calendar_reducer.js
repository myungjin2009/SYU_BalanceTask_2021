import {ADD_DATE, RECEIVE_DATE, DELETE_DATE, UPDATE_DATE} from '../_actions/types';

export default function (state = {}, action){
  switch(action.type){
    case ADD_DATE: {
      if(state.calendarList === undefined || state.calendarList === null){
        const new_obj = action.payload;
        console.log(new_obj);
        return {calendarList: new_obj};
      }
      const new_array = [...state.calendarList , action.payload];
      console.log(new_array);
      
      return {calendarList: new_array};
    }
    case RECEIVE_DATE: {
      return {calendarList: action.payload.calendarList};
    }
    case DELETE_DATE: {
      const new_array = state.calendarList.filter((list)=>list.id !== action.payload.id);
      return {calendarList: new_array};
    }
    case UPDATE_DATE: {
      console.log(state.calendarList);
      const update_array = state.calendarList.filter((list) => {
        console.log(action.payload.updateData);
      
          // if(list.id ===Number(action.payload.updateData.id)){
          // return list;
          // }
      
          return list;
        
      });
      update_array = {...update_array, title: action.payload.updateData.title};
      const new_array = [...state.calendarList, update_array];
      //const new_array = [...state.calendarList, action.payload.updatedList]
      return {calendarList: new_array};
    }
    default: 
      return state;
  }
}