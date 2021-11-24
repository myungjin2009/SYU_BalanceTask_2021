import React from 'react';
import styled from 'styled-components';
//import profile_default from './profile_sample.jpg'; //REDUX 적용후 해체 예정
import {dataLoad, receiveProjectMypage, loadWorker} from '../../../_actions/user_action';
import {workNumLoading} from '../../../_actions/group_action';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from "react-router-dom";

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

    const setWhoClicked = (data) => {     //프로필 목록에서 클릭했을 때, 프로필 상세보기 데이터를 부모 컴포넌트로
        props.whoClicked(data);
        props.setWindow(true);
    }

    React.useEffect(()=>{
        if(state.isDataLoading) {
            if(props.userData != null){
                setMyProfileData(setMyData,dispatch);
                setUserProfileData(setUserData,dispatch,props);
                dispatch(dataLoad(false));
            }
        }
        dispatch(workNumLoading(userData.length));  //나의 Worker친구 몇명인지 보내주는 dispatch
    },[props.userData, userData]);

    React.useEffect(() => {
        setUserData(worker_list);
    },[worker_list]);

    if(props.profile === "MyProfile") {
        if(myData.profile.ProfileName == ``) {
            return(
                // <Profile type="myProfile" color="rgb(230,247,230)">
                <Profile type="myProfile" type="myProfile">
                    <div className = "ProfileName">불러오는 중..</div>
                </Profile>
            );
        }else {
            return(
                // <Profile type="myProfile" color="rgb(230,247,230)">
                <Profile type="myProfile">
                <div className = "ProfileImg">
                <img className ="ProfileimgSource" src={myData.profile.ProfileImage} />
                </div>
                <div className = "ProfileName">{myData.profile.ProfileName}</div>
                <div className = "ProfileScore">{myData.profile.Score}</div>
                {(myData.profile.ProfileMessage == "undefined") ? null :                 
                <div className = "ProfileMessage">{myData.profile.ProfileMessage}</div>}
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
                            <i className="fas fa-users-slash"></i>    
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
                    <Profile key={idx} type="userProfile" onClick={() => setWhoClicked(val)}>
                        <div className = "ProfileImg">
                            <img className ="ProfileimgSource" src={val.ProfileImage} />
                        </div>
                        <div className = "ProfileName">{val.ProfileName}</div>
                        <div className = "ProfileScore">{val.Score}</div>
                        {(val.ProfileMessage == "undefined") ? null :                 
                        <div className = "ProfileMessage">{val.ProfileMessage}</div>}
                    </Profile>
                ))}
                </div>
            );
        }
    }
}

const Profile = styled.div`
    height: 9vh;
    border-bottom:${props => ((props.type == "myProfile") ? "none" : "2px solid rgb(200,200,200)")};
    margin: 0 2vw;
    background-color: ${props => props.color};
    & > .ProfileImg {
        width: 15%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        float: left;
        & > .ProfileimgSource {
            border: 1.5px solid black;
            overflow: hidden;
            width: 5.5vh;
            height: 5.5vh;
            border-radius: 50%;
        }
    }
    & > .ProfileName {
        width: 25%;
        height: 100%;
        padding: 2.6vh 0 2.5vh 0;
        float: left;
        font-size: 2vh;
    }
    & > .ProfileMessage {
        border-radius: 13px;
        transform: translate(-8%, 35%);         //메시지박스 가운데 정렬하기 위한 코드
        padding: 4px 8px 4px 8px;
        background-color: rgb(170,231,253);
        width: 38%;
        height: 60%;
        float: right;
        font-size: 1.65vh;
        overflow:hidden;
    }
    & > .ProfileScore {
        border-radius: 13px;
        transform: translate(-8%, 35%);         //메시지박스 가운데 정렬하기 위한 코드
        text-align: center;
        line-height: 5vh;
        background-color: rgb(153,204,153);
        width: 10%;
        height: 60%;
        float: right;
        font-size: 2.0vh;
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