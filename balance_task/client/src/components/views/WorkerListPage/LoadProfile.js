import React from 'react';
import styled from 'styled-components';
import profile_default from './profile_sample.jpg'; //REDUX 적용후 해체 예정
import {myDataLoading,userDataLoading, receiveProjectMypage, loadWorker} from '../../../_actions/user_action';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from "react-router-dom";

const setMyProfileData = (setMyData,dispatch,isMydataLoading) => {
    if(isMydataLoading) {
        dispatch(receiveProjectMypage()).then(res=> {
          if(res.payload.success) {
            setMyData({profile:res.payload.profile,project_list:res.payload.project_list});
            dispatch(myDataLoading(false));
            console.log("dispatch(MydataLoad가 실행됨)");
          }
        });
      }
}

const setUserProfileData = (setUserData,dispatch,props) => {
    if(props.userData !== null) {
        const body = {
            id: props.userData.id
        }
        dispatch(loadWorker(body)).then(res => {
            if(res.payload.success){
                console.log(res.payload.array);
                setUserData(res.payload.array);
            }
        })
    }
}

const LoadProfile = (props) => {
    const state = useSelector(state => state.user);
    const {profile, project_list} = state;
    const [myData, setMyData] = React.useState({profile, project_list});
    const [userData, setUserData] = React.useState([]);
    const dispatch = useDispatch();

    const isMydataLoading = useSelector(state => state.user.isMydataLoading);
    

    
    

    React.useEffect(()=>{
        if(isMydataLoading) {
            setMyProfileData(setMyData,dispatch,isMydataLoading);
            //setUserProfileData(setMyData,dispatch.props);
        }
    },[]);
    
    

    if(props.profile === "MyProfile") {
        if(myData.profile.ProfileName == ``) {
            return(
                <Profile type="myProfile" color="rgb(230,247,230)">
                    <div className = "ProfileName">Loading</div>
                </Profile>
            );
        }else {
            return(
                <Profile type="myProfile" color="rgb(230,247,230)">
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



    if(props.profile === "WorkerProfile") {
        if(userData === null) {
            return null;
        }
        //  else if(userData === Load) {

            

            
        // } 
        else {
            return(
                <div>ii</div>
                // userData.map((val,idx) => (
                //     <Profile key={idx} type="userProfile" >
                //         <div className = "ProfileImg">
                //         <img className ="ProfileimgSource" src={userData[idx].ProfileImage} />
                //         </div>
                //         <div className = "ProfileName">{userData[idx].ProfileName}</div>
                //         <div className = "ProfileScore">{userData[idx].Score}</div>
                //         <div className = "ProfileMessage">{userData[idx].ProfileMessage}</div>
                //     </Profile>
                // ))
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

export default withRouter(LoadProfile);