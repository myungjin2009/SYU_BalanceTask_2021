import React, { useEffect } from 'react'
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import styled from 'styled-components';
import InfoBlock from './InfoBlock';
function NoticePage(props) {
  const user = useSelector(state => state.user);
  const {aramsdata} = user;
  console.log(aramsdata);
  if(aramsdata===undefined || aramsdata === null){
    props.history.push('/my_page');
    return <>
    
    </>;
  }
  return (
    <Container>
      <Header title="알림"/>
      <Main>
        {
          aramsdata.map((data, index) => <InfoBlock key={index} sender={data.senduser} content={`${data.senduser}님이 ${data.groupname}에 들어오고 싶어합니다. 허락하시겠습니까?`} time={data.sendtime}/>)
        }
      </Main>
    </Container>
  )
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow:auto;
`;

const Main = styled.div`
  margin-top: 65px;
`;
export default withRouter(NoticePage);
