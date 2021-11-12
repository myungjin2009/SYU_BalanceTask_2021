import React, { useEffect, useState } from 'react';
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
    const [userData, setUserData] = useState(null);
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
          //회원일 때
          //방문객만 오게 할 때
          if(option === false){
            props.history.push('/my_page');
            return;
          }

          //그룹이 같을 때만 그룹 전용 페이지 갈 수 있게 하기
          if(params.group){
            const match_group = params.group;
            const user_group_list = response.payload.group;
            const isGroupUser = user_group_list.filter((user_group) => {
              return match_group === user_group.group;
            });
            if(isGroupUser.length === 0){
              props.history.push('/my_page');
              return;
            }
          }
          setUserData(response.payload);
        }
      });
      
    },[]);
    return(
      <SpecificComponent userData={userData}/>
    )
  }
  return AuthenticationCheck;
}