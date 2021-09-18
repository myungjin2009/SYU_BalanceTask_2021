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
          aramsdata.map((data, index) => <InfoBlock key={index} aramsdata={data}/>)
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
