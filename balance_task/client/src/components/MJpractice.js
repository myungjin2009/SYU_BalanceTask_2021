import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';

import { updateImage } from '../_actions/user_action';
import { useDispatch } from "react-redux";
import {chooseLoading, loadWorker} from '../_actions/user_action';

const MJPracitce = () => {
  const dispatch = useDispatch();
  const [data,setData] = React.useState(null);

  dispatch(loadWorker()).then(res => {  //유즈이팩트로 둬야지 병시나아ㅏ아아아아아앙아ㅏ아ㅏ아아아아ㅏㅏㅏㅇ아
    if (res.payload.success) {
      console.log('데이터 받기 성공');
      //setData(res.payload);
    }
  });


  //console.log(data);





  return (
    <Block>
      개샛기야
    </Block>
  );
}


const Block = styled.div`
  width: 200px;
  height:200px;
`;


export default withRouter(MJPracitce);
