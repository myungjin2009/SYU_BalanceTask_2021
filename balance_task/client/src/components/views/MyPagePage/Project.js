import React from 'react';
import styled from 'styled-components';
import hanium_logo from '../../../images/hanium_logo.jpg';

const ProjectList = {               //REDUX 적용 예정
    id: 1,
    project_Name: "한이음 IcT",
    project_Host: "주식회사한이음",
    logo_src: "",
    project_DeadLine: 20210920,
    favoriteList: false,
    Contribution: 0.68
}

const Project = () => {
    return(
        <Container>
            <div className="IMG_Container">
                <img className ="project_logo" src={hanium_logo} />
            </div>
            <div className="ProjectName">한이음 ICT</div>

        </Container>
    );
}

const Container = styled.div`
    height: 12vh;
    background-color: rgba(114,189,245);
    border-radius: 20px;
    position: relative;
    width:100vw;

    & > .IMG_Container {
        width: 30%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
        
        & > .project_logo{
            align-items: center;
            width: 10vh;
            height: 10vh;
            border-radius: 50%;
            
            
            overflow: hidden;
        }
    }

    & > .ProjectName{
        border: 1px solid black;
        font-size: 2.4vh;
        display: block;
        width: 30%;
        float:left;
    }
`;

export default Project;