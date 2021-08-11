import React, { useState } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
export default function (){
  const [dayData, setDayData] = useState([]);
  const handleDateClick = (arg) =>{
    let title = prompt('언제 일 하실 건가요?');

    if(title === null || title === '') return;

    setDayData(
      dayData.concat({
        title: title,
        start: arg.dateStr,
        end: arg.dateStr,
        allDay: arg.allDay
      })
    )
  }
  //date를 누르고 나서 입력하고나서 어떻게 content를 표현할지
  const renderEventContent = (eventInfo) =>{
    //allday: false일 때
    if(eventInfo.timeText!==""){
      console.log(eventInfo);
      return ;
    }
    //allday: true일 때
    return (
      <>
        <i>{eventInfo.event._def.title}</i>
      </>
    )
  }
  //이벤트를 눌렀을 때
  const clickEvent = (info) =>{
    console.log(info.event._def.title);
    let content = window.confirm(info.event._def.title);
  }

  return (
    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      
      dateClick={handleDateClick}
      initialView="dayGridMonth"
      weekends={true}
      events={dayData}
      eventContent={renderEventContent}
      eventClick={clickEvent}
    />
  )
}