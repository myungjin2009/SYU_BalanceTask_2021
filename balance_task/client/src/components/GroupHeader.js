import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const getUsers = () =>{
  const users_data = [
    {
      user_name: '장다혜',
      group_name: '헤이즈와 아이들',
    },
    {
      user_name: '박건형',
      group_name: '헤이즈와 아이들',
    },
    {
      user_name: '김명진',
      group_name: '헤이즈와 아이들',
    },
  ];
  return users_data;
}

const GroupHeader = ({isTimeline, setIsTimeline}) =>{
  const timeline = useRef(null);
  const notice = useRef(null);
  useEffect(() => {
    if(timeline==null ||notice==null){
      return;
    }
    const handleTimeline = (e)=>{
      setIsTimeline(true);
      if(e.target.className== 'far fa-clock'){
        return;
      }
      e.target.className = 'blueBtn';
      notice.current.className = 'grayBtn';
    }
    const handleNotice = (e) =>{
      setIsTimeline(false);
      if(e.target.className== 'fas fa-exclamation-triangle'){
        return;
      }
      e.target.className = 'blueBtn';
      timeline.current.className = 'grayBtn';
    }
    timeline.current.addEventListener('click', handleTimeline);
    notice.current.addEventListener('click', handleNotice);
    return () => {
      timeline.current.removeEventListener('click', handleTimeline);
      notice.current.removeEventListener('click', handleNotice);
    }
  }, [isTimeline]);

  const users_data = getUsers();
  const group_name = users_data[0].group_name;
  console.log(isTimeline);
  return(
    <Container>
      <Header>
        <div className="menu"><i className="fas fa-bars"></i></div>
        <p>{group_name}</p>
        <div className="search"><i className="fas fa-search"></i></div>
      </Header>
      <Content>
        <div ref={timeline} className="blueBtn"><i className="far fa-clock"></i>타임라인</div>
        <div ref={notice} className="grayBtn"><i className="fas fa-exclamation-triangle"></i>공지사항</div>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  border: none;
  width: 100vw;
  text-align:center;
`;

const Header = styled.header`
  background: #76D8F3;
  width:100%;
  height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &>.menu{
    width: 40px;
    height: 40px;
    background: lightgray;
    text-align:center;
    line-height: 300%;
    color: gray;
    border-radius: 5px;
    &>i{
      font-size: 30px;
    }
  }
  &>p{
    font-size: 20px;
  }
  &>.search{
    color: #eee;
  }
`;

const Content = styled.div`
  width:100%;
  display: flex;
  &>div{
    display:block;
    width: 50%;
    padding: 10px;
  }
  &>.blueBtn{
    background:#CDF0FF;
    border-bottom: 1px solid #2DCCF8;
    color: #2DCCF8;
  }
  &>.grayBtn{
    background:#E5E5E5;
    border-bottom: 1px solid #7D7D7D;
    color: #7D7D7D;
  }
`
export default GroupHeader