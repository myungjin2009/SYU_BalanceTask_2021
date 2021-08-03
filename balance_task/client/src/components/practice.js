import React, { useState } from "react";
import styled from "styled-components";
import Calendar from 'react-calendar';

function Prac() {
  const [value, onChange] = useState(new Date());
  return (
    <div className="Prac">
      <Block>
        {/* <Container><span>나는</span>멋져</Container>
        <Container><span>너도</span>멋져</Container> */}
        <Calendar
        onChange={onChange}
        value={value}
      />
      </Block>


    </div>
  );
}
const Block = styled.div`
  display:flex;
  height:400px;
  justify-content: center;
  border: 1px solid;
  align-items: center;
`;

const Container = styled.div`
  width: 200px;
  height:200px;
  margin: 10px;
  background: lightgray;
  font-size: 50px;
  text-align:center;
  &>span{
    font-weight: 800;
  }
`;

export default Prac;
