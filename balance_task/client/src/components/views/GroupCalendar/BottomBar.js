import React from 'react'
import styled from 'styled-components';

function BottomBar({dayData, setIsWeekends}) {
  return (
    <Container>
      <h2>한 눈에 할 일 보기</h2>
      <div>{dayData.map((el, i)=>{
        return <div key={i}>{el.title}</div>
      })}</div>
    </Container>
  )
}

const Container = styled.div`
  text-align: center;
`;

export default BottomBar
