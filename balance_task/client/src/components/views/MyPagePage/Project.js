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
            <IMG_Container image={hanium_logo}>
                <div className="project_logo"></div>
            </IMG_Container>
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

& > .ProjectName{
    border: 1px solid black;
    font-size: 2.4vh;
    
    width: 30%;
    float: left;
}
`;
const IMG_Container = styled.div`
    width: 30%;
    height: 100%;
    border: 1px solid black;
    float: left;
    
    &>.project_logo {
        width: 12vh;
        height: 12vh;
        background-image: url(${({image})=>image});
        background-position: center;
        background-size: cover;
        border-radius: 6vh;
        margin: 0 auto;
    }

`;

export default Project;