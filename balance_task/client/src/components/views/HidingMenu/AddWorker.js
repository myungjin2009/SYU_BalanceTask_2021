import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { addWorker, dataLoad } from '../../../_actions/user_action';
const closeModal = (setIsModal) =>{
  setIsModal(false);
}

const AddWorker = (props) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const {setIsModal, isModal, workerList} = props;
  const dispatch = useDispatch();
  
  const userData = useSelector(state=>state.user.userData);
  const [checked, setChecked] = useState(new Array(workerList.length).fill(false));
  const [checkedMembers,setCheckedMembers] = useState(workerList);
  const handleChange = (e, i) => {
    const updatedCheckedState = checked.map((el, index)=>i===index? !el: el);
    const updateMemberState = workerList.filter((el, index)=>updatedCheckedState[index]===true);
    setChecked(updatedCheckedState);
    setCheckedMembers(updateMemberState);
  };
  console.log(checkedMembers);

  

  const addHandler = () =>{

    const body = {
      workerList: checkedMembers,
      user_id: userData.id
    }
    dispatch(addWorker(body)).then(res =>{
      if(res.payload.success){
        alert('워커추가 성공!');
        dispatch(dataLoad(true));
        setIsModal(false);
      }
    });
  }
  return (
    <>
      <Container>
        <Header>
          워커 초대
        </Header>
        <MemberList>
          {workerList.length !== 0 && workerList.map((el, i)=>(<li key={i}><Checkbox {...label} color="primary" checked={checked[i]} onChange={(e)=>handleChange(e, i)}/>{el.name}</li>))}       
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
