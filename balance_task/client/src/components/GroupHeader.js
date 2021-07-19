import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const getUsers = () =>{
  const users_data = [
    {
      user_name: '장다혜',
      group_name: '두유 개발자',
    },
    {
      user_name: '박건형',
      group_name: '두유 개발자',
    },
    {
      user_name: '김명진',
      group_name: '두유 개발자',
    },
  ];
  return users_data;
}

const handleTimeline = (setIsTimeline, notice, e)=>{
  if(e.target.className== 'far fa-clock'){
    return;
  }
  setIsTimeline(true);
  e.target.className = 'blueBtn';
  notice.current.className = 'grayBtn';
}
const handleNotice = (setIsTimeline, timeline, e) =>{
  if(e.target.className== 'fas fa-exclamation-triangle'){
    return;
  }
  setIsTimeline(false);
  e.target.className = 'blueBtn';
  timeline.current.className = 'grayBtn';
}
const handleMenu = (isMenu, setIsMenu) =>{
  if(isMenu == true){
    setIsMenu(false);
  }else{
    setIsMenu(true);
  }
}

const GroupHeader = ({isTimeline, setIsTimeline}) =>{
  const timeline = useRef(null);
  const notice = useRef(null);
  const slideMenu = useRef(null);
  const [isMenu, setIsMenu] = useState(false);

  useEffect(() => {
    if(timeline==null ||notice==null || slideMenu == null){
      return;
    }
    if(isMenu == true){
      slideMenu.current.style.display = "none";
    }else{
      slideMenu.current.style.display = "block";
    }

    // if(isTimeline == true){

    // }else{

    // }
    timeline.current.addEventListener('click', (e)=>{
      handleTimeline(setIsTimeline ,notice, e);
      console.log(isTimeline);
    });
    notice.current.addEventListener('click', (e)=>{
      handleNotice(setIsTimeline, timeline, e);
      console.log(isTimeline);

    });
    
    return () => {
      timeline.current.removeEventListener('click', (e)=>{
        handleTimeline(setIsTimeline ,notice, e);
      });
      notice.current.removeEventListener('click', (e)=>{
        handleNotice(setIsTimeline, timeline, e);
      });
      // menuBtn.current.removeEventListener('click', () =>{
      //   handleMenu(isMenu, setIsMenu, slideMenu);
      // });
    }
  }, [isTimeline, isMenu]);

  const users_data = getUsers();
  const group_name = users_data[0].group_name;
  // menuBtn.current.addEventListener('click', () =>{
  //   handleMenu(isMenu, setIsMenu);
  // });
  return(
    <Container>
      <SlideMenuContainer ref={slideMenu}>
        <SlideMenu>
          <li><Link>채팅방</Link></li>
          <li><Link>워커 캘린더</Link></li>
          <li><Link>워커 초대</Link></li>
          <li><Link>프로젝트 종료</Link></li>
        </SlideMenu>
      </SlideMenuContainer>
      <Header>
        <div className="menu" onClick = {()=>handleMenu(isMenu, setIsMenu)}><i className="fas fa-bars"></i></div>
        <p>{group_name}</p>
        <div className="search"><i className="fas fa-search"></i></div>
      </Header>
      <Content>
        <div ref={timeline} className="blueBtn"><i className="far fa-clock"></i>타임라인</div>
        <div ref={notice} className="grayBtn"><i className="fas fa-exclamation-triangle"></i>공지사항</div>
      </Content>
      <div className="ToggleButton"><i className="fas fa-plus"></i></div>
    </Container>
  )
}



const Container = styled.div`
  border: none;
  width: 100vw;
  height: 15vh;
  text-align:center;
  position: fixed;
  top:0;
  &>.ToggleButton{
    position: fixed;
    bottom: 5vh;
    right: 5vw;
    background: #aaa;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    line-height: 50px;
    opacity: 0.5;
  }
`;
const SlideMenuContainer = styled.div`
  display:none;
  width: 100%;
  height: 15vh;
  position: fixed;
  top:0;
  background: #76D8F3;
  z-index: 1;
  border-bottom: 1px solid #2DCCF8;
  transition: transform .3s;
`;
const SlideMenu = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 9vh;
  height: 5vh;
  font-size: 1rem;
  line-height: 5vh;
  &>li>a{
    color:white;
  }
`
const Header = styled.header`
  background: #76D8F3;
  width:100%;
  height: 60%;
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
    box-shadow: 1px 1px 1px;
    z-index:2;
    &>i{
      font-size: 30px;
    }
    &:active{
      box-shadow: -1px -1px 1px;
    }
    &:active ~ .SlideMenuContainer{
      background: black;
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
  height: 40%;
  &>div{
    display:block;
    width: 50%;
    height: 100%;
    padding: 10px;
    font-size: 2vh;
  }
  &>.blueBtn{
    background:#CDF0FF;
    border: 1px solid #CDF0FF;
    border-bottom: 1px solid #2DCCF8;
    color: #2DCCF8;
  }
  &>.grayBtn{
    background:#E5E5E5;
    border: 1px solid #E5E5E5;
    border-bottom: 1px solid #7D7D7D;
    color: #7D7D7D;
  }
`
export default GroupHeader