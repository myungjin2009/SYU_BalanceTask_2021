import React from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addDate } from '../../../_actions/group_calendar_action';
function ModalDate({dateData, isClick, setIsClick}) {
  console.log(dateData);
  const calculateDate = () =>{
    const current_date = new Date();
    const year = current_date.getFullYear();
    const month = current_date.getMonth()+1 < 10 ? "0"+(current_date.getMonth()+1) : current_date.getMonth()+1;
    const date = current_date.getDate() < 10 ? "0"+current_date.getDate() : current_date.getDate();
    return `${year}-${month}-${date}`;
  }

  // const start = prompt('언제부터 일 하실 건가요?', calculateDate());
  // if(start === null || start === '') return;
  // const end = prompt('언제까지 일 하실 건가요?', arg.dateStr);
  // if(end === null || end === '') return;
  // let title = prompt('어떤 일을 하실 건가요?'); 
  // if(title === null || title === '') return;
  
  // const endArray= end.split('-');
  // console.log(endArray);
  // if(endArray.length !== 3 || endArray[0].length!==4 || endArray[1].length!==2) {
  //   console.log(endArray.lenth);
  //   return;
  // }
  // console.log(arg);
  // const dateData = {
  //   title: title,
  //   start: start,
  //   end:end,
  //   allDay: arg.allDay,
  //   email: '로그인시 받는 이메일', //redux의 userData의 정보로부터 넣으면 될듯 email과 name은 그렇다
  //   name: '이름',
  //   group:group
  // }
  // setCalendarData(calendarData.concat(dateData));
  // dispatch(addDate(dateData)).then(response=>{
  //   //백엔드애들이 주석 풀어주기
  //   // if(response.payload.success){
  //   //   console.log('할 일 추가됨');
  //   // }else{
  //   //  console.log('오류');
  //   // }
  // });

  return (
    <>
      <Background isClick={isClick.modal_date} onClick={()=> setIsClick({...isClick , modal_date: false})}>
      </Background>
      <Container isClick={isClick.modal_date}>
        <div>
          <label>시작 날</label><input type="text"/>
        </div>
        <div>
          <label>끝나는 날</label><input type="text"/>
        </div>
        <div>
          <label>어떤 일을 할 것인가요?</label>
        </div>
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

export default ModalDate;
