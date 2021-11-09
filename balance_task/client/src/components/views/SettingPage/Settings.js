import React from "react";
import styled from "styled-components";
import Header from "../Header/Header";
import axios from "axios";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import EditAccount from "./EditAccount";

const title = "설 정";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    //this.state={};
  }

  signoutHandler = () =>{
    const is_signout = window.confirm('정말로 로그아웃하시겠습니까?');
    is_signout && axios.get('/api/user/logout').then((response)=>{
      if(response.data.success){
        window.location.replace("/")
      }else{
        alert('오류 발생!');
      }
    })
  }
  

  render() {
    return (
      <Container>
        <Header title={title}></Header>
        <InputBox>
          <button
            onClick={() => {
              this.props.history.push("/settings/EditAccount");
            }}
          >
            회원정보 수정
          </button>
          <button
            onClick={this.signoutHandler}
          >
            로그아웃
          </button>
          <button
            onClick={() => {
              this.props.history.push("/settings/AppInfo");
            }}
          >
            앱 정보
          </button>
          <button
            onClick={() => {
              this.props.history.push("/settings/Contact");
            }}
          >
            문의하기
          </button>
          <button
            onClick={() => {
              this.props.history.push("/settings/Withdraw");
            }}
          >
            회원탈퇴
          </button>
        </InputBox>
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const InputBox = styled.div`
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

  & > button {
    background: #0288d1;
    width: 85%;
    border: none;
    color: white;
    padding: 11px;
    margin-top: 2vh;
    margin-bottom: 2vh;
    box-shadow: 1px 1px 1px gray;
    &:hover {
      background-color: rgb(21, 172, 253);
    }
    &:active {
      box-shadow: -1px -1px 1px gray;
      background-color: rgb(1, 83, 126);
    }
  }
`;

export default withRouter(Settings);
