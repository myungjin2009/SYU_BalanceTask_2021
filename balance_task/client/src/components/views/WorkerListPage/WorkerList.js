import Navigation from '../Navigation/Navigation'
import styled, {keyframes} from 'styled-components';
import LoadWorker from './LoadWorker';
import React from 'react';

const Total_WorkerList = 0;

const WorkerList = () => {
  const SearchBox = React.useRef(null);
  const SearchIcon = React.useRef(null);
  const [isShow, setIsShow] = React.useState(0);
  

  React.useEffect(() => {
    setIsShow(-1);
  },[]);
  
  return (
    <Container>
      <Header>
        나의 워커 목록 <span className="WorkerCount">{Total_WorkerList}</span>

        <input type="text" className="SearchBox" active={isShow} ref={SearchBox} placeholder="   검색"></input>
      
        <span className="SearchIcon" ref={SearchIcon} onClick={() => {
          if (isShow === 1) {
            SearchIcon.current.style.color = "black";
            setIsShow(0);
          }
          else {
            SearchIcon.current.style.color = "white";
            SearchBox.current.focus();
            setIsShow(1);
          }
        }} >
          <i class="fas fa-search" />
        </span>

      </Header>

      <List>
        <div className="brBar">내 프로필</div>
        <LoadWorker type="MyProfile"></LoadWorker>
        <div className="brBar">워커 프로필
        </div>
        <LoadWorker type="WorkerProfile"></LoadWorker>
      </List>

      <Navigation/>
    </Container>
  )
}

const SearchBox_Slide = keyframes`
  0% {
    top: -6vh;
  }
  100% {
    top: 2.0vh;
  }
`;
const SearchBox_Slide2 = keyframes`
  0% {
    top: 2vh;
  }
  100% {
    top: -6vh;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 92vh;
  min-width: 375px;
`;

const Header = styled.div`
  height: 10vh;
  background-color: rgb(135,220,252);
  text-align: center;
  line-height: 10vh;
  font-size: 3.3vh;
  & > .WorkerCount {
    font-weight: bold;
    color: rgb(153,153,153);
  }

  & > .SearchBox {  
    position: absolute;
    left: 3vw;
    top: -6vh;
    width: 80%;
    height: 6vh;
    border: none;
    border-radius: 15px;
    font-size: 2.5vh;
  }
  & > .SearchBox[active="1"] {
    animation-name: ${SearchBox_Slide};
    animation-duration: 0.4s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }
  & > .SearchBox[active="0"] {
    animation-name: ${SearchBox_Slide2};
    animation-duration: 0.4s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }
  & > .SearchIcon {
    color: black;
    margin-right: 3vw;
    font-size: 3vh;
    float: right;
  }
`;

const List = styled.div`
  height: 76vh;
  overflow: auto;

  & > .brBar {
    height: 3.5vh;
    background-color: rgb(170,228,169);
    line-height: 3.5vh;
    padding-left: 2vw;
    font-size: 2vh;
  }
`;

export default WorkerList
