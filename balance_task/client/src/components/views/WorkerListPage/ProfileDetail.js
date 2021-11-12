import React from 'react';
import styled from 'styled-components';

const ProfileDetail = (props) => {

    const OPEN = React.useRef();    
    const showWindow = (data) => {
        props.isDetailShow(data);
    }

    return(
        <Profile_Detail ref={OPEN}>
                    <div className="background"></div>
                    <div className="profile_background">
                        <div className="close_button">
                            <i class="fas fa-times" onClick={()=>showWindow(false)}></i>
                        </div>

                        <div className="profile_image">
                            <img className ="profile_image_source" alt="Image" src={null} />
                        </div>
                        <div className="profile_message">aa</div>
                    </div>
        </Profile_Detail>
    );
}

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

export default ProfileDetail;