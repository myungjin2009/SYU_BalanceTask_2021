import React, {useEffect} from "react";
import {useHistory} from "react-router";  //history.push에 propr값 넘겨주기 위한 임포트
import styled, {keyframes} from "styled-components";
import Navigation from "../Navigation/Navigation";

import {withRouter} from "react-router";
import Project from "./Project";
import { useSelector, useDispatch } from "react-redux";
import { chooseLoading, receiveProjectMypage } from "../../../_actions/user_action";

const receiveMyPageData = (dispatch, setMyPageData) =>{
  dispatch(receiveProjectMypage()).then(res => {
    if(res.payload.success){
      console.log('데이터 받기 성공');
      console.log(res.payload);
      setMyPageData({profile:res.payload.profile,project_list:res.payload.project_list});
      dispatch(chooseLoading(false));
    }
  });
}

const MyPage = (props) => {
  const state = useSelector(state => state.user);
  const isLoading = useSelector(state => state.user.isLoading);

  const history = useHistory();                                 //history.push
  const dispatch = useDispatch();

  
  const ImgBtn = React.useRef();                                //프로필 수정 버튼
  const ImgBtnClick = () => {
    ImgBtn.current.click();
  }                                                             //프로필 수정 버튼
  
  const {profile, project_list, userData} = state;
  
  const [detailImageFile, setDetailImageFile] = React.useState(null);   //프로필 이미지
  const [detailImageUrl, setDetailImageUrl] = React.useState(null);     //프로필 이미지
  const [myPageData, setMyPageData] = React.useState({profile, project_list});
  
  const test1 = myPageData.project_list.map((el ,i) => (<Project key={i} ProjectList = {el}/>));
  const {ProfileName, ProfileImage, FinishedPJ, ContinuingPJ, Score, ProfileMessage} = myPageData.profile;
  useEffect(()=>{
    if(isLoading){
      //만약 백엔드 개발자와 얘기하면서 한다면 dispatch(chooseLoading(false));를 지우세요 오직 receiveMyPageData함수에서만 사용하세요
      receiveMyPageData(dispatch, setMyPageData);
      console.log(myPageData);
      // dispatch(chooseLoading(false));
    }
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
          <Header style={{background: "#eee", borderRadius: "15px"}} isLoading={isLoading}>

          </Header>
          <Introduce style={{background: "#eee"}} isLoading={isLoading}>

          </Introduce>
          <WorkingBlock>

          </WorkingBlock>

        </>:
        (<>
          <Header isLoading={isLoading}>
          
            <div className="profile_IMG" onClick = {() => props.history.push({
              pathname: '/editProfileImage',
              state: {image: ProfileImage}
            })} >
              {detailImageUrl ? <UserProfile url = {detailImageUrl}></UserProfile>:<img className="Profile" alt="Profile" src={ProfileImage} />}
              <div className="EditProfile">
                <i className="fas fa-user-circle"></i>
                <input type="file" ref={ImgBtn} id="input_file" style={{display:"none"}} accept='image/*' name='file' onChange={profileImgChange} />
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
                <i className="fas fa-cog" onClick={()=>{props.history.push('/settings')}}></i>
              </div>
            </div>
          
          </Header>
          
          <Introduce>
            <div className="profileIntroduce">프로필 소개</div>
            <div className = "profileMessage" >{ProfileMessage}</div>
            <div className = "editIcon" onClick={() => {
              history.push(`/EditProfileMessage/${ProfileMessage}`)
              }}>
              <i className="far fa-edit"></i>
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
const UserProfile = styled.div`
  background-image: url('${(props) => props.url}');
  width: 12vh;
  height: 12vh;
  border-radius: 50%;
  background-size: cover;
  border: 2px solid white;
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