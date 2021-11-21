import React, { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';
import calculateDate from "../common/DateCalculator";
import Header from "../Header/Header";
import ChatBlock from "./ChatBlock";
// import chooseLoadingGroup from "../../../_actions/group_action";


const GroupChat = (props) => {
  const socket = io.connect("http://localhost:80");
  const {match:{params:{group}}} = props;

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
    socket.on('roomData', (chatData) =>{
      setChatArr(chatData);
    });
    return () => {
      socket.close();
    };
  },[user]);

  useEffect(() => {
    socket.on("receive message", (message) => {
      setChatArr((chatArr) => chatArr.concat(message));
    }); //receive message이벤트에 대한 콜백을 등록해줌
    
  },[user]);

  const buttonHandler = useCallback(() => {
    if(chat===''){
      return;
    }
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
      <InputBox>
        <input placeholder="내용" onChange={changeMessage}></input>
        <button onClick={buttonHandler}><SendIcon/></button>
      </InputBox>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100%;
  text-align: center;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0px;
  margin-bottom: 4%;
  &>input{
    width: 80%;
    height: 50px;
    padding: 10px;
    font-size: 15px;
    border-radius: 5px;
    border: 1px solid #aaa;
    outline-color: #CDF0FF;

  }
  &>button{
    width: 20%;
    font-size: 15px;
    background: white;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #aaa;
    height: 50px;
    &:active{
      background: #eee;
    }
  }

`;

export default withRouter(GroupChat);