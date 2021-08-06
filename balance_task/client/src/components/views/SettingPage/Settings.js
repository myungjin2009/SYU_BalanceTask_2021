import React from "react";
import styled from "styled-components";
import Header from "../Header/Header";

import {Route} from "react-router-dom";
import {withRouter} from "react-router";
import EditAccount from "./EditAccount";


const title = "설 정";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    //this.state={};
    console.log(props.history);
  }

  render() {
    return (
      <Container>
        <Header title={title}></Header>
        <InputBox>
          //왜 안되지
          <button onClick={(props) => {props.history.push('/settings/EditAccount')}}>회원정보 수정</button>
          <button>앱 정보</button>
          <button>문의하기</button>
          <button>회원탈퇴</button>
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

  & > button {
    background: #0288d1;
    width: 85%;
    border: none;
    color: white;
    padding: 11px;
    margin-top: 2vh;
    margin-bottom: 2vh;
    box-shadow: 1px 1px 1px gray;
    &:hover{
      background-color: rgb(21, 172, 253);
    }
    &:active {
      box-shadow: -1px -1px 1px gray;
      background-color: rgb(1,83,126);
    }
  }
`;


export default withRouter(Settings);
