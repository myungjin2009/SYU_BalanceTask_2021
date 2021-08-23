import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';



const Project = (props) => {
    const {ProjectList} = props;
    
    return(
        <Container ProjectList={ProjectList} onClick={() =>props.history.push(`/${ProjectList.group}/project_timeline`)}>
            <div className="IMG_Container">
                <img className ="project_logo" src={ProjectList.logo} />
            </div>

            <div className="Project_Detail">
                <div className="ProjectName">{ProjectList.group}</div>
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
                width: ${({ProjectList}) => ProjectList.Contribution}%;
                height: 100%;
                background-color: ${({ProjectList}) => (ProjectList.Finished ? 'rgb(11,163,227)' : 'rgb(240,218,0)')};
            }
        }
    }
`;

export default withRouter(Project);