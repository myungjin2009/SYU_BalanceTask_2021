import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AddWorker from './AddWorker';
import { endProject } from '../../../_actions/group_action';
const clickHandler = (e, setIsModal) =>{
  setIsModal(true);
}

const endHandler = (e, isLeader, dispatch, group) =>{
  console.log(isLeader);
  const body = {
    group
  };
  dispatch(endProject(body)).then(res=>{
    if(res.payload.success){
      console.log('프로젝트 종료 성공');
    }
  });
}

function HidingMenu({isLeader, menuBtn, isMenu, group}) {
  const slideMenu = useRef(null);
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(slideMenu === null)return;
    if(isMenu === false){
      // slideMenu.current.style.display = "none";
      slideMenu.current.style.top = "-15vh";
      menuBtn.current.style.transform = "rotate( 0deg )";
    }else{
      // slideMenu.current.style.display = "block";
      slideMenu.current.style.top = "0";
      menuBtn.current.style.transform = "rotate( 90deg )";
    }
  },[isMenu]);
  
  return (
    <SlideMenuContainer ref={slideMenu}>
      <SlideMenu>
        <li><Link to={`/${group}/group_chat`}>채팅방</Link></li>
        <li><Link to={`/${group}/group_calendar`}>워커 캘린더</Link></li>
        <li><span style={{color:"white"}} onClick={(e)=>clickHandler(e,setIsModal)}>워커 추가</span></li>
        {isLeader === 1 && <li><span style={{color:"white"}} onClick={(e)=>endHandler(e, isLeader, dispatch, group)}>프로젝트 종료</span></li>}
      </SlideMenu>
      { isModal && <AddWorker isModal={isModal} setIsModal={setIsModal}/>}
    </SlideMenuContainer>
  )
}
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

export default HidingMenu;
