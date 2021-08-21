import React from 'react';
import styled from 'styled-components';
import hanium_logo from '../../../images/hanium_logo.jpg';

const ProjectList = {               //참여한 프로젝트 목록. REDUX 적용 예정
    id: 1,
    project_Name: "한이음 IcTT",
    project_Host: "주식회사한이음",
    logo_src: "",
    project_DeadLine: 20210920,
    favoriteList: false,
    Contribution: 65,
    Finished: false
  }

const Project = () => {
    return(
        <Container>
            <div className="IMG_Container">
                <img className ="project_logo" src={hanium_logo} />
            </div>

            <div className="Project_Detail">
                <div className="ProjectName">{ProjectList.project_Name}</div>
                <div className="ProjectHost">{ProjectList.project_Host}</div>
                <div className="Contribution_Container">
                    <div className="Contribution" />
                </div>
            </div>

        </Container>
    );
}

const Container = styled.div`
    height: 12vh;
    background-color: ${() => (ProjectList.Finished ? 'rgb(114,189,245)' : 'rgb(214,214,214)')};
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
            background-color: ${({}) => (ProjectList.Finished ? 'rgb(182,231,252)' : 'rgb(255,251,172)')};
            width: 85%;
            height: 27%;
            margin-top: 0.5vh;
            & > .Contribution {
                width: ${({}) => ProjectList.Contribution}%;
                height: 100%;
                background-color: ${({}) => (ProjectList.Finished ? 'rgb(11,163,227)' : 'rgb(240,218,0)')};
            }
        }
    }
`;

export default Project;