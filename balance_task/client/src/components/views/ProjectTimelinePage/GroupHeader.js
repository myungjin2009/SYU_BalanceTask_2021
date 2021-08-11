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

const handleTimeline = (setIsTimeline)=>{
  setIsTimeline(true);
}
const handleNotice = (setIsTimeline) =>{
  setIsTimeline(false);
}
const handleMenu = (isMenu, setIsMenu) =>{
  if(isMenu === true){
    setIsMenu(false);
  }else{
    setIsMenu(true);
  }
}

const handleSearch = (isSearch, setIsSearch) => {
  if(isSearch === true){
    setIsSearch(false);
  }else{
    setIsSearch(true);
  }
}

const searchTimeline = (input, setSearch) =>{
  // console.log(input.current.value);
  if(input=== null){
    return;
  }
  const {current:{value}} = input;
  setSearch(value);
}

const GroupHeader = ({isTimeline, setIsTimeline, search, setSearch}) =>{
  const timeline = useRef(null);
  const notice = useRef(null);
  const slideMenu = useRef(null);
  const menuBtn = useRef(null);
  const input_div = useRef(null);
  const input = useRef(null);

  const [isMenu, setIsMenu] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if(timeline===null ||notice===null || slideMenu === null){
      return;
    }
    if(isMenu === false){
      // slideMenu.current.style.display = "none";
      slideMenu.current.style.top = "-15vh";
      menuBtn.current.style.transform = "rotate( 0deg )";
    }else{
      // slideMenu.current.style.display = "block";
      slideMenu.current.style.top = "0";
      menuBtn.current.style.transform = "rotate( 90deg )";
    }

    if(isSearch === false){
      input_div.current.style.display = "none";
      
    }else{
      input_div.current.style.display = "block";
      input_div.current.children[0].focus();
    }

    if(isTimeline === true){
      timeline.current.className = 'blueBtn';
      notice.current.className = 'grayBtn';
    }else{
      notice.current.className = 'blueBtn';
      timeline.current.className = 'grayBtn';
      
    }
  }, [isTimeline, isMenu, isSearch]);

  const users_data = getUsers();
  const group_name = users_data[0].group_name;
  return(
    <Container>
      <SlideMenuContainer ref={slideMenu}>
        <SlideMenu>
          <li><Link to="/group_chat">채팅방</Link></li>
          <li><Link to="/group_calendar">워커 캘린더</Link></li>
          <li><Link to="/worker_invitation">워커 초대</Link></li>
          <li><Link to="/project_termination">프로젝트 종료</Link></li>
        </SlideMenu>
      </SlideMenuContainer>
      <Header>
        <div className="menu" ref={menuBtn} onClick = {()=>handleMenu(isMenu, setIsMenu)}><i className="fas fa-bars"></i></div>
        <p>{group_name}</p>
        <div className="search" onClick={()=>handleSearch(isSearch, setIsSearch)}><i className="fas fa-search"></i></div>
      </Header>
      <Content>
        <Input ref={input_div}>
          <input ref={input} type="text" placeholder="작성자 검색하기"/>
          <button onClick={()=>searchTimeline(input, setSearch)}>검색</button>
        </Input>
        <div ref={timeline} className="blueBtn" onClick={()=>handleTimeline(setIsTimeline)}><i className="far fa-clock"></i>타임라인</div>
        <div ref={notice} className="grayBtn" onClick={()=>handleNotice(setIsTimeline)}><i className="fas fa-exclamation-triangle"></i>공지사항</div>
      </Content>
      <Link to="/project_timeline/adding_posts" className="ToggleButton"><i className="fas fa-plus"></i></Link>
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
    color:black;
  }
`;
const SlideMenuContainer = styled.div`
  width: 100%;
  height: 15vh;
  position: fixed;
  top:-15vh;
  background: #76D8F3;
  z-index: 1;
  border-bottom: 1px solid #2DCCF8;
  transition: top 0.5s ease-in-out;
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
    &:active{
      color: #76D8F3;
    }
  }
`;

const Content = styled.div`
  width:100%;
  display: flex;
  height: 40%;
  &>div{
    padding: 10px;
  }
  &>.blueBtn{
    display:block;
    width: 50%;
    background:#CDF0FF;
    border: 1px solid #CDF0FF;
    border-bottom: 1px solid #2DCCF8;
    color: #2DCCF8;
    height: 100%;
    font-size: 2vh;
  }
  &>.grayBtn{
    display:block;
    width: 50%;
    background:#E5E5E5;
    border: 1px solid #E5E5E5;
    border-bottom: 1px solid #7D7D7D;
    color: #7D7D7D;
    height: 100%;
    font-size: 2vh;
  }
`
const Input = styled.div`
  display:none;
  position: fixed;
  background: #eee;
  top: 9vh;
  width: 100%;
  &>input{
    margin: 0 2.5%;
    padding: 3px 9px;
    text-align:center;
    width: 70%;
    outline: none;
    border: none;
    border-radius: 20px;
    font-size: 1rem;
  }
  &>button{
    margin: 0 2.5%;
    width: 20%;
    border: 1px solid #aaa;
    box-shadow: 0.5px 0.5px 1px;
    border-radius: 20px;
    &:active{
      box-shadow: -0.5px -0.5px 1px;
    }
  }
`
export default GroupHeader