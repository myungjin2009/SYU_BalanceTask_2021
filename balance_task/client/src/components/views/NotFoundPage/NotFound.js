import React from 'react';
import styled from 'styled-components';
import {withRouter} from "react-router";

const NotFound = (props) =>{
  return(
    <Container>
      <Header>없는 페이지입니다.</Header>
      <p>현재 페이지는 없는 페이지입니다.<br/>
        또는 로그인을 안하셔서 없는 페이지일 수도 있습니다.</p>
      <button onClick={()=>props.history.goBack()}>뒤로 가기</button>
    </Container>
  )
}
const Container = styled.div`
  width: 100vw;
  padding: 10px;
  &>p{
    margin-top: 5vh;
    text-align: center;
  }
  &>button{
    display: block;
    margin: 10vh auto;
    height: 40px;
    padding:3px 10px;
    border-radius:30px;
    background: #eee;
  }
`;

const Header = styled.h1`
  margin-top: 15vh;
  text-align: center;
`;

export default withRouter(NotFound);