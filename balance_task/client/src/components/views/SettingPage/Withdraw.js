import React,{useState} from "react";
import styled from "styled-components";
import Header from "../Header/Header";
import {withRouter} from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
const title = "회원탈퇴";

const WithDraw = (props) => {
  const userData = useSelector(state => state.user.userData);
  const [password, setPassword] = useState('');
  const onChangeInput = (e) =>{
    setPassword(e.target.value);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(password===''){
      alert('비밀번호를 입력해주세요!');
      return;
    }
    const response = axios.delete('/api/user', {data:{password, id: userData.id}}).then(res => res.data);
    console.log(response);
    if(response){
      alert("회원탈퇴 성공하였습니다.");
      window.location.replace("/");
    }else{
      alert('알 수 없는 오류가 발생하였네요!');
      setPassword('');
    }
  }

  return (
    <Container onSubmit={handleOnSubmit}>
      <Header title={title}></Header>
      <InputBox>
        <h3>정말로 회원탈퇴를 하시겠습니까?</h3>
        비밀번호를 한번 더 입력해주십시오.
        
        <input type="password" value={password} onChange={onChangeInput}></input>
        <button type="submit">회원탈퇴 확인</button>
      </InputBox>

    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const InputBox = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  width: 70vw;
  padding-top: 2vh;
  padding-bottom: 2vh;
  border-radius: 5px;
  background: #eee;


  & > input {
    width: 65%;
    margin-top: 5vh;
    padding: 5px;
    outline: none;
    font-size: 16px;
    border: 1px solid gray;
    border: 2px solid rgb(255,0,0);
  }

  & > h3 {
      margin-top: 2vh;
  }

  & > button {
    background: rgb(168,1,1);
    width: 50%;
    border: none;
    color: white;
    padding: 11px;
    margin-top: 5vh;
    margin-bottom: 3vh;
    box-shadow: 1px 1px 1px gray;
    &:hover{
      background-color: rgb(217, 1, 1);
    }
    &:active {
      box-shadow: -1px -1px 1px gray;
      background-color: rgb(132,1,1);
    }
  }
`;


export default withRouter(WithDraw);
