import React from "react";
import styled from "styled-components";

// import { withRouter } from "react-router";

function ChatBlock({ userData, chat_data }) {
  const { id, name, message, date } = chat_data;
  const myContentStyle = {
    backgroundData: "#eee",
    colorData: "black"
  };
  const otherContentStyle = {
    background: "#1565c0",
    color: "white"
  };

  if(userData!==null){
    if(userData.id===id){
      return (
        <MyContent>
          <ChatContent {...myContentStyle}>
            <div className="name">{name}</div>
            <div>{message}</div>
            <div className="date">{date}</div>
          </ChatContent>
        </MyContent>
      );
    }
    return (
      <OtherContent>
        <ChatContent {...otherContentStyle}>
          <div className="name">{name}</div>
          <div>{message}</div>
          <div className="date">{date}</div>
        </ChatContent>
      </OtherContent>
    );
  }else{
    return(<React.Fragment></React.Fragment>)
  }
  
}

const MyContent = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: right;
  margin: 40px 0;
`;

const OtherContent = styled.div`
  display: flex;
  text-align: left;
  margin: 40px 0;
`;

const ChatContent = styled.div`
  max-width: 400px;
  border-radius: 15px;
  border: 1px solid black;
  padding: 13px;
  background: ${({backgroundData})=>backgroundData}
  color: ${({colorData})=>colorData}
  &>.name{
    font-size: 13px;
    margin-bottom: 5px; 
  }
  &>.date{
    font-size: 10px;
    margin-top: 10px; 
  }
`;



export default ChatBlock;
