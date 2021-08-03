import { RECEIVE_POSTS } from "../_actions/types";

export default function(state={},action){
  switch (action.type) {
    case RECEIVE_POSTS:
    
    default:
      return state;
  }
}