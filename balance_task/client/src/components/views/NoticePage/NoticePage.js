import React from 'react'
import { withRouter } from 'react-router';
import Header from '../Header/Header';
import styled from 'styled-components';
function NoticePage(props) {
  console.log(props);
  return (
    <Container>
      <Header title="알림"/>
      <Main>
        
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
  margin-top: 100px;

`;
export default withRouter(NoticePage);
