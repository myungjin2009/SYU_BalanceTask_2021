import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { chooseLoadingGroup, resetPosts } from "../../../_actions/group_action";

const calculatePersentage = (type, startDate, deadineDate) =>{
    const today = new Date();
    const start_date = new Date(startDate);
    const deadine = new Date(deadineDate);

    if(type == "original") {
        const entire_time_data = deadine.getTime() - start_date.getTime();
        const today_time_data = new Date().getTime() - start_date.getTime();
        const data_until_today = today_time_data < 0 ? 0 : today_time_data;
        const group_persentage = ((data_until_today / entire_time_data)*100) < 0 ? 100 : ((data_until_today / entire_time_data)*100);
        return group_persentage;
    }
    else if(type == "remain"){
        const remain_date_data = (deadine - today) / 86400000;
        const remain_time_data = (remain_date_data < 1) ? remain_date_data * 24 : 24;
        if(remain_date_data > 1) {
            const print_date = remain_date_data.toFixed(0) + "일";
            return print_date;
        } else {
            const print_time = remain_time_data.toFixed(0) + "시간";
            return print_time;
        }
    }
}

const Project = (props) => {
    const {ProjectList} = props;
    // console.log(ProjectList);
    const dispatch = useDispatch();
    const start_date = ProjectList.project_StartLine;
    const deadine = ProjectList.project_DeadLine;
    let remain;
    if(start_date != undefined) {
        if(deadine != undefined) {
            remain = calculatePersentage("remain", start_date, deadine);
        }
    }
    return(
        <Container ProjectList={ProjectList} group_persentage={calculatePersentage("original", start_date, deadine)} onClick={() =>{
            dispatch(resetPosts());
            dispatch(chooseLoadingGroup({timeline: true, notice: true}));
            props.history.push(`/${ProjectList.group}/project_timeline`);}}>

            <div className="IMG_Container">
                <img className ="project_logo" src={ProjectList.logo} />
            </div>

            <div className="Project_Detail">
                <div className="Header">
                    <div className="ProjectName">{ProjectList.group}</div>
                    <div className="ProjectHost">{ProjectList.project_Hostt}</div>
                </div>
                <div className="Contribution_Container">
                    <div className="Contribution"></div>
                    <div className="remain_Text">{remain} 남음</div>
                </div>
            </div>

        </Container>
    );
}

const Container = styled.div`
    height: 12vh;
    // background-color: ${({ProjectList}) => (ProjectList.Finished ? 'rgb(114,189,245)' : 'rgb(214,214,214)')};
    border-bottom: 2px solid rgb(210,210,210);
    margin : 0 6px 0 6px;
    min-width: 325px;

    & > .IMG_Container {
        width: 25%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        float: left;
        & > .project_logo{
            align-items: center;
            width: 7.5vh;
            height: 7.5vh;
            border-radius: 50%;
            border: 1px solid #3788d8;
            overflow: hidden;
        }
    }

    & > .Project_Detail {
        width: 68%;
        height: 100%;
        float: left;
        & > .Header {
            margin-top: 1.9vh;
            display: flex;
            font-size: 1.8vh;
            & > .ProjectName{
                width: 50%;
            }
            & > .ProjectHost {
                text-align: right;
                width: 50%;
            }
        }
        & > .Contribution_Container {
            background-color: ${({ProjectList}) => (ProjectList.Finished ? 'rgb(182,231,252)' : 'rgb(255,251,172)')};
            height: 23%;
            margin-top: 0.5vh;
            border-radius: 6vh;
            overflow: hidden;
            & > .Contribution {
                width: ${({group_persentage}) => group_persentage <=100 && group_persentage>=0 ? group_persentage : 100}%;
                height: 100%;
                background-color: ${({ProjectList}) => (ProjectList.Finished ? 'rgb(11,163,227)' : 'rgb(240,218,0)')};
            }
            & > .remain_Text {
                display: ${({ProjectList}) => (ProjectList.Finished ? 'none' : 'block')};
                height: 100%;
                text-align: center;
                font-size: 1.3vh;
                transform:translate(0, -90%);
            }
        }
    }
`;

export default withRouter(Project);