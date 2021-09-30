import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import {receiveProjectMypage, myDataLoading} from '../_actions/user_action';

const MJPracitce = (props) => {

  return (
    <Block>
      <div>띵진이의 연습공간</div>
    </Block>
  )

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
