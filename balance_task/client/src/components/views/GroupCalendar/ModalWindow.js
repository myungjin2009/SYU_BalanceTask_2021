import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import {useSelector} from 'react-redux';

function ModalWindow({isClick, setIsClick, modalData}) {
  // const email = useSelector(state => state.user.userData.email);

  const changeContent = () =>{

  }

  const removeContent = () =>{

  }

  return (
    <Container isClick={isClick}>
      <TitleContainer>
        <p>{modalData.title}</p>
        <i className="fas fa-edit" onClick={changeContent}></i>
      </TitleContainer>
      <ButtonGroup>
        <Button variant="contained" color="secondary" onClick={removeContent}>
          삭제
        </Button>
        <Button variant="contained" color="primary" onClick={()=> setIsClick(false)}>
          취소
        </Button>
      </ButtonGroup>
    </Container>
  )
}
const Container = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-150px, 0);
  display: ${({isClick})=> isClick ? "flex" : "none"};
  flex-direction: column;
  justify-content: space-around;
  width: 300px;
  height: 200px;
  border: 1px solid black;
  padding: 10px;
  background: #eee;
  z-index: 1;
  border-radius: 10px;
  border: 2px solid #aaa;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 50px;
  line-height: 32px;
  font-size: 1rem;
  padding: 3px;
  &>p{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 10px;
`;
const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;
export default ModalWindow;
