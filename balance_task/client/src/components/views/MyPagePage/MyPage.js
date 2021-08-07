import React from "react";
import styled from "styled-components";
import Navigation from "../Navigation/Navigation";


import profile_default from '../../../images/profile_sample.jpg';
import settings_icon from '../../../images/settings_icon.png';
import edit_icon from '../../../images/edit_icon.png';
import {Route} from "react-router-dom";
import {withRouter} from "react-router";

import Settings from "../SettingPage/Settings";


const ProfileName = "김둘리";
const FinishedPJ = 3;                   //아직 REDUX 적용 안함
const ContinuingPJ = 1;
const Score = 100;
const ProfileMessage = "안녕하세요, 김둘리입니다";


class MyPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header>
          
          <profile_IMG>
            <img className="Profile" alt="Profile" src={profile_default} />
          </profile_IMG>

          <profile_DETAIL>
            <name>{ProfileName}<br/></name>
            <info>진행중 : {ContinuingPJ}개<br/></info>
            <info>진행완료 : {FinishedPJ}개</info>
          </profile_DETAIL>

          <profile_REPUTATION>
          </profile_REPUTATION>

          <settings_ICON>
            <img className="Settings_icon" alt="Settings_icon" src={settings_icon} 
            onClick={()=>{this.props.history.push('/settings')}}/>
          </settings_ICON>

        </Header>

        <Introduce>
          <titleee>프로필 소개</titleee><br/>
          <input type="text" value={ProfileMessage}></input>
          <img className="Edit_icon" alt="Edit_icon" src={edit_icon} />
        </Introduce>


        <Navigation></Navigation>
      </Container>
    );
  }
}

const Container = styled.div`
  width: auto;
  height: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  vertical-align: middle;
  background-color: rgb(135,220,252);
  width: 100%;
  height: 17vh;

  & > profile_IMG {
    width: 30%;
    & > img {
      
      overflow: hidden;
      height: 12vh;
      border-radius: 50%;
      margin: 1vh 0px 0px 4vw;
      
    }
  }

  & > profile_DETAIL {
    width: 30%;
    & > name {
      font-size: 4vh;
    }
    & > info {
      font-size: 2vh;
    }
  }

  & > profile_REPUTATION {
    width: 30%;
    font-size: 4vh;
    
    height: 10vh;
    
    margin: 0px auto 0px auto;
    background-color: white;
    border-radius: 50%;
    & > circle {
      
    }
  }

  & > settings_ICON {
    width: 10%;
    & > img {
      background-color: transparent;
      border:none;
      height: 4vh;
    }
    & > img:active{
      border: solid;
    }
  }
`;

const Introduce = styled.div`
  width: 100%;
  height: 13vh;
  margin-top: 2vh;
  text-align: center;
  background-color: transparent;
  & > titleee {
    font-size: 3vh;
  }
  & > input {
    font-size: 3vh;
    text-align: center;
  }
  & > img {
    background-color: transparent;
    border:none;
    height: 5vh;
    margin-left: 5px
  }
`;


export default withRouter(MyPage);