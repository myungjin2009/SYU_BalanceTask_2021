import React, {useEffect} from "react";
import {useHistory} from "react-router";  //history.push에 propr값 넘겨주기 위한 임포트
import styled, {keyframes} from "styled-components";
import Navigation from "../Navigation/Navigation";

import {withRouter} from "react-router";
import Project from "./Project";
import { useSelector, useDispatch } from "react-redux";
import { chooseLoading, receiveProjectMypage } from "../../../_actions/user_action";
import Notice from "../common/Notice";
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';

const receiveMyPageData = (dispatch, setMyPageData, setIsNotice, mounted) =>{
  dispatch(receiveProjectMypage()).then(res => {
    if(res.payload.success && mounted){
      setMyPageData({profile:res.payload.profile,project_list:res.payload.project_list});
      if(res.payload.arams){
        console.log(res.payload.arams);
        setIsNotice(true);
      }
      dispatch(chooseLoading(false));
    }
  });
}

const MyPage = (props) => {
  const state = useSelector(state => state.user);
  const isLoading = useSelector(state => state.user.isLoading);
  //console.log(state, isLoading);
  const history = useHistory();                                 //history.push
  const dispatch = useDispatch();

  
  const ImgBtn = React.useRef();                                //프로필 수정 버튼
  
  const {profile, project_list, userData} = state;
  
  const [detailImageFile, setDetailImageFile] = React.useState(null);   //프로필 이미지
  const [detailImageUrl, setDetailImageUrl] = React.useState(null);     //프로필 이미지
  const [myPageData, setMyPageData] = React.useState({profile, project_list});
  const [isNotice, setIsNotice] = React.useState(false);
  const test1 = myPageData.project_list.map((el ,i) => (<Project key={i} ProjectList = {el}/>));
  const {ProfileName, ProfileImage, FinishedPJ, ContinuingPJ, Score, ProfileMessage} = myPageData.profile;
  useEffect(()=>{
    let mounted = true;
    if(isLoading && mounted){
      //만약 백엔드 개발자와 얘기하면서 한다면 dispatch(chooseLoading(false));를 지우세요 오직 receiveMyPageData함수에서만 사용하세요
      receiveMyPageData(dispatch, setMyPageData, setIsNotice, mounted);
      //console.log(myPageData);
      // dispatch(chooseLoading(false));
    }
    return () =>(mounted= false);
  },[isLoading, userData]);

  const profileImgChange = (event) => {                         //프로필 이미지
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setDetailImageUrl(base64.toString());
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      //이 코드가 onloadend의 트리거가 된다.
      //그 덕에 setThumbnail함수가 이 코드가 2번 실행되는 것같다.
      //그리고 reader.result 안에 base64 인코딩 된 스트링 데이터가 있게 된다.
      setDetailImageFile(event.target.files[0]);
    } else {
      setDetailImageUrl(null);
      setDetailImageFile(null);
    }
  };                                                              //프로필 이미지

  return (
    <Container>
      {
        isLoading ? <>
          <Header style={{background: "#eee", borderRadius: "15px"}} isLoading={isLoading}/>
          <Introduce style={{background: "#eee"}} isLoading={isLoading}/>
          <WorkingBlock/>

        </>:
        (<>
          <Header isLoading={isLoading}>
          
            <div className="profile_IMG" onClick = {() => props.history.push({
              pathname: '/editProfileImage',
              state: {image: ProfileImage}
            })} >
              {detailImageUrl ? <UserProfile url = {detailImageUrl}></UserProfile>:<img className="Profile" alt="Image" src={ProfileImage} />}
              {/* <input type="file" ref={ImgBtn} id="input_file" style={{display:"none"}} accept='image/*' name='file' onChange={profileImgChange} /> */}
            </div>
    
            
            <div className="profile_DETAIL">
              <div className="name">{ProfileName}<br/></div>
              <div className="info">진행중 : {ContinuingPJ}개<br/></div>
              <div className="info">진행완료 : {FinishedPJ}개</div>
            </div>
            
            <div className="profile_REPUTATION">
              <div className="circle" onClick={()=>props.history.push('/score')}>
                <div className="Score_color"></div>
                  평점
                <div className="Score_display">{Score}
                </div>
              </div>
            </div>
          
          </Header>

          <Introduce>
            <div className="ProfileHeader">
              <NotificationsIcon className="icon" onClick={()=>{props.history.push('/my_page/notice')}}/>
              <div className="profileIntroduce">프로필</div>
              <SettingsIcon className="icon" onClick={()=>{props.history.push('/settings')}}/>
            </div>
            <div className="ProfileContent">
              <div className = "profileMessage" >{(ProfileMessage == "undefined") ? "'나'를 한 줄로 소개해보세요!" : ProfileMessage}</div>
              <div className = "editIcon">
                <EditIcon onClick={() => {history.push(`/EditProfileMessage/${ProfileMessage}`)}}/>
              </div>
            </div>
          </Introduce>

          {isNotice && <Notice handleOnClick={() => {props.history.push('/my_page/notice')}}></Notice>}
          
          <Working>참여중인 프로젝트</Working>
          {(test1.length != 0) ? test1 : 
              <NoGroup>
                  <div className="NoWorkerIcon">
                      <i className="fas fa-business-time"></i>    
                  </div>
                  <div className="NoWorkerMessage">현재 참여중인 프로젝트가 없습니다!</div>
                  <div className="RecommendMessage">그룹 찾기를 통해 새로운 그룹에 가입해보세요.</div>
                  <div className="RecommendArrow">
                    <i className="fas fa-sort-down"></i>
                  </div>
              </NoGroup>
          }
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
const UserProfile = styled.div`
  background-image: url('${(props) => props.url}');
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  background-size: cover;
  border: 2px solid white;
  left: 6px;
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
      width: 10vh;
      height: 10vh;
      border-radius: 50%;
      left: 6px;
    }
  }
  & > .profile_DETAIL {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 100%;
    float: left;
    & > .name {
      font-size: 3.5vh;
    }
    & > .info {
      font-size: 1.7vh;
    }
  }
  & > .profile_REPUTATION {
    position: relative;
    width: 30%;
    height: 100%;
    float: left;
    font-size: 4vh;
    & > .circle {
      border: 2px solid black;
      position: absolute;
      text-align: center;
      width: 10vh;
      height: 10vh;
      top: 50%;
      left: 50%;
      transform:translate(-50%, -50%);
      background-color: white;
      border-radius: 50%;
      font-size: 2vh;
      line-height: 6vh;
      overflow:hidden;
      & > .Score_display {
        position: absolute;
        left:50%;
        top: 0%;
        transform:translate(-50%, 50%);
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
  & > .icon_container {
    position: relative;
    width: 8%;
    height: 100%;
    float: left;
    & > .icons {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      font-size: 4vh;
      top: 100%;
      left: 100%;
      transform:translate(-100%, -100%);
      & > i:active{
        color: white;
      }
    }
    
  }
`;

const Introduce = styled.form`
  border-radius: 15px;
  height: 13vh;
  margin: 2vh 6px 0 6px;
  background-color: rgb(214,214,214);
  position: relative;
  overflow: hidden;
  animation: ${blinkEffect} 0.8s ease-in-out infinite;
  ${({isLoading})=> !isLoading && "animation: none"};
  
  & > .ProfileHeader{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(185,185,185);
    height: 40%;
    & > .profileIntroduce {
      font-size: 2.5vh;
    }
    & > .icon {
      font-size: 4vh;
      margin: 0 1vh 0 1vh;
      & : active{
        color: white;
      }
    }
  }
  & > .ProfileContent {
    display: flex;
    width: 100%;
    height: 60%;
    align-items: center;
    justify-content: center;
    & > .profileMessage {
      margin: 0 1vh 0 1vh;
      font-family: 'Gamja Flower', cursive;
      font-size: 2.5vh;
      text-align: center;
    }
    & > .editIcon {
      margin: 0 1vh 0 1vh;
      background-color: transparent;
      font-size: 4vh;
    }
    & > .editIcon:active{
      color: white;
    }
  }
`;

const ArrowMove = keyframes`
    0% {
      transform:translate(0, 0);
      opacity: 0.5;
    }
    100% {
      transform:translate(0, 35%);
      opacity: 1;
    }
`;

const NoGroup = styled.div`
    text-align: center;
    margin-top: 12vh;
    & > .NoWorkerIcon {
      font-size: 8vh;
      color: rgb(255,179,128);
    }
    & > .NoWorkerMessage {
      font-size: 3vh;
      font-weight: bold;
    }
    & > .RecommendMessage {
      font-size: 2.5vh;
      margin-top: 1.5vh;
    }
    & > .RecommendArrow{
      opacity: 0.5;
      font-size: 5vh;
      color: rgba(74,171,242);
      margin-top: 5vh;
      animation: ${ArrowMove} 0.5s 1s 10 ease alternate;
    }
`;

const Working = styled.div`
  margin: 2vh 6px 0 6px;
  height: 5.5vh;
  background-color: rgba(199,229,251);
  text-align: center;
  font-size: 2.5vh;
  border-radius: 15px 15px 0 0;
  border-bottom: 2px solid rgb(210,210,210);
  line-height: 5.5vh;
`;

export default withRouter(MyPage);