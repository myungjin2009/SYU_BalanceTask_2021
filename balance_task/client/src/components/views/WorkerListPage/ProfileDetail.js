import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { deleteWorker } from '../../../_actions/user_action';
const ProfileDetail = (props) => {
    const {data:{id}, userData} = props;
    const dispatch = useDispatch();
    const statusWindow = React.useRef();
    const closeWindow = () => {
        statusWindow.current.style.display = "none";
        props.setWindow(false);
        props.setClicked(0);
    }

    const deleteWorkerHandler = () => {
        const body = {
            friend_id: id, my_id: userData.id
        }
        dispatch(deleteWorker(body)).then(res => {
            if(res.payload.success){
                alert('워커 삭제 성공!');
            }
        });
    }
    //console.log(props.windowStatus);
    React.useEffect(()=>{
        if(statusWindow.current===null || statusWindow.current===undefined){
            return;
        }
        if(props.windowStatus == true) {
            statusWindow.current.style.display = "block";
        }
    },[]);
    return(
        <Profile_Detail ref={statusWindow}>
                    <div className="background"></div>
                    <div className="profile_real_background">
                        <div className="profile_fake_background"></div>
                        <div className="profile_image">
                            <img className ="profile_image_source" alt="Image" src={props.data.ProfileImage} />
                        </div>
                        <div className="close_button">
                            <i className="fas fa-times" onClick={()=>closeWindow()}></i>
                        </div>
                        <div className="profile_name">{props.data.ProfileName}</div>
                        <div className="profile_message">{props.data.ProfileMessage}</div>
                        <div className="profile_button">
                            <button onClick={deleteWorkerHandler}>워커 삭제</button>
                        </div>
                    </div>
        </Profile_Detail>
    );
}

const Profile_Detail = styled.div`
  display:none;
  & > .background {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background-color: rgba(0,0,0,0.4);
    transition: 1s;
  }
  & > .profile_real_background {
    position: fixed;
    width: 100%;
    height: 45%;
    bottom: 0vh;
    & > .profile_fake_background {
        position: fixed;
        width: 100%;
        height: 35%;
        bottom: 0vh;
        border-radius: 20px 20px 0px 0px;
        background-color: rgb(170,228,169);
    }
    & > .profile_image{
        position: fixed;
        text-align: center;
        width: 100vw;
        height: 20vh;
        & > .profile_image_source{
            display: inline-block;
            width: 20vh;
            height: 20vh; 
            border: solid 2px black;
            border-radius: 50%;
            background-color: rgb(214,242,213);
        }
    }
    & > .close_button {
        font-size: 25px;
        text-align: right;
        padding-right: 3vw;
        transform:translate(0, 10vh);
    }
    & > .profile_name {
        font-size: 25px;
        text-align: center;
        transform:translate(0, 17vh);
    }
    & > .profile_message {
        font-size: 18px;
        text-align: center;
        transform:translate(0, 18vh);
    }
    & > .profile_button{
        font-size: 18px;
        text-align: center;
        transform:translate(0, 20vh);
        &>button{
            padding: 10px;
            background: red;
            color: white;
            border-radius: 10px;
            border: none;
            &:active{
                color: black;
                background: white;
            }
        }
    }
  }
  
  
`;

export default ProfileDetail;