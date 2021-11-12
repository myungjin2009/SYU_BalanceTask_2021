import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { addWorker } from '../../../_actions/user_action';
const closeModal = (setIsModal) =>{
  setIsModal(false);
}

const AddWorker = (props) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const {setIsModal, isModal} = props;
  const dispatch = useDispatch();
  
  const group_members=[
    {
      id: "bjh@naver.com",
      name: '백정훈'
    },
    {
      id: "audwls@naver.com",
      name: '김명진'
    },
    {
      id: "pgh@naver.com",
      name: '박건형'
    },
  ]
  

  // const group_members = useSelector(state=>state.group.group_members);
  const [checked, setChecked] = useState(new Array(group_members.length).fill(false));
  const [checkedMembers,setCheckedMembers] = useState(group_members);
  const handleChange = (e, i) => {
    const updatedCheckedState = checked.map((el, index)=>i===index? !el: el);
    const updateMemberState = group_members.filter((el, index)=>updatedCheckedState[index]===true);
    console.log(updateMemberState);
    setChecked(updatedCheckedState);
    setCheckedMembers(updateMemberState);
  };

  const addHandler = () =>{
    dispatch(addWorker(checkedMembers));
  }

  // useEffect(()=>{
  //   setCheckedMembers([]);
  // },[]);
  return (
    <>
      <Container>
        <Header>
          워커 초대
        </Header>
        <MemberList>
          {group_members.length !== 0 && group_members.map((el, i)=>(<li key={i}><Checkbox {...label} color="primary" checked={checked[i]} onChange={(e)=>handleChange(e, i)}/>{el.name}</li>))}       
        </MemberList>
        <ButtonContent>
          <Button variant="contained" color="primary" onClick={addHandler}>추가하기</Button>
          <Button variant="contained" onClick={()=> closeModal(setIsModal)}>취소하기</Button>
        </ButtonContent>
      </Container>
      <Background onClick={()=> closeModal(setIsModal)}/>
    </>
  )
}

const Container = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-160px, 0);
  background: white;
  width: 320px;
  min-height: 200px;
  padding: 10px;
  border: 1.5px solid black;
  border-radius: 10px;
  z-index: 10;
`;

const Header = styled.header`
  font-size: 20px;
`;

const MemberList = styled.ul`
  margin: 20px 0;
  &>li{
    margin-left: 50px;
    min-width: 160px;
    text-align:left;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 9;
`;
export default AddWorker;
