import React from "react";
import styled from "styled-components";

function CreateGroup() {
    return (
      <div>
          <TopMenu>그룹 만들기</TopMenu>
          <br></br>
          <List>회원정보 </List>
          <List> </List>
          <List>앱 </List>
          <List></List>
          <List></List>
  
      </div>
  
    );
  }
  
  const TopMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  
    width: auto;
    height: 5vw;
    min-height: 30px;
    max-height: 60px;
  
    font-size: min(5vw, 30px);
    
    padding: 10px;
    text-align: center;
    
    color: white;
    background-color: rgb(118, 216, 243);
  `;
  
  const List = styled.div`
    display: flex;
    align-items: center;
  
    width: auto;
    font-size:17px;
    height: 50px;
    margin: 0px 15px 0px 15px;
    padding: 0px 0px 0px 20px;
    
  
    border-bottom: 2px solid gray;
  
    color: rgb(62,62,62);
    background-color: white;
    &:hover{
      background-color: rgb(184, 184, 184);
    }
  `;
  
  export default CreateGroup;
  