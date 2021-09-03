import React, { useEffect, useState,useRef } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from 'react-redux';
import { updateDate, deleteDate } from '../../../_actions/group_calendar_action';
import { computeInnerRect } from '@fullcalendar/react';

function ModalWindow({dateInfo,isClick, setIsClick, modalData}) {
  // const email = useSelector(state => state.user.userData.email); 
  // =>이메일은 groupCalendar.js에서 받는 걸로하고 props로 넘겨주자
  const [isChanged, setIsChanged] = useState(false);
  const [content, setContent] = useState('');
  const input_ref = useRef(null);
  const dispatch = useDispatch();

  const handleOnChange = (e) =>{
    const {target: {value}} = e;
    setContent(value);
  }

  const clickPencil = () =>{
    setIsChanged(true);
    if(input_ref.current === null)return;
    input_ref.current.style.display="block";
    input_ref.current.focus();
  }

  //여기서부터는 통신하는 부분
  const changeContent = () =>{
    const obj = {
      group: modalData.group,
      id: dateInfo.event.id,
      title: content
    }
    dispatch(updateDate(obj)).then(response => {
      if(!response.payload.success){
        setIsClick({...isClick , modal_window: false}); //서버랑 통신 잘되면 dispatch안의 then에 넣기
        setIsChanged(false); //서버랑 통신 잘되면 dispatch안의 then에 넣기
        input_ref.current.style.display="none";
        setContent('');
        return;
      } 
    });
  }

  const removeContent = () =>{
    const isRemove = window.confirm("정말 삭제하실 겁니까?");
    if(isRemove === true){
      setIsClick({...isClick , modal_window: true}); //서버랑 통신 잘되면 dispatch안의 then에 넣기
      const obj={
        group:modalData.group,
        id:dateInfo.event.id
      }
      dispatch(deleteDate(obj)).then(response =>{
        if(response.payload.success){
          alert("삭제 성공했습니다.");
          return;
        } 
        
  
      });
    }
  }
  useEffect(()=>{
    //useEffect에서 처리해야할 것은 modalData.email과 지금 로그인 중인 user의 email을 비교해서
    //할 일을 만든 주인공인지 주인공이 아닌지 확인 해야한다.
  },[]);
  return (
    <>
    <Background isClick={isClick.modal_window} onClick={()=> setIsClick({...isClick , modal_window: false})}>
    </Background>
    <Container isClick={isClick.modal_window}>
      <TitleContainer>
        <input style={{display: "none", width: "50%"}} ref={input_ref} type="text" value={content} onChange={handleOnChange} placeholder={modalData.title}/>
        {!isChanged && <p>{modalData.title}</p>}
        <i className="fas fa-edit" onClick={clickPencil}></i>
      </TitleContainer>
      <div style={{textAlign: "center"}}>작성자: {modalData.name}</div>
      <Term>
        <span><b>시작</b>: {modalData.start}&nbsp;&nbsp;</span>
        <span><b>끝</b>: {modalData.end}</span>
      </Term>
      <ButtonGroup>
        { isChanged?
          <> 
            <Button variant="contained" color="secondary" onClick={changeContent}>
              보내기
            </Button>
            <Button variant="contained" color="primary" onClick={()=> {
              setIsChanged(false);
              input_ref.current.style.display="none";
            }}>
              수정 취소
            </Button>
          </>:
          <>
            <Button variant="contained" color="secondary" onClick={removeContent}>
              삭제
            </Button>
            <Button variant="contained" color="primary" onClick={()=> setIsClick({...isClick , modal_window: false})}>
              취소
            </Button>
          </>
        }
        
      </ButtonGroup>
    </Container>
    </>
    
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
  z-index: 2;
  border-radius: 10px;
  border: 2px solid #aaa;
`;

const Background = styled.div`
  display: ${({isClick})=> isClick ? "flex" : "none"};
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background: lightgray;
  opacity: 0.8;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 50px;
  line-height: 32px;
  font-size: 1rem;
  padding: 3px;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 10px;
  &>p{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  &>input{
    border: none;
    font-size: 1rem;
    outline: none;
  }
`;

const Term = styled.div`
  display: flex;
  justify-content: center;
  font-size: 13px;
  background: #f3f3f3;
  border-radius: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;
export default ModalWindow;
