import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import logo from './balance_task.png';
import { Dot, LoadingWrapper, BounceAnimation } from './LoadingStyles'

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
  const dispatch = useDispatch();

  const [login, setLogin] = useState(false);
  const [disable, setDisable] = useState(false);      //임시, 기본값: false 필수 凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸凸

  const postUser = async(e) =>{
    e.preventDefault();
    if(id===''||password===''){
      alert('아이디 비밀번호 모두 입력해주시기바랍니다!');
      return;
    }
    const body = {
      id,password
    }
    setLogin(true);
    setDisable(true);
    dispatch(loginUser(body))
    .then(response => {
      console.log(response);
      if(response.payload.success===true){
        window.location.replace('/my_page');
      }else{
        alert('아이디 또는 비밀번호가 맞지 않습니다!');
        setLogin(false);
        setDisable(false);
      }
    });
    
  }

  const onButtonHandler = () =>{
    window.location = "http://localhost:5000/kakao";
  }

  return (
    <Container>
      <div style={{width:"50px", position:"absolute"}} onClick={()=>window.open(logo)}>
        <img src={logo} style={{width:"100%"}}/>
      </div>
      <Header>
        <h1>Balance</h1>
        <h1>Task</h1>
      </Header>
      <LoginBox onSubmit={postUser}>
        <input type="email" placeholder="Email" value={id} onChange={(e)=>changeId(e, setId)}/>
        <input type="password" placeholder="PASSWORD" value={password} onChange={(e)=>changePassword(e, setPassword)} autoComplete="off"/>
        <button type="submit" disabled={disable}>{(login == true) ? "로그인 중입니다...2" : "로그인"}</button>
      </LoginBox>
      <DefaultLoginBox>
        {/* <button type="button">
          <i className="fas fa-comment"></i>
          <span onClick = {onButtonHandler}>카카오 로그인</span>
        </button> */}
        <Content>
          <Default>
            <Link to="/finding_password">비밀번호를 잊으셨습니까?</Link>
          </Default>
          <button style={{background: "#fef01b", color: 'black'}} onClick={()=> props.history.push("/signup")}>
            회원가입
          </button>
        </Content>
      </DefaultLoginBox>
      {login && <LoadingDiv>
        <div className="LoadingBox">
          <div className="AnimationBox">
            <LoadingWrapper>
              <Dot delay="0s" />
              <Dot delay="0.1s" />
              <Dot delay="0.2s" />
            </LoadingWrapper>
          </div>
          불러오는 중..
        </div>
      </LoadingDiv>}
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
    &:disabled{
      background-color: rgb(2,78,120);
    }
  }
`;

const DefaultLoginBox = styled.div`
  border-radius: 10px;
  width: 100%;
  background: #e0e0e0;
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
    padding: 8px;
    margin: 15px;
    box-shadow: 1px 1px 1px gray;
    &:active{
      box-shadow: -1px -1px 1px gray;
    }
    color: white;  
`;

const LoadingDiv = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    & > .LoadingBox {
      width: 15vh;
      height: 15vh;
      background-color: rgba(0,0,0,0.6);
      border-radius: 3vh;
      font-size: 1.8vh;
      font-weight: bold;
      text-align: center;
      color: white;
      & > .AnimationBox {
        width: 100%;
        height: 70%;
        top: 0;
      }
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

export default withRouter(Login);