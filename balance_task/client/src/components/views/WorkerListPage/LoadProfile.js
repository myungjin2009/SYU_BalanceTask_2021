import React from 'react';
import styled from 'styled-components';
//import profile_default from './profile_sample.jpg'; //REDUX 적용후 해체 예정
import {dataLoad, receiveProjectMypage, loadWorker} from '../../../_actions/user_action';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from "react-router-dom";

const Profile_Detail_Show = (Profile_Detail_Cover,SortFilterUsers,idx,setProfile_Detail_Data) => {
    if(idx === -1) {
        console.log(Profile_Detail_Cover);
    }else {
        setProfile_Detail_Data(SortFilterUsers[idx]);
        //console.log(SortFilterUsers[idx]); 
        Profile_Detail_Cover.current.style.display="block";
        console.log(Profile_Detail_Cover);
    }
    
}

const Profile_Detail_Close = (Profile_Detail_Cover) => {
    Profile_Detail_Cover.current.style.display="none";
  }

const setMyProfileData = (setMyData,dispatch) => {
    dispatch(receiveProjectMypage()).then(res=> {
        if(res.payload.success) {
        setMyData({profile:res.payload.profile,project_list:res.payload.project_list});
        }
    });
}

const setUserProfileData = (setUserData,dispatch,props) => {
    const body = {
        id: props.userData.id
    }
    dispatch(loadWorker(body)).then(res => {
        if(res.payload.success){
            setUserData(res.payload.array);
        }
    })
}

//검색 조건에 따른 배열 필터링(쿼리)
// const filterItems = (userData, query) => {
//     return userData.filter((el) =>
//         el.name.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
// );
// }

const LoadProfile = (props) => {
    const state = useSelector(state => state.user);
    const {profile, project_list, worker_list} = state;
    const [myData, setMyData] = React.useState({profile, project_list});
    const [userData, setUserData] = React.useState(worker_list);
    const dispatch = useDispatch();
    const Profile_Detail_Cover = React.useRef(null);
    const Profile_Detail_Greenbox = React.useRef("");
    const Profile_Detail_Background = React.useRef("");
    const [Profile_Detail_Data, setProfile_Detail_Data] = React.useState({ProfileName:null,ProfileImage:null,ProfileMessage:null,Score:null});

    React.useEffect(()=>{
        if(state.isDataLoading) {
            if(props.userData != null){
                setMyProfileData(setMyData,dispatch);
                setUserProfileData(setUserData,dispatch,props);
                dispatch(dataLoad(false));
            }
        }
    },[props.userData]);

    if(props.profile === "MyProfile") {
        if(myData.profile.ProfileName == ``) {
            return(
                <Profile type="myProfile" color="rgb(230,247,230)">
                    <div className = "ProfileName">Loading</div>
                </Profile>
            );
        }else {
            return(
                <Profile type="myProfile" color="rgb(230,247,230)" onClick={()=>{Profile_Detail_Show(Profile_Detail_Cover,myData.profile,-1,setProfile_Detail_Data)}}>
                <div className = "ProfileImg">
                <img className ="ProfileimgSource" src={myData.profile.ProfileImage} />
                </div>
                <div className = "ProfileName">{myData.profile.ProfileName}</div>
                <div className = "ProfileScore">{myData.profile.Score}</div>
                <div className = "ProfileMessage">{myData.profile.ProfileMessage}</div>
                </Profile>
            );
        }
    }

    // 유저 검색 필터링하여 다시 map돌림
    const filterUsers = userData.map((val,idx) => {
        if(userData != undefined) {
            if(val.ProfileName.indexOf(props.searchValue) != -1) {
                return (val);
            }
        }
    });
    // 그냥 map돌리면 undefined 남아있는데, 그거 제거해서 새로운 배열에 집어넣음
    const SortFilterUsers = 
      filterUsers.filter(
        (element, i) => element !== undefined
      );


    if(props.profile === "WorkerProfile") {
        if(userData.length === 0) {
            return(
                <div>
                    <NoWorker>
                        <div className="NoWorkerIcon">
                            <i class="fas fa-users-slash"></i>    
                        </div>
                        <div className="NoWorkerMessage">아직 추가된 워커가 없습니다!</div>
                    </NoWorker>
                </div>
            );            
        } 

        else {
            return(
                <div>
                {SortFilterUsers.map((val,idx) => (
                    <Profile key={idx} type="userProfile" onClick={()=>{Profile_Detail_Show(Profile_Detail_Cover,SortFilterUsers,idx,setProfile_Detail_Data)}}>
                        <div className = "ProfileImg">
                            <img className ="ProfileimgSource" src={val.ProfileImage} />
                        </div>
                        <div className = "ProfileName">{val.ProfileName}</div>
                        <div className = "ProfileScore">{val.Score}</div>
                        <div className = "ProfileMessage">{val.ProfileMessage}</div>
                    </Profile>
                ))}
                <Profile_Detail ref={Profile_Detail_Cover}>
                    <div className="background" ref={Profile_Detail_Background}></div>
                    <div className="profile_background" ref={Profile_Detail_Greenbox}>
                        <div className="close_button">
                            <i class="fas fa-times" onClick={()=>{Profile_Detail_Close(Profile_Detail_Cover)}}></i>
                        </div>

                        <div className="profile_image">
                            <img className ="profile_image_source" alt="Image" src={Profile_Detail_Data.ProfileImage} />
                        </div>
                        <div className="profile_message">{Profile_Detail_Data.ProfileMessage}</div>
                    </div>
                </Profile_Detail>
                </div>
            );
        }
    }
}

const Profile = styled.div`
    height: 9vh;
    border-bottom: 2px solid rgb(200,200,200);
    background-color: ${props => props.color};
    & > .ProfileImg {
        width: 15%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.5vh;
        float: left;
        & > .ProfileimgSource {
            border: 1.5px solid black;
            overflow: hidden;
            width: 6.5vh;
            height: 6.5vh;
            border-radius: 50%;
        }
    }
    & > .ProfileName {
        line-height: 9vh;
        width: 20%;
        text-align: center;
        float: left;
        font-size: 2.5vh;
    }
    & > .ProfileMessage {
        border-radius: 13px;
        transform: translate(-8%, 27%);         //메시지박스 가운데 정렬하기 위한 코드
        padding: 4px 8px 4px 8px;
        background-color: rgb(170,231,253);
        width: 35%;
        height: 65%;
        float: right;
        font-size: 1.5vh;
    }
    & > .ProfileScore {
        border-radius: 13px;
        transform: translate(-8%, 27%);         //메시지박스 가운데 정렬하기 위한 코드
        text-align: center;
        line-height: 5.85vh;
        background-color: rgb(153,204,153);
        width: 10%;
        height: 65%;
        float: right;
        font-size: 2.5vh;
    }
`;

const NoWorker = styled.div`
    text-align: center;
    margin-top: 19vh;
    & > .NoWorkerIcon {
        font-size: 8vh;
        color: rgb(255,179,128);
    }
    & > .NoWorkerMessage {
        font-size: 3vh;
        font-weight: bold;
    }
`;

const Profile_Detail = styled.div`
    display: none;
  & > .background {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background-color: rgba(0,0,0,0.4);
    transition: 1s;
  }
  & > .profile_background {
    position: fixed;
    width: 100%;
    height: 35%;
    bottom: 8vh;
    border-radius: 20px 20px 0px 0px;
    background-color: rgb(170,228,169);
    & > .close_button {
      font-size: 25px;
      text-align: right;
      padding-right: 3vw;
    }
    & > .profile_image{
        text-align: center;
        width: 80vw;
        height: 15vh;
        transform:translate(0%, -12vh);
        background-color: rgba(0,0,0,0.4);
        & > .profile_image_source{
            display: inline-block;
            width: 15vh;
            height: 15vh;
            
        }
    }
  }
  
  
`;

export default withRouter(LoadProfile);