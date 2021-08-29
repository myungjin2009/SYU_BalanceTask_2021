import Navigation from '../Navigation/Navigation'
import styled from 'styled-components';
import LoadWorker from './LoadWorker';

const Total_WorkerList = 0;

const WorkerList = () => {
  return (
    <Container>
      <Header>
        나의 워커 목록 <span className="WorkerCount">{Total_WorkerList}</span>
      </Header>

      <Search>
        <span className="SearchIcon">
          <i className="SearchIcon" class="fas fa-search"></i>
        </span>    
        <input type="text" className="SearchBox" placeholder="   검색"></input>
        
      </Search>

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
`;

const Search = styled.div`
  height: 6vh;
  background-color: rgb(173,173,173);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  & > .SearchIcon {
    color: white;
    margin-right: 3vw;
    font-size: 3vh;
  }
  & > .SearchBox {
    width: 85%;
    height: 70%;
    border: none;
    border-radius: 10px;
    font-size: 2vh;
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
  }
`;

export default WorkerList
