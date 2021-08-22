import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
function CreateGroup(props) {
  
  const [category, setcategory] = useState('학교 조별 과제');
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   console.log(selectedDate);
  // };

  const calculateDate = () =>{
    const current_date = new Date();
    const year = current_date.getFullYear();
    const month = current_date.getMonth()+1 < 10 ? "0"+(current_date.getMonth()+1) : current_date.getMonth()+1;
    const date = current_date.getDate() < 10 ? "0"+current_date.getDate() : current_date.getDate();
    return `${year}-${month}-${date}`;
  }

  const handleChange = (event) => {
    setcategory(event.target.value);
  };

  const postHandler = () =>{
    // dispatch(joinGroup(userData)).then(response=>{
    //   if(response.payload.success){
    //     props.history.goBack();
    //   }
    // })
  }
    return (
      <Conatainer>
        <Header>
          <i className="fas fa-chevron-left" onClick={()=>props.history.goBack()}></i>
          <span>그룹 만들기</span>
          <div onClick={postHandler}>
            <i className="fas fa-file-import"></i>
            <span>그룹 생성</span>
          </div>
        </Header>
        <Input><label>제목: </label><input type="text" /></Input>
        <Category>
          <label>카테고리: </label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              onChange={handleChange}
            >
              <MenuItem value="학교 조별 과제">학교 조별 과제</MenuItem>
              <MenuItem value="팀 프로젝트">팀 프로젝트</MenuItem>
              <MenuItem value="스터디">스터디</MenuItem>
            </Select>
        </Category>
        <Deadline>
          <label>기한: </label> 
          <TextField
            id="date"
            type="date"
            defaultValue={calculateDate()}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Deadline>
        <Input><label>하이라이트: </label><input type="text" /></Input>
        <Input><label>주최자: </label><input type="text" /></Input>
        <PhotoInput>
          <label>사진: </label>
        </PhotoInput>
        <Content>
          <label>내용:</label>
          <textarea></textarea>
        </Content>
      </Conatainer>
    );
  }
  
  const Conatainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 0 10px;
  background: #eee;
  
  &>div{
    width: 90%;
  }
  &>*>input{
    outline:none;
  }
`;

const Header = styled.header`
  background: white;
  width: 100vw;
  text-align:center;
  border-bottom: 0.5px solid #aaa;
  box-shadow: 0 2px 4px #aaa;
  &>span{
    font-size: 30px;
    line-height: 60px;
    font-weight: 700;
  }
  &>i:first-child{
    position: absolute;
    font-size: 30px;
    top: 15px;
    left: 10px;
  }
  &>div{
    display:flex;
    flex-direction: column;
    position: absolute;
    font-size: 20px;
    top: 15px;
    right: 20px;
    &:active{
      color:royalblue;
    }
    &>span{
      font-size: 15px;
    }
  }
`;

const Input = styled.div`
  margin: 1vh 0;
  display: flex;
  align-items: center;
  &>label{
    margin-right: 3vw;
    font-size: 20px;
  }
  &>input{
    width: 240px;
    border-radius: 10px;
    box-shadow: 0px -1px 1px #aaa;
    border: 1px solid #aaa;
    color: #022;
    font-size: 1rem;
    padding: 4px 10px;
  }
`;

const Category = styled.div`
  margin: 1vh 0;
  display: flex;
  align-items: center;
  &>label{
    margin-right: 3vw;
    font-size: 24px;
  }
  &>span{
    padding: 3px;
    border-radius: 10px;
    background: white;
  }
`;
const Deadline = styled.div`
  display: flex;
  align-items: center;
  &>label{
    margin-right: 3vw;
    font-size: 24px;
  }
  &>span{
    padding: 3px;
    border-radius: 10px;
    background: white;
  }
`;
const PhotoInput = styled.div`
  &>label{
    margin-right: 3vw;
    font-size: 24px;
  }
`;
const Content = styled.div`
  margin: 1vh 0;
  display: flex;
  gap: 15px;
  &>label{
    font-size: 24px;
  }
  &>textarea{
    width: 280px;
    padding: 15px;
    border: 1px solid #aaa;
    height: 200px;
    font-size: 1rem;
    line-height: 200%;
    border-radius: 10px;
    box-shadow: 0px -1px 1px #aaa;
    color: #022;
    background: white;
    outline:none;
  }
`;
  
  export default withRouter(CreateGroup);
  