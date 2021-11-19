import React, { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import styled from 'styled-components';

import calculateDate from "../common/DateCalculator";
import Header from "../Header/Header";
import ChatBlock from "./ChatBlock";
// import chooseLoadingGroup from "../../../_actions/group_action";


const GroupChat = (props) => {
  const socket = io.connect("http://localhost:80");
  const {match:{params:{group}}} = props;
  console.log(group);
  // const dispatch = useDispatch();
  const user = useSelector(state => state.user.userData);
  // const isLoading = useSelector(state => state.group.isLoading.group_chat);
  const [chatArr, setChatArr] = useState([]);
  const [chat, setChat] = useState('');
  console.log(chatArr);
  useEffect(()=>{
    if(!user){
      return;
    }
    //auth가 제대로 작동했을 때
    console.log(user);
    
      
    socket.emit("join", {name: user.name, id: user.id, group});
    return () => {
      socket.close();
    };
  },[user]);

  useEffect(() => {
    socket.on("receive message", (message) => {
      setChatArr((chatArr) => chatArr.concat(message));
    }); //receive message이벤트에 대한 콜백을 등록해줌

    socket.on('roomData', ({ users }) => {
      // setUsers(users)
    })
  },[user]);

  const buttonHandler = useCallback(() => {
    console.log(user.name, chat, user.id);
    socket.emit("send message", { name: user.name, message: chat, date: calculateDate('', true), id: user.id, group }); 
    //버튼을 클릭했을 때 send message이벤트 발생
  }, [chat]);
  const changeMessage = useCallback(
    (e) => {
      setChat(e.target.value);
    },
    [chat]
  );
  // const chat_list = [
  //   {
  //     id: 1,
  //     user_name: '백정훈',
  //     user_id: 'bjh9807@naver.com',
  //     message: `안녕하세요 백정훈입니다.`,
  //     profile_image: '이미지',
  //     date: '2021.10.11'
  //   },
  // ];
  return (
    <Container>
      <Header title={group}/>
      {chatArr.length !==0 &&  chatArr.map((chat, index)=>(
        <ChatBlock key={index} userData={user} chat_data={chat}/>
      ))}
      <div style={{width: "100%", height: "300px", position: "fixed", bottom:"0"}}>
        <input placeholder="내용" onChange={changeMessage}></input>
        <button onClick={buttonHandler}>등록</button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
`

export default withRouter(GroupChat);