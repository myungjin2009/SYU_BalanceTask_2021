import React, { useEffect, useRef, useState } from 'react'
import {withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header/Header';

const changeEmail = (e, setEmail) =>{
  const {target: {value}} = e;
  setEmail(value);
}

const changeName = (e, setName) =>{
  const {target: {value}} = e;
  setName(value);
}
const changeAuthNumber = (e, setAuthNumber) =>{
  const {target: {value}} = e;
  setAuthNumber(value);
}
function FindingPW(props) {
  const [isClick, setIsClick] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [authNumber, setAuthNumber] = useState('');

  const title="비밀번호 찾기";

  const idBox = useRef(null);
  const onSubmitHandler = (e) =>{
    e.preventDefault();
    //만약 인증번호와 이름, 이메일이 맞다면
    setIsClick(true);
  }

  useEffect(() => {
    if(isClick){
      if(idBox!==null){
        idBox.current.style.display = "flex";
      }
    }
  }, [isClick]);

  return (
    <Container>
      <Header title={title}/>
      <InputBox>
        <input type="text" value={name} onChange={(e)=>changeName(e, setName)} placeholder="이름"/>
        <input type="email" value={email} onChange={(e)=>changeEmail(e, setEmail)} placeholder="이메일"/>
        <button>인증번호 받기</button>
        <input type="text" value={authNumber} onChange={(e)=>changeAuthNumber(e, setAuthNumber)} placeholder="인증번호를 입력해주세요"/>
        <button type="submit" onClick={onSubmitHandler}>확인</button>
      </InputBox>
      <IdBox ref={idBox}>
        <header>비밀번호를 바꿔보세요.</header>
        <input type="password" placeholder="비밀번호" autoComplete="none"/>
        <input type="password" placeholder="비밀번호확인" autoComplete="none"/>
        <button type="submit">제출하기</button>
      </IdBox>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  gap: 5vh;
  
`;

const InputBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  width: 70vw;
  padding: 30px;
  border-radius: 5px;
  background: #eee;
  &>*{
    margin: 5px 0;
  }
  &>input{
    padding: 5px;
    outline: none;
    font-size: 16px;
    border: 1px solid gray;
    border:none;
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


const IdBox = styled.form`
  display: none;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  padding: 30px;
  border: none;
  border-radius: 5px;
  gap: 10px;
  background: #c1d5e0;
  &>*{
    margin: 5px 0;
  }
  &>header{
    font-weight: bold;
  }
  &>input{
    padding: 5px;
    outline: none;
    font-size: 16px;
    border: 1px solid gray;
    border:none;
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


export default withRouter(FindingPW);
