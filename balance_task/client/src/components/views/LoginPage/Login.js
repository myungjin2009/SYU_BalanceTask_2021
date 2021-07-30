import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const changeId = (e, setId) =>{
  const {target: {value}} = e;
  setId(value);
}

const changePassword = (e, setPassword) =>{
  const {target: {value}} = e;
  setPassword(value);
}

const Login = (props) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const postUser = async(e) =>{
    e.preventDefault();
    try {
      axios({
        method: "POST",
        url: "/api/user",
        data:{
          id, password
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  const onButtonHandler = () =>{
    window.location = "https://www.youtube.com/";
  }

  return (
    <Container>
      <Header>
        <h1>Balance</h1>
        <h1>Task</h1>
      </Header>
      <LoginBox onSubmit={postUser}>
        <input type="text" placeholder="ID" onChange={(e)=>changeId(e, setId)}/>
        <input type="password" placeholder="PASSWORD" onChange={(e)=>changePassword(e, setPassword)} autoComplete="off"/>
        <button type="submit">로그인</button>
      </LoginBox>
      <DefaultLoginBox>
        <button type="button">
          <i className="fas fa-comment"></i>
          <span onClick = {onButtonHandler}>카카오 로그인</span>
        </button>
        <Content>
          <Default>
            <Link to="/finding_id">아이디를 잊으셨습니까?</Link>
            <Link to="/finding_pw">비밀번호를 잊으셨습니까?</Link>
          </Default>
          <button>회원가입</button>
        </Content>
      </DefaultLoginBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  padding: 2vh;
`;

const Header = styled.header`
  text-align: center;
  color: #0288d1;
  font-weight: 800;
  font-size: 1.5rem;
  line-height: 200%;
  height: 20vh;
  margin-top: 15vh;
`;

const LoginBox = styled.form`
  border-radius: 10px;
  width: 100%;
  background: #e0e0e0;
  height: 30vh;
  margin-bottom: 3vh;
  display:flex;
  flex-direction: column;
  align-items: center;
  padding: 6vh 10px;
  &>input{
    width: 80%;
    height: 5vh;
    margin: 0.5vh 0;
    outline: none;
    border: none;
    padding: 10px 3px;
    font-size: 1.1rem;
  }
  &>button{
    background: #0288d1;
    width: 50%;
    border:none;
    color: white;
    padding: 8px;
    margin-top: 3vh;
    box-shadow: 1px 1px 1px gray;
    &:active{
      box-shadow: -1px -1px 1px gray;
    }
  }
`;

const DefaultLoginBox = styled.div`
  border-radius: 10px;
  width: 100%;
  background: #e0e0e0;
  height: 20vh;
  display: flex;
  flex-direction: column;
  align-items:center;

  &>button{
    margin: 2vh 0;
    width: 200px;
    background: #ffeb3b;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    box-shadow: 1px 1px 1px gray;
    &:active{
      box-shadow: -1px -1px 1px gray;
    }
    &>i{
      width:20%;
    }
    &>span{
      display: inline-block;
      width: 60%;
      margin-right:20%;
      padding: 10px;
    }
  }
`;
const Content = styled.div`
  width: 100%;
  display:flex;
  align-items: center;
  height: 48%;
  margin-bottom: 2%;
  &>button{
    background: #0288d1;
    width: 40%;
    border:none;
    color: white;
    padding: 8px;
    margin: 15px;
    box-shadow: 1px 1px 1px gray;
    &:active{
      box-shadow: -1px -1px 1px gray;
    }
`;

const Default = styled.div`
  width: 60%;
  text-align: center;
  &>a{
    display: block;
    text-decoration: underline;
  }
`;

export default Login;