import React from "react";
import { withRouter } from "react-router";
import styled from 'styled-components';
import Header from "../Header/Header";
import ChatBlock from "./ChatBlock";
const GroupChat = (props) => {
  const {match:{params:{group}}} = props;
  const chat_list = [
    {
      id: 1,
      user_name: '백정훈',
      user_id: 'bjh9807@naver.com',
      message: `안녕하세요 백정훈입니다.`,
      profile_image: '이미지',
      date: '2021.10.11'
    },
    {
      id: 2,
      user_name: '박건형',
      user_id: 'one0374@naver.com',
      message: `안녕하세요 박건형입니다.`,
      profile_image: '이미지',
      date: '2021.10.11'
    },
    {
      id: 3,
      user_name: '김명진',
      user_id: 'myungjin@naver.com',
      message: `안녕하세요 김명진입니다.`,
      profile_image: '이미지',
      date: '2021.10.11'
    },
    {
      id: 4,
      user_name: '바바',
      user_id: 'ㅂㅂ@naver.com',
      message: `안녕하세요 바바입니다.`,
      profile_image: '이미지',
      date: '2021.10.11'
    },
    {
      id: 5,
      user_name: '오란씨',
      user_id: '오란@naver.com',
      message: `안녕하세요 오란씨입니다.`,
      profile_image: '이미지',
      date: '2021.10.11'
    }
  ];
  return (
    <Container>
      <Header title={group}/>
      {chat_list.length !==0 &&  chat_list.map((chat, index)=>(
        <ChatBlock key={index} userData={props.userData} chat_data={chat}/>
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
`

export default withRouter(GroupChat);