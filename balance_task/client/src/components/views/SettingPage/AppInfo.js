import React from "react";
import styled from "styled-components";
import Header from "../Header/Header";

import {Route} from "react-router-dom";
import {withRouter} from "react-router";

const title = "앱 정보";

class AppInfo extends React.Component {
    constructor(props) {
      super(props);
      //this.state={};
    }

    render() {
        return (
          <Container>
            <Header title={title}></Header>
            <InputBox>
              <h2>Balance Task</h2>
              　<br/>
              앱 버전 : 0.1 Beta<br/>
              <Orange>최신 버전 : 0.1 Beta<br/></Orange>
              　<br/>
              제작자 : 두유개발자<br/>
              UI : 박건형, 김명진<br/>
              Server : 백정훈, 하동호<br/>
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
    &:hover{
      background-color: rgb(21, 172, 253);
    }
    &:active {
      box-shadow: -1px -1px 1px gray;
      background-color: rgb(1,83,126);
    }
  }
`;

const Orange = styled.div`
  color: orange;
`;

export default withRouter(AppInfo);
