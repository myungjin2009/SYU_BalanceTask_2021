import Navigation from '../Navigation/Navigation'
import styled, {keyframes} from 'styled-components';
import LoadWorker from './LoadWorker';
import React from 'react';

const Total_WorkerList = 0;

const WorkerList = () => {
  const SearchBox = React.useRef(null);
  const SearchIcon = React.useRef(null);
  const [isShow, setIsShow] = React.useState(false);

  React.useEffect(() => {
  
  });
  return (
    <Container>
      <Header>
        나의 워커 목록 <span className="WorkerCount">{Total_WorkerList}</span>

        <input type="text" className="SearchBox" ref={SearchBox} placeholder="   검색"></input>

        <span className="SearchIcon" ref={SearchIcon} onClick={() => {
          if (!isShow) {
            SearchBox.current.style.display = "inline";
            SearchIcon.current.style.color = "white";
//            SearchIcon.current.style.animatiom = SearchBox_Slide + "0.5s forwards";
            SearchBox.current.focus();
            setIsShow(true);
          }
          else {
            SearchBox.current.style.display = "none";
            SearchIcon.current.style.color = "black";
            setIsShow(false);
          }
        }} >
          <i class="fas fa-search" />
        </span>

      </Header>

      <List>
        <div className="brBar">내 프로필</div>
        <LoadWorker type="MyProfile"></LoadWorker>
        <div className="brBar">워커 프로필</div>
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
    display: none;
    position: absolute;
    left: 3vw;
    top: 2vh;
    width: 80%;
    height: 6vh;
    border: none;
    border-radius: 15px;
    font-size: 2.5vh;
    animation: ${SearchBox_Slide} 0.4s ease-in-out forwards;
    }
  & > .SearchIcon {
    color: black;
    margin-right: 3vw;
    font-size: 3vh;
    float: right;
  }
  aaa
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
