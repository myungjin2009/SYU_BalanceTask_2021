import React from 'react';
import styled from 'styled-components';
import profile_default from './profile_sample.jpg'; //REDUX 적용후 해체 예정
import {chooseLoading, receiveProjectMypage, loadWorker} from '../../../_actions/user_action';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from "react-router-dom";


const LoadProfile = (props) => {
    //const state = useSelector(state => state.user);   //내 프로필 정보 REDUX에서 불러오기 (최신은 아님)
    const [data,setData] = React.useState(null);
    const dispatch = useDispatch();

    const setMyProfileData = () => {
        dispatch(receiveProjectMypage()).then(res=> {
            if(res.payload.success){
                setData(res.payload.profile);
            }
        })
    }

    const setUserProfileData = () => {
        console.log("test");
        if(props.userData !== null) {
            console.log("여기도 아농===");
            const body = {
                id: props.userData.id
            }
            dispatch(loadWorker(body)).then(res => {
                
                    console.log(`payload success 이후=${props.userData.id}`);
                    console.log(res.payload);
                
            })
        }
    }
    

    React.useEffect(()=>{
        setMyProfileData();
        setUserProfileData();
    },[props.userData]);
    
    

    if(props.profile === "MyProfile") {
        if(data === null) {
            return(
                <Profile type="myProfile" color="rgb(230,247,230)">
                    <div className = "ProfileName">Loading</div>
                </Profile>
            );
        }else {
            return(
                <Profile type="myProfile" color="rgb(230,247,230)">
                <div className = "ProfileImg">
                <img className ="ProfileimgSource" src={data.ProfileImage} />
                </div>
                <div className = "ProfileName">{data.ProfileName}</div>
                <div className = "ProfileScore">{data.Score}</div>
                <div className = "ProfileMessage">{data.ProfileMessage}</div>
                </Profile>
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