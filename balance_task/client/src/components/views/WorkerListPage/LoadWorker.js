import styled,{keyframes} from 'styled-components';
import profile_default from './profile_sample.jpg'; //REDUX 적용후 해체 예정

const MyProfile = {                                         //REDUX 적용후 해체 예정
    ProfileName: "홍길동",                                  
    ProfileImage: profile_default,                          //REDUX 적용후 해체 예정
    FinishedPJ: 3,                                          //REDUX 적용후 해체 예정
    ContinuingPJ: 1,                                        //REDUX 적용후 해체 예정
    Score: 78,                                              //REDUX 적용후 해체 예정
    ProfileMessage: `프론트엔드 백엔드 둘다 하는 유니콘입니다.`,
  }                                                         //REDUX 적용후 해체 예정
const TEMP_INDEX = 0;   //임시
const WorkerProfile = [{
        ProfileName: "김지원",                               //REDUX 적용후 해체 예정
        ProfileImage: profile_default,
        Score: 89,
        ProfileMessage: `맞겨만 주세요`                      //REDUX 적용후 해체 예정
    }, {
        ProfileName: "김디비",
        ProfileImage: profile_default,
        Score: 100,                                         //REDUX 적용후 해체 예정
        ProfileMessage: `데이터베이스 잘다룹니다 관계설정 잘함`  
    },{
        ProfileName: "정다혜",                               //REDUX 적용후 해체 예정
        ProfileImage: profile_default,
        Score: 77,
        ProfileMessage: ``  
    },{                                                      //REDUX 적용후 해체 예정
        ProfileName: "존문가",
        ProfileImage: profile_default,
        Score: 31,
        ProfileMessage: `잠수잘타고 버스잘타요`                //REDUX 적용후 해체 예정
    }
];

const LoadWorker = (props) => {
    if(props.type === "MyProfile") {
        return(
            <Profile type="myProfile" color="rgb(230,247,230)">
                <div className = "ProfileImg">
                    <img className ="ProfileimgSource" src={MyProfile.ProfileImage} />
                </div>
                <div className = "ProfileName">{MyProfile.ProfileName}</div>
                <div className = "ProfileScore">{MyProfile.Score}</div>
                <div className = "ProfileMessage">{MyProfile.ProfileMessage}</div>
            </Profile>
        );
    }
    else if(props.type === "WorkerProfile") {
        if(TEMP_INDEX < 1) {
            return(<div>
                <NoWorker>
                    <div className="NoWorkerIcon">
                        <i class="fas fa-users-slash"></i>    
                    </div>
                    <div className="NoWorkerMessage">아직 추가된 워커가 없습니다!</div>
                </NoWorker>
                
            </div>);
        } else if(TEMP_INDEX >= 1){
            return(
                <div>{
                    WorkerProfile.map((list,index) => {
                            console.log(list);
                            return(
                                <Profile index={index} color="">
                                    <div className = "ProfileImg">
                                        <img className ="ProfileimgSource" src={list.ProfileImage} />
                                    </div>
                                    <div className = "ProfileName">{list.ProfileName}</div>
                                    <div className = "ProfileScore">{list.Score}</div>
                                    {(list.ProfileMessage == "") ? <div></div>: 
                                        <div className = "ProfileMessage">{list.ProfileMessage}</div>
                                    }
                                    
                                </Profile>
                            );
                    })
                }
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

export default LoadWorker;