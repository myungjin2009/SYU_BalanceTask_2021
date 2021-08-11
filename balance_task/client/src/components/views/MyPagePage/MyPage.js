import React from "react";
import styled from "styled-components";
import Navigation from "../Navigation/Navigation";


import profile_default from '../../../images/profile_sample.jpg';
import settings_icon from '../../../images/settings_icon.png';
import edit_icon from '../../../images/edit_icon.png';
import {Route} from "react-router-dom";
import {withRouter} from "react-router";

import Settings from "../SettingPage/Settings";
//리뷰
//명진 내가 MyPageOfGunHyung.js 만들었으니 그거 참고해서 해봐
//이 코드들의 문제는 html 태그의 혼동이 핵심인 것 같아(name태그, info태그)
//styled-component는 SCSS문법이잖아? 그럼 무조건 const 변수 형식으로 만들어줘야해
//예를 들자면 44번 코드 보면 이러한 태그를 쓰려면, const profile_IMG = styled.div``; 형식으로 만들어줘야해
//이렇게 안만들고 그냥 어떤 스타일 컴포넌트의 자식으로서 스타일컴포넌트로 쓰면 인식을 못해 
//그래서 내가 새로만든 js파일 보면 스타일컴포넌트 먹이려던 태그들 모두 className을 붙여줬어!

//지금 주로 class형 컴포넌트를 쓰는 데 이건 너 취향이니까 상관 없지만, 나중에 material ui 같은거 활용할 때
//적용을 못할 수도 있어. 물론 class형 컴포넌트 사용하면 튼튼한 느낌이 있긴 하다만.. 
//아 그리고 class형 컴포넌트는 redux 적용할 때 props안에 redux의 store 데이터를 녹이는 방면, 
// 함수형 컴포넌트는 props에 녹이는 게 아니라 필요할 때마다 redux로부터 데이터를 빼낼 수 있어
//지금 내가 다 함수형 컴포넌트를 사용해서 redux 사용할 때는 불편할 수 있으니 바꾸면 좋을 것 같아! 
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