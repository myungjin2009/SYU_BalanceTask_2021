import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';

import HidingMenu from '../HidingMenu/HidingMenu';
import { receiveMember } from '../../../_actions/group_action';

const handleTimeline = (props, group)=>{
  props.history.push(`/${group}/project_timeline`);
  console.log(props);
}
const handleNotice = (props, group) =>{
  props.history.push(`/${group}/project_notice`);
  console.log(props);
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

const GroupHeader = (props) =>{
  const {setSearch, group, userData} = props;

  const dispatch = useDispatch();
  const timeline = useRef(null);
  const notice = useRef(null);
  const menuBtn = useRef(null);
  const input_div = useRef(null);
  const input = useRef(null);

  const [isMenu, setIsMenu] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isLeader, setIsLeader] = useState(false);
  // const [MemberList, setMemberList] = useState([]);


  useEffect(() => {
    if(timeline===null ||notice===null){
      return;
    }

    if(isSearch === false){
      input_div.current.style.display = "none";
      
    }else{
      input_div.current.style.display = "block";
      input_div.current.children[0].focus();
    }

    if(props.match.path === "/:group/project_timeline"){
      timeline.current.className = 'blueBtn';
      notice.current.className = 'grayBtn';
    }else if(props.match.path === "/:group/project_notice"){
      notice.current.className = 'blueBtn';
      timeline.current.className = 'grayBtn';
      
    }
  }, [isSearch]);

  useEffect(() => {
    if(userData){
      const body = {
        group, id:userData.id
      }
      console.log(body);
      dispatch(receiveMember(body)).then((response)=>{
        if(response.payload.success){
          // setMemberList(response.payload.groupMembers);
          console.log('성공');
          //이 데이터로 리더인지 아닌지 확인해서 프로젝트 종료페이지를 보이게 할 건지 안보이게 할 건지 할 수 있다.
          setIsLeader(response.payload.isLeader);
        }
      });
    }
    
  }, [userData])
  return(
    <Container>
      <HidingMenu isLeader={isLeader} menuBtn={menuBtn} isMenu={isMenu} group={group}/>
      <Header>
        <div className="menu" ref={menuBtn} onClick = {()=>handleMenu(isMenu, setIsMenu)}><i className="fas fa-bars"></i></div>
        <p>{group}</p>
        <div className="search" onClick={()=>handleSearch(isSearch, setIsSearch)}><i className="fas fa-search"></i></div>
      </Header>
      <Content>
        <Input ref={input_div}>
          <input ref={input} type="text" placeholder="작성자 검색하기"/>
          <button onClick={()=>searchTimeline(input, setSearch)}>검색</button>
        </Input>
        <div ref={timeline} className="blueBtn" onClick={()=>handleTimeline(props,group)}><i className="far fa-clock"></i>타임라인</div>
        <div ref={notice} className="grayBtn" onClick={()=>handleNotice(props,group)}><i className="fas fa-exclamation-triangle"></i>공지사항</div>
      </Content>
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
  
`;
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
export default withRouter(GroupHeader);