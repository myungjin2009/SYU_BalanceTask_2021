import React, { useState } from "react";
import styled from "styled-components";
import {withRouter} from 'react-router-dom';

import { updateImage } from '../_actions/user_action';
import { useDispatch } from "react-redux";

const MJPracitce = () => {
  const dispatch = useDispatch();
  const OnImgChange = (event) => {
  
    const formData = new FormData();
    formData.append('image',event.target.files[0]);

    const config = {
      headers: {
        'content-type': "multipart/form-data"
      }
    }
  
    dispatch(updateImage(formData, config)).then((res) => {
      if(res.payload.success) {
        console.log('업로드 된거임?');
        console.log(res.payload.success);
      }
      //props.history.push('/group_search');
      // if(res.payload.success){
      //   props.history.push('/group_search');
      // }
    });
  }

  return (
    <Block>
       <input type="file" accept="image/*" onChange={OnImgChange}></input> 
    </Block>
  );
}


const Block = styled.div`
  width: 200px;
  height:200px;
`;


export default withRouter(MJPracitce);
