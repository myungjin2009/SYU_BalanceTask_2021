import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';

import { updateImage } from '../_actions/user_action';
import { useDispatch } from "react-redux";
import {chooseLoading, loadWorker} from '../_actions/user_action';

const MJPracitce = () => {

  const textValue = React.createRef();
  console.log(textValue);
  return (
    <Block>
      <input type="text" className="textBox" ref={textValue}></input>
    </Block>
  );
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
