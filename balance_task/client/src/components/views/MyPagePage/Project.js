import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { chooseLoadingGroup, resetPosts } from "../../../_actions/group_action";

const calculatePersentage = (startDate, deadineDate) =>{
    const start_date = new Date(startDate);
    const deadine = new Date(deadineDate);

    const entire_time_data = deadine.getTime() - start_date.getTime();
    const today_time_data = new Date().getTime() - start_date.getTime();
    const data_until_today = today_time_data < 0 ? 0 : today_time_data;
    const group_persentage = ((data_until_today / entire_time_data)*100) < 0 ? 100 : ((data_until_today / entire_time_data)*100);
    return group_persentage;
}

const Project = (props) => {
    const {ProjectList} = props;
    // console.log(ProjectList);
    const dispatch = useDispatch();
    const start_date = ProjectList.project_StartLine;
    const deadine = ProjectList.project_DeadLine;
    return(
        <Container ProjectList={ProjectList} group_persentage={calculatePersentage(start_date, deadine)} onClick={() =>{
            dispatch(resetPosts());
            dispatch(chooseLoadingGroup({timeline: true, notice: true}));
            props.history.push(`/${ProjectList.group}/project_timeline`);
        }}>
            <div className="IMG_Container">
                <img className ="project_logo" src={ProjectList.logo} />
            </div>

            <div className="Project_Detail">
                <div className="ProjectName">{ProjectList.group}</div>
                <div className="ProjectHost">{ProjectList.project_Host}</div>
                <div className="Contribution_Container">
                    <div className="Contribution"></div>
                </div>
            </div>

        </Container>
    );
}

const Container = styled.div`
    height: 12vh;
    background-color: ${({ProjectList}) => (ProjectList.Finished ? 'rgb(114,189,245)' : 'rgb(214,214,214)')};
    border-bottom: 2px solid gray;
    width:100vw;
    min-width: 325px;

    & > .IMG_Container {
        width: 23%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        float: left;
        
        & > .project_logo{
            align-items: center;
            width: 9vh;
            height: 9vh;
            border-radius: 50%;
            border: 1px solid #3788d8;
            
            overflow: hidden;
        }
    }

    & > .Project_Detail {
        
        display: flex;
        flex-direction: column;
        width: 70%;
        height: 100%;
        float: left;
        & > .ProjectName{
            margin-top: 0.5vh;
            font-size: 2.7vh;
            width: 75%;
        }
        & > .ProjectHost {
            font-size: 1.6vh;
            width: 75%;
        }
        & > .Contribution_Container {
            background-color: ${({ProjectList}) => (ProjectList.Finished ? 'rgb(182,231,252)' : 'rgb(255,251,172)')};
            width: 85%;
            height: 27%;
            margin-top: 0.5vh;
            & > .Contribution {
                width: ${({group_persentage}) => group_persentage <=100 && group_persentage>=0 ? group_persentage : 100}%;
                height: 100%;
                background-color: ${({ProjectList}) => (ProjectList.Finished ? 'rgb(11,163,227)' : 'rgb(240,218,0)')};
            }
        }
    }
`;

export default withRouter(Project);