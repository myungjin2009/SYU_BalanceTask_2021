import Navigation from '../Navigation/Navigation'
import styled, {keyframes} from 'styled-components';
import LoadProfile from './LoadProfile';
import React from 'react';
import ProfileDetail from './ProfileDetail';
import {useSelector} from 'react-redux';

const SearchBoxUpdate = (search, setSearch, SearchBox) => {
  setSearch(SearchBox.current.value);
}

const WorkerList = (props) => {
  const SearchBox = React.useRef("");
  const SearchIcon = React.useRef(null);
  const [isShow, setIsShow] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const workerNum = useSelector(state=>state.group.workerNum);
  const user = useSelector(state => state.user);
  const [clicked, setClicked] = React.useState(0);      //워커리스트 클릭했을 때 정보 받기
  const whoClicked = (data) => {
    setClicked(data);
    console.log(clicked);
  }

  const [windowStatus,setWindowStatus] = React.useState(false);   //Detail 창 띄우기
  const setWindow = (data) => {
    setWindowStatus(data);
  }
  

  React.useEffect(() => {
    setIsShow(-1);
  },[]);
  
  React.useEffect(()=> {
    setClicked(0);
  },[user.worker_list]);
  return (
    <Container>
      <Header>
        나의 워커 목록 <span className="WorkerCount">{workerNum}</span>
        <input type="text" className="SearchBox" /*active={isShow}*/ ref={SearchBox} placeholder="검색" onChange={() => SearchBoxUpdate(search,setSearch,SearchBox)}></input>
      
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
        <LoadProfile profile="MyProfile" userData={props.userData}></LoadProfile>
        <div className="brBar">워커 프로필</div>
        <LoadProfile profile="WorkerProfile" userData={props.userData} searchValue={search}
         clicked={clicked} whoClicked={whoClicked} setWindow={setWindow}></LoadProfile>
      </List>
      <Navigation/>

      {
        clicked!==0 && <ProfileDetail data={clicked} userData={user.userData} windowStatus={windowStatus} setWindow={setWindow}></ProfileDetail>
      }
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