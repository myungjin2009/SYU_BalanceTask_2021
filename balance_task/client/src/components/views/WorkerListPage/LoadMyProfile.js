import React from 'react';
import styled from 'styled-components';
import profile_default from './profile_sample.jpg'; //REDUX 적용후 해체 예정
import {chooseLoading, receiveProjectMypage, loadWorker} from '../../../_actions/user_action';
import {useSelector, useDispatch} from 'react-redux';


const LoadMyProfile = (props) => {
    //const state = useSelector(state => state.user);   //내 프로필 정보 REDUX에서 불러오기 (최신은 아님)

    const dispatch = useDispatch();
    dispatch(receiveProjectMypage()).then(res=> {
        if(res.payload.success){
            console.log('데이터 받기를 성공했을껄');
            //setData(res.payload.profile);
        }
    })
    //console.log(data);

    return(
        <Profile type="myProfile" color="rgb(230,247,230)">
            {/* <div className = "ProfileImg">
                <img className ="ProfileimgSource" src={ProfileImage} />
            </div>
            <div className = "ProfileName">{ProfileName}</div>
            <div className = "ProfileScore">{Score}</div>
            <div className = "ProfileMessage">{ProfileMessage}</div> */}
            개샛기야
        </Profile>
    );
    

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

export default LoadMyProfile;