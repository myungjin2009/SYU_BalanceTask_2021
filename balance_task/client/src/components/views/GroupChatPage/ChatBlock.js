import React from "react";
// import { withRouter } from "react-router";

function ChatBlock({ userData, chat_data }) {
  const { id, user_name, user_id, message } = chat_data;
  console.log(user_name);
  if(userData!==null){
    if(userData.id===user_id){
      return (
        <div style={{ textAlign: "right", margin: '100px 0'}}>
          <div>{user_name}</div>
          <div>{message}</div>
        </div>
      );
    }
    return (
      <div style={{ textAlign: "left" , margin: '100px 0'}}>
        <div>{user_name}</div>
        <div>{message}</div>
      </div>
    );
  }else{
    return(<React.Fragment></React.Fragment>)
  }
  

  
}

export default ChatBlock;
