import React from "react";
// import { withRouter } from "react-router";

function ChatBlock({ userData, chat_data }) {
  const { id, name, message, date } = chat_data;
  console.log(userData);
  if(userData!==null){
    console.log(id);
    if(userData.id===id){
      return (
        <div style={{ textAlign: "right", margin: '100px 0'}}>
          <div>{name}</div>
          <div>{message}</div>
          <div>{date}</div>
        </div>
      );
    }
    return (
      <div style={{ textAlign: "left" , margin: '100px 0'}}>
        <div>{name}</div>
        <div>{message}</div>
        <div>{date}</div>
      </div>
    );
  }else{
    return(<React.Fragment></React.Fragment>)
  }
  

  
}

export default ChatBlock;
