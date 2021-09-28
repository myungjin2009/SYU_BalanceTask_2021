import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import {receiveProjectMypage, myDataLoading} from '../_actions/user_action';

const MJPracitce = (props) => {
  const dispatch = useDispatch();
  const [myData, setMyData] = React.useState({loading: true});
  const loading = useSelector(state => state.user.isMydataLoading);

  React.useEffect(()=>{
    
    if(loading) {
      dispatch(receiveProjectMypage()).then(res=> {
        if(res.payload.success) {
          setMyData(res.payload);
          dispatch(myDataLoading(false));
          console.log(res.payload);
        }
      });
    }

  },[]);

  if(myData.loading === true) {
    return(
      <Block>
        로딩중!
      </Block>
    );
  } else {
    return (
      <Block>
        <div>띵진이의 연습공간</div>
        <br/>
        <div>받아온 닉네임 : {myData.profile.ProfileName}</div>
        <div>받아온 상태메시지 : {myData.profile.ProfileMessage}</div>
      </Block>
    );
  }
}


const Block = styled.div`
  width: 300px;
  height:300px;
  & > .textBox {
    background-color: red;
    width: 200px;
    height: 30px;
  }
`;


export default withRouter(MJPracitce);
