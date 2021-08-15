import React, {useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addDate, receiveDate } from '../../../_actions/group_calendar_action';
import ModalWindow from './ModalWindow';
import BottomBar from './BottomBar';
import Header from '../Header/Header';
const GroupCalendar = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [modalData, setModalData] = useState('');
  const [isClick, setIsClick] = useState(false);
  const [isWeekends, setIsWeekends] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(receiveDate()).then(response =>{
      // setCalendarData(response.payload.calendarList);
    });
    
  }, [])
  const calculateDate = () =>{
    const current_date = new Date();
    const year = current_date.getFullYear();
    const month = current_date.getMonth()+1 < 10 ? "0"+(current_date.getMonth()+1) : current_date.getMonth()+1;
    const date = current_date.getDate() < 10 ? "0"+current_date.getDate() : current_date.getDate();
    return `${year}-${month}-${date}`;
  }

  const handleDateClick = (arg) =>{
    let end = prompt('언제까지 일 하실 건가요?', arg.dateStr);
    if(end === null || end === '') return;
    let title = prompt('어떤 일을 하실 건가요?'); 
    if(title === null || title === '') return;
    
    const endArray= end.split('-');
    console.log(endArray);
    if(endArray.length !== 3 || endArray[0].length!==4 || endArray[1].length!==2 || endArray[2].length!==2) {
      console.log(endArray.lenth);
      return;
    }
    console.log(arg);
    const dateData = {
      title: title,
      start: calculateDate(),
      end,
      allDay: arg.allDay,
      email: '로그인시 받는 이메일', //redux의 userData의 정보로부터 넣으면 될듯 email과 name은 그렇다
      name: '이름'
    }
    setCalendarData(calendarData.concat(dateData));
    dispatch(addDate(dateData)).then(response=>{
      //백엔드애들이 주석 풀어주기
      // if(response.payload.success){
      //   console.log('할 일 추가됨');
      // }else{
      //  console.log('오류');
      // }
    });
  }
  //date를 누르고 나서 입력하고나서 어떻게 content를 표현할지
  const renderEventContent = (eventInfo) =>{
    //allday: false일 때
    if(eventInfo.timeText!==""){
      console.log(eventInfo);
      return ;
      //return으로 아무것도 안주면 default로 값을 주는 것 같음.
    }
    //allday: true일 때
    return (
      <>
        <i style={{display: "-webkit-box", overflow: "hidden"}}>{eventInfo.event._def.title}</i>
      </>
    )
  }
  //이벤트를 눌렀을 때
  const clickEvent = (info) =>{
    console.log(info);
    setModalData({email: info.event._def.extendedProps.email, title: info.event._def.title});
    console.log(modalData);
    setIsClick(true);
  }

  return (
    <Container>
      <Header title="달력"/>
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: 'dayGridMonth,timeGridWeek,timeGridDay, prev,next today',
          right: 'title'
        }}
        
        dateClick={handleDateClick}
        initialView="dayGridMonth"
        weekends={!isWeekends}
        events={calendarData}
        eventContent={renderEventContent}
        eventClick={clickEvent}
      />
      <ModalWindow isClick={isClick} setIsClick={setIsClick} modalData={modalData}/>
      <BottomBar calendarData={calendarData} setIsWeekends={setIsWeekends}/>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  &>.fc {
    margin-top: 60px;
    &>.fc-toolbar {
      display: flex;
      flex-direction: column;
      &>.fc-toolbar-chunk{
        margin: 10px;
      }
    }
  }
`;

export default GroupCalendar;