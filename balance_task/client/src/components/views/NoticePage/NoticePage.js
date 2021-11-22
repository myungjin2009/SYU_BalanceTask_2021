import React, { useEffect } from 'react'
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import styled from 'styled-components';
import InfoBlock from './InfoBlock';
function NoticePage(props) {
  const user = useSelector(state => state.user);
  const {aramsdata} = user;
  console.log(user);
  
  useEffect(()=>{
    let mounted = true;
    if(mounted && aramsdata===undefined || aramsdata === null){
      setTimeout(() => {
        props.history.goBack();
      }, 100);
    }
    return () =>{
      mounted = false;
    }
  },[aramsdata]);
  return (
    <Container>
      <Header title="알림"/>
      <Main>
        {
          aramsdata ? aramsdata.map((data, index) => <InfoBlock key={index} aramsdata={data}/>) : (
            <div style={{textAlign: "center", fontSize: "20px", marginTop: "300px"}}>아직 올라온 알림이 없습니다.</div>
          )
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
