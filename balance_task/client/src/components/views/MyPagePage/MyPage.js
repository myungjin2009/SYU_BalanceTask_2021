import React, { useEffect } from "react";
import styled, {keyframes} from "styled-components";
import Navigation from "../Navigation/Navigation";
import Modal from './Modal';


import settings_icon from '../../../images/settings_icon.png';
import edit_icon from '../../../images/edit_icon.png';
import {withRouter} from "react-router";

import Project from "./Project";
import { useSelector, useDispatch } from "react-redux";
import { chooseLoading, receiveProjectMypage } from "../../../_actions/user_action";



const receiveMyPageData = (dispatch, userData) =>{
  // const {email, name} = userData;
  const body = {
    // email, name
  }
  dispatch(receiveProjectMypage(body)).then(res => {
    // if(res.payload.success){
      
    // }
    console.log('ddsasdas');
    dispatch(chooseLoading(false));
  });
}

const MyPage = (props) => {
  const[modalOpen, setModalOpen] = React.useState(false);       //모달창
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }                                                       //모달창

  const state = useSelector(state => state.user);
  console.log(state);
  const {profile, project_list} = state;
  const {ProfileName, ProfileImage, FinishedPJ, ContinuingPJ, Score, ProfileMessage} = profile;
  const isLoading = useSelector(state => state.user.isLoading);
  const userData = useSelector(state => state.user.userData);
  const dispatch = useDispatch();
  const test1 = project_list.map((el ,i) => (<Project key={i} ProjectList = {el}/>));
  
  useEffect(()=>{
    if(isLoading){
      //만약 백엔드 개발자와 얘기하면서 한다면 dispatch(chooseLoading(false));를 지우세요 오직 receiveMyPageData함수에서만 사용하세요
      receiveMyPageData(dispatch, userData);
      dispatch(chooseLoading(false));
    }
  },[isLoading]);

  return (
    <Container>
      {
        isLoading ? <>
          <Header style={{background: "#eee", borderRadius: "15px"}} isLoading={isLoading}>

          </Header>
          <Introduce style={{background: "#eee"}} isLoading={isLoading}>

          </Introduce>
          <WorkingBlock>

          </WorkingBlock>

        </>:
        (<>
          <Header isLoading={isLoading}>
          
            <div className="profile_IMG">
                <img className="Profile" alt="Profile" src={ProfileImage} />
              <div className="EditProfile">
                <i class="fas fa-user-circle"></i>
              </div>
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
    
            <div className="settings">
              <div className="Settings_icon">
                <i class="fas fa-cog" onClick={()=>{props.history.push('/settings')}}></i>
              </div>
            </div>
          
          </Header>
          
          <Introduce>
            <div className="profileIntroduce">프로필 소개</div>
            <div className = "profileMessage" onClick={openModal}>{ProfileMessage}</div>
            <Modal open={ modalOpen } close={ closeModal } header="Modal heading">
              테스트모달
            </Modal>
            <div className = "editIcon">
              <i class="far fa-edit"></i>
            </div>
          </Introduce>
    
          <Working>참여한 프로젝트</Working>
          {test1}
          <Navigation />
        </>)
      }
      
    </Container>
  );
}

const blinkEffect = keyframes`
  50%{
    opacity: 0;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 92vh;
  overflow:auto;
  min-width: 325px;
  
`;
const WorkingBlock = styled.div`
  margin-top: 3vh;
  background: #eee;
  width: 100vw;
  height: 20vh;
  border-radius: 15px;
  animation: ${blinkEffect} 0.8s ease-in-out infinite;
`;
const Header = styled.div`
  position: relative;
  background-color: rgb(135,220,252);
  height: 17vh;
  animation: ${blinkEffect} 0.8s ease-in-out infinite;
  ${({isLoading})=> !isLoading && "animation: none"};
  & > .profile_IMG {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    & > .Profile {
      border: 2px solid white;
      overflow: hidden;
      width: 12vh;
      height: 12vh;
      border-radius: 50%;
    }
    & > .EditProfile {
      position: absolute;
      font-size: 4vh;
      top: 85%;
      left: 24%;
      transform:translate(-24%, -85%);
    }
    & > .EditProfile:active{
      color: white;
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
  & > .settings {
    position: relative;
    width: 8%;
    height: 100%;
    float: left;
    & > .Settings_icon {
      position: absolute;
      
      font-size: 4vh;
      top: 100%;
      left: 100%;
      transform:translate(-100%, -100%);
    }
    & > .Settings_icon:active{
      color: white;
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
  animation: ${blinkEffect} 0.8s ease-in-out infinite;
  ${({isLoading})=> !isLoading && "animation: none"};
  
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
  & > .editIcon {
    position: absolute;
    top: 44%;
    left: 87%;
    background-color: transparent;
    font-size: 4vh;
  }
  & > .editIcon:active{
    color: white;
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