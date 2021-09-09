import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {auth} from '../_actions/user_action';

export default function(SpecificComponent, option, adminRoute = null){
  /* option*/
  //null => 아무나 출입 가능한 페이지
  //true => 로그인한 유저만 출입 가능한 페이지
  //false => 로그인한 유저는 출입 불가능한 페이지

  /*adminRoute*/
  // true => admin이 쓸 페이지
  // null => admin 페이지로 안쓴다!

  function AuthenticationCheck(props){
    const dispatch = useDispatch();
    const {match: {params}} = props;
    useEffect(()=>{
      dispatch(auth())
      .then(response => {
        console.log(response);
        if(!response.payload.isAuth){
          if(option){
            props.history.push('/');
          }
        }else{
          if(option === false){
            props.history.push('/my_page');
            return;
          }
          if(params.group){
            const match_group = params.group;
            const user_group_list = response.payload.group;
            // console.log(user_group_list);
            const isGroupUser = user_group_list.filter((user_group) => {
              // console.log(user_group === match_group);
              return match_group === user_group.group;
            });
            // console.log("읽어라",isGroupUser);
            if(isGroupUser.length === 0){
              props.history.push('/my_page');
              return;
            }
          }
        }
      });
      
    },[]);
    return(
      <SpecificComponent/>
    )
  }
  return AuthenticationCheck;
}