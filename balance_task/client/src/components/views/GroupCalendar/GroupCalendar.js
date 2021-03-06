import React, {useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';
import styled from 'styled-components';
import { useDispatch, useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { receiveDate } from '../../../_actions/group_calendar_action';
import ModalWindow from './ModalWindow';
import BottomBar from './BottomBar';
import Header from '../Header/Header';
import ModalDate from './ModalDate';
const GroupCalendar = (props) => {
  // const entireCalendar = useSelector(state => state.group_calendar);
  const [calendarData, setCalendarData] = useState([]);
  const [modalData, setModalData] = useState('');
  const [isClick, setIsClick] = useState({modal_window: false, modal_date: false});
  const [isWeekends, setIsWeekends] = useState(false);
  const [dateInfo, setDateInfo] = useState(null);
  const dispatch = useDispatch();
  console.log(calendarData);
  // const user_group=useSelector(state=>state.user);
  //console.log(user_group);
  const group=props.match.params.group;
  useEffect(() => {
    // const isUserGroup = user_group.filter(el => el === group);
    // if(isUserGroup[0] !== true){
    //   props.history.push('/my_page');
    //   return;
    // }
    dispatch(receiveDate(group)).then(response =>{
      //데이터를 받아서 calendarList에 넣기
      if(response.payload.calendarList === undefined){
        return;
      }
      setCalendarData(response.payload.calendarList);
    });
    
  }, [isClick, group, dispatch, ]);

  const handleDateClick = (arg) =>{
    setDateInfo(arg);
    setIsClick({...isClick, modal_date: true});
  }
  //date를 누르고 나서 입력하고나서 어떻게 content를 표현할지
  const renderEventContent = (eventInfo) =>{
    //allday: false일 때
    if(eventInfo.timeText!==""){
      //console.log(eventInfo);
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
    setDateInfo(info);
    setModalData({
      email: info.event._def.extendedProps.email,
      title: info.event._def.title,
      start: info.event.startStr,
      end: info.event.endStr,
      name: info.event.extendedProps.name,
      group:group
    });
    console.log(modalData);
    setIsClick({...isClick , modal_window: true});
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
      {isClick.modal_date && <ModalDate group={group} dateInfo={dateInfo} isClick={isClick} setIsClick={setIsClick} calendarData={calendarData} setCalendarData={setCalendarData}/>}
      <ModalWindow isClick={isClick} dateInfo={dateInfo} setIsClick={setIsClick} modalData={modalData}/>
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

export default withRouter(GroupCalendar);