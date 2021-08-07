import React from "react";
import styled from "styled-components";
import Header from "../Header/Header";

import {Route} from "react-router-dom";
import {withRouter} from "react-router";

const title = "회원탈퇴";

class Withdraw extends React.Component {
    constructor(props) {
      super(props);
      //this.state={};
    }

    render() {
        return (
          <Container>
            <Header title={title}></Header>
            <InputBox>
              <h3>정말로 회원탈퇴를 하시겠습니까?</h3>
              비밀번호를 한번 더 입력해주십시오.
              
              <input type="password"></input>
              <button>회원탈퇴 확인</button>
            </InputBox>
    
          </Container>
        );
      }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: auto;
  gap: 6vh;
`;

const InputBox = styled.div`
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


export default withRouter(Withdraw);
