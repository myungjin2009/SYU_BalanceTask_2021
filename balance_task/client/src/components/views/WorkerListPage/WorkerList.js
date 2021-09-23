import Navigation from '../Navigation/Navigation'
import styled, {keyframes} from 'styled-components';
import LoadProfile from './LoadProfile';
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

        <input type="text" className="SearchBox" /*active={isShow}*/ ref={SearchBox} placeholder="검색"></input>
      
        <span className="SearchIcon" ref={SearchIcon} onClick={() => {
          if (isShow === 1) {
            SearchIcon.current.style.color = "black";
            SearchBox.current.style.top = "-6vh";
            setIsShow(0);
          }
          else {
            SearchIcon.current.style.color = "white";
            SearchBox.current.style.top = "2vh";
            SearchBox.current.focus();
            setIsShow(1);
          }
        }} >
          <i className="fas fa-search" />
        </span>

      </Header>

      <List>
        <div className="brBar">내 프로필</div>
        <LoadProfile profile="MyProfile"></LoadProfile>
        <div className="brBar">워커 프로필</div>
        {/* <LoadWorker type="WorkerProfile"></LoadWorker> */}
      </List>

      <Navigation/>
    </Container>
  )
}

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
    outline: none;
    font-size: 2.5vh;
    padding-left: 2vh;
    transition: top 0.3s ease-in-out;
  }
  & > .SearchIcon {
    color: black;
    margin-right: 3vw;
    font-size: 3vh;
    float: right;
  }
`;

const List = styled.div`
  height: 82vh;
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
