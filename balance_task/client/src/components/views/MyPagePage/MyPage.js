import React from "react";
import styled from "styled-components";
import Navigation from "../Navigation/Navigation";


import profile_default from '../../../images/profile_sample.jpg';
import settings_icon from '../../../images/settings_icon.png';
import edit_icon from '../../../images/edit_icon.png';
import {withRouter} from "react-router";

import Project from "./Project";

const ProfileName = "홍길동";
const FinishedPJ = 3;                   //아직 REDUX 적용 안함
const ContinuingPJ = 1;
const Score = 78;
const ProfileMessage = "프론트엔드 백엔드 둘다 하는 유니콘입니다. 리액트 몽고DB 깃으로 협업가능";
//ProfileMessage 글자수 제한 필요.


const MyPage = (props) => {

  const test = [1,2,3,4,5,6,7,8]
  const test1 = test.map(() => (<Project/>));

  return (
    <Container>
      <Header>
        
        <div className="profile_IMG">
          <img className="Profile" alt="Profile" src={profile_default} />
        </div>

        
        <div className="profile_DETAIL">
          <div className="name">{ProfileName}<br/></div>
          <div className="info">진행중 : {ContinuingPJ}개<br/></div>
          <div className="info">진행완료 : {FinishedPJ}개</div>
        </div>

        <div className="profile_REPUTATION">
          <div className="circle">
            <div className="Score_color"></div>
            평점
            <div className="Score_display">{Score}
            </div>
          </div>
        </div>


        <div className="settings_ICON">
          <img className="Settings_icon" alt="Settings_icon" src={settings_icon} 
          onClick={()=>{props.history.push('/settings')}}/>
        </div>
      
      </Header>

      <Introduce>
        <div className="profileIntroduce">프로필 소개</div>
        <div className = "profileMessage">{ProfileMessage}</div>
        <img className="editIcon" alt="Edit_icon" src={edit_icon} />
      </Introduce>

      <Working>참여한 프로젝트</Working>
      {test1}

      <Navigation />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 92vh;
  overflow:auto;
  min-width: 325px;
  
`;

const Header = styled.div`
  position: relative;
  background-color: rgb(135,220,252);
  height: 17vh;

  & > .profile_IMG {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    & > img {
      border: 2px solid white;
      overflow: hidden;
      width: 12vh;
      height: 12vh;
      border-radius: 50%;
    }
  }
  & > .profile_DETAIL {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 36%;
    height: 100%;
    float: left;
    & > .name {
      font-size: 4vh;
    }
    & > .info {
      font-size: 2vh;
    }
  }
  & > .profile_REPUTATION {
    position: relative;
    width: 26%;
    height: 100%;
    float: left;
    font-size: 4vh;
    & > .circle {
      border: 2px solid black;
      position: absolute;
      text-align: center;
      width: 12vh;
      height: 12vh;
      top: 50%;
      left: 50%;
      transform:translate(-50%, -50%);
      background-color: white;
      border-radius: 50%;
      font-size: 2vh;
      line-height: 8vh;
      overflow:hidden;
      & > .Score_display {
        position: absolute;
        left:50%;
        top: 0%;
        transform:translate(-50%, 40%);
        font-size: 3vh;
      }
      & > .Score_color {
        position: absolute;
        width: 13vh;
        height: 13vh;
        background-color: green;
        opacity: .4;
      }
    }
  }
  & > .settings_ICON {
    position: relative;
    width: 8%;
    height: 100%;
    float: left;
    & > img {
      position: absolute;
      background-color: transparent;
      height: 4vh;
      top: 100%;
      left: 100%;
      transform:translate(-100%, -100%);
    }
    & > img:active{
      border: solid;
    }
  }
`;

const Introduce = styled.form`
  border-radius: 15px;
  height: 13vh;
  margin-top: 2vh;
  background-color: rgb(214,214,214);
  position: relative;
  overflow: hidden;
  
  
  & > .profileIntroduce {
    background-color: rgb(185,185,185);
    position: relative;
    text-align: center;
    line-height: 5vh;
    font-size: 3vh;
    height: 40%;
  }
  & > .profileMessage {
    position: absolute;
    width: 80%;
    height: 60%;
    left: 2%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Gamja Flower', cursive;
    font-size: 3vh;
    text-align: center;
  }
  & > img {
    position: absolute;
    top: 50%;
    left: 87%;
    background-color: transparent;
    border:none;
    width: 5vh;
    height: 5vh;
  }
`;

const Working = styled.div`
  margin-top: 2vh;
  height: 5.5vh;
  background-color: rgba(199,229,251);
  text-align: center;
  font-size: 3vh;
  border-radius: 15px 15px 0 0;
  border-bottom: 2px solid gray;
  line-height: 5.5vh;
`;

export default withRouter(MyPage);