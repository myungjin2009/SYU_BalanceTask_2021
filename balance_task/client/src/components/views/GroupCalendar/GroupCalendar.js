import React, { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import styled from 'styled-components';
import ModalWindow from './ModalWindow'
import BottomBar from './BottomBar'
import Header from '../Header/Header'
const GroupCalendar = () => {
  const [dayData, setDayData] = useState([]);
  const [modalData, setModalData] = useState('');
  const [isClick, setIsClick] = useState(false);
  const [isWeekends, setIsWeekends] = useState(true);
  const handleDateClick = (arg) =>{
    let title = prompt('언제 일 하실 건가요?');
    console.log(arg);
    if(title === null || title === '') return;

    setDayData(
      dayData.concat({
        title: title,
        start: arg.dateStr,
        end: arg.dateStr,
        allDay: arg.allDay,
        email: '로그인시 받는 이메일' //redux의 userData의 정보로부터 넣으면 될듯
      })
    )
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
        weekends={isWeekends}
        events={dayData}
        eventContent={renderEventContent}
        eventClick={clickEvent}
      />
      <ModalWindow isClick={isClick} setIsClick={setIsClick} modalData={modalData}/>
      <BottomBar dayData={dayData} setIsWeekends={setIsWeekends}/>
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