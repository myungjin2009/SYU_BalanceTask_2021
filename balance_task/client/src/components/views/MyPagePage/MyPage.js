import React from "react";
import styled from "styled-components";
import Navigation from "../Navigation/Navigation";


import profile_default from '../../../images/profile_sample.jpg';
import settings_icon from '../../../images/settings_icon.png';
import edit_icon from '../../../images/edit_icon.png';
import {withRouter} from "react-router";


//이 코드들의 문제는 html 태그의 혼동이 핵심(name태그, info태그)
//styled-component는 SCSS문법이잖아? 그럼 무조건 const 변수 형식으로 만들어줘야해
//const profile_IMG = styled.div``; 형식으로


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
          
          <div className="profile_IMG">
            <img className="Profile" alt="Profile" src={profile_default} />
          </div>

          
          <div className="profile_DETAIL">
            <div className="name">{ProfileName}<br/></div>
            <div className="info">진행중 : {ContinuingPJ}개<br/></div>
            <div className="info">진행완료 : {FinishedPJ}개</div>
          </div>

          <div className="profile_REPUTATION">
            <div className="circle">원</div>
          </div>


          <div className="settings_ICON">
            <img className="Settings_icon" alt="Settings_icon" src={settings_icon} 
            onClick={()=>{this.props.history.push('/settings')}}/>
          </div>
        
        </Header>

        <Introduce>
          <div className="titleee">프로필 소개</div><br/>
          <input type="text" placeholder={ProfileMessage}></input>
          <img className="Edit_icon" alt="Edit_icon" src={edit_icon} />
        </Introduce>   


        <Navigation></Navigation>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100vw;
  height: auto;
`;

const Header = styled.div`
  position: relative;
  background-color: rgb(135,220,252);
  width: 100%;
  height: 17vh;

  & > .profile_IMG {
    border: 1px solid black;

    width: 30%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    float: left;
    & > img {
      
      overflow: hidden;
      height: 12vh;
      border-radius: 50%;
      
    }
  }

  & > .profile_DETAIL {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid red;
    

    width: 30%;
    height: 100%;

    

    float: left;
    & > .name {
      border: 1px solid green;
      font-size: 4vh;
    }
    & > .info {
      border: 1px solid green;
      font-size: 2vh;
    }
  }

  & > .profile_REPUTATION {
    border: 1px solid green;

    position: relative;
    width: 30%;
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
    }
  }

  & > .settings_ICON {
    border: 1px solid red;
    position: relative;

    width: 10%;
    height: 100%;
    float: left;
    & > img {
      position: absolute;
      background-color: transparent;
      border: 1px solid yellow;
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