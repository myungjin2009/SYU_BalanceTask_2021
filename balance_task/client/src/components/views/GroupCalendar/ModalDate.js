import React, { useState } from 'react'
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useDispatch } from 'react-redux';
import { addDate } from '../../../_actions/group_calendar_action';
//allday 생각하기
const calculateDate = () =>{
  const current_date = new Date();
  const year = current_date.getFullYear();
  const month = current_date.getMonth()+1 < 10 ? "0"+(current_date.getMonth()+1) : current_date.getMonth()+1;
  const date = current_date.getDate() < 10 ? "0"+current_date.getDate() : current_date.getDate();
  return `${year}-${month}-${date}`;
}

function ModalDate({group,dateInfo, isClick, setIsClick, calendarData, setCalendarData}) {
  console.log(dateInfo);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [toDo, setToDo] = useState('');
  const [kind, setKind] = useState('all day');
  
  const dispatch = useDispatch();
  const changeKind = (e) =>{
    setKind(e.target.value);
  }

  const changeStart = (e) =>{
    const {target:{value}} = e;
    setStart(value);
  }
  const changeEnd = (e) =>{
    const {target:{value}} = e;
    setEnd(value);

  }
  const changeToDo = (e) =>{
    const {target:{value}} = e;
    setToDo(value);
  }

  const addToDo = () =>{              
    if(start === null || start === '') return;
    if(end === null || end === '') return;
    if(toDo === null || toDo === '') return;
    console.log(start, end);
    if(kind==="all day"){
      const dateData = {
        title: toDo,
        start: start,
        end:end,
        allDay: dateInfo.allDay,
        email: '로그인시 받는 이메일', //redux의 userData의 정보로부터 넣으면 될듯 email과 name은 그렇다
        name: '이름',
        group:group
      }
      console.log(dateData);
      dispatch(addDate(dateData)).then(response=>{
        //백엔드애들이 주석 풀어주기
        // if(response.payload.success){
          //   console.log('할 일 추가됨');
          // }else{
            //  console.log('오류');
            // }
            console.log(response.payload);
            setCalendarData(calendarData.concat(response.payload));
      });
      setIsClick({...isClick , modal_date: false});
      
    }else{
      const dateData = {
        title: toDo,
        start: start,
        end:end,
        email: '로그인시 받는 이메일', //redux의 userData의 정보로부터 넣으면 될듯 email과 name은 그렇다
        name: '이름',
        group:group
      }
      console.log(dateData);
      setCalendarData(calendarData.concat(dateData));
      dispatch(addDate(dateData)).then(response=>{
        //백엔드애들이 주석 풀어주기
        if(response.payload.success){
          console.log('할 일 추가됨');
        }else{
         console.log('오류');
        }
      });
      setIsClick({...isClick , modal_date: false});
    }
  }
  // const start = prompt('언제부터 일 하실 건가요?', calculateDate());
  // const end = prompt('언제까지 일 하실 건가요?', arg.dateStr);
  // let title = prompt('어떤 일을 하실 건가요?'); 
  
  // const endArray= end.split('-');
  // console.log(endArray);
  // if(endArray.length !== 3 || endArray[0].length!==4 || endArray[1].length!==2) {
  //   console.log(endArray.lenth);
  //   return;
  // }
  // console.log(arg);
  

  return (
    <>
      <Background isClick={isClick.modal_date} onClick={()=> setIsClick({...isClick , modal_date: false})}>
      </Background>
      <Container isClick={isClick.modal_date}>
        <Input>
          <label>종류 정하기</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={kind}
            onChange={changeKind}
          >
            <MenuItem value="all day">하루 종일</MenuItem>
            <MenuItem value="time">시간 정하기</MenuItem>
          </Select>
        </Input>
        {kind === 'all day' ? (
          <>
            <Input>
              <label>시작 날</label>
              <TextField
                id="date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={start}
                onChange={changeStart}
              />
            </Input>
            <Input>
              <label>끝나는 날</label>
              <TextField
                id="date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={end}
                onChange={changeEnd}
              />
            </Input>
          </>
        ): (
          <>
            <Input>
              <label>시작 날</label>
              <TextField
                id="datetime-local"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                value={start}
                onChange={changeStart}
              />
            </Input>
            <Input>
              <label>끝나는 날</label>
              <TextField
                id="datetime-local"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                value={end}
                onChange={changeEnd}
              />
            </Input>
          </>
        )}
        <TextField id="standard-basic" label="어떤일을 하실건가요?" value={toDo} onChange={changeToDo}/>
        <ButtonContainer>
          <Button variant="contained" color="primary" onClick={addToDo}>추가하기</Button>
          <Button variant="contained" onClick={()=> setIsClick({...isClick , modal_date: false})}>취소</Button>
        </ButtonContainer>
      </Container>
    </>
  )
}
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

const Container = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-175px, 0);
  display: ${({isClick})=> isClick ? "flex" : "none"};
  flex-direction: column;
  justify-content: space-around;
  width: 350px;
  height: 300px;
  border: 1px solid black;
  padding: 10px;
  background: #eee;
  z-index: 2;
  border-radius: 10px;
  border: 2px solid #aaa;
`;

const Input = styled.div`
  display: flex;
  width: 350px;
  height: 30px;
  &>label{
    font-size: 15px;
    line-height: 30px;
    width: 150px;
  }
  &>div{
    width: 150px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  gap:20px;
  &>button{
    flex-grow: 1;
  }
`;

export default ModalDate;
