import React, { useState } from 'react'
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DropZone from '../common/DropZone';
import Header from '../Header/Header'
function CreatePosts() {
  const [images, setImages] = useState([]);
  const [category, setcategory] = useState("타임라인");
  const [content, setContent] = useState("");
  
  const changeCategory = (e, setcategory) => {
    setcategory(e.target.value);
  };

  const onClickHandler = () =>{
    console.log('aaa');
  }

  const changeContent = (e, setContent) => {
    const {
      target: { value },
    } = e;
    setContent(value);
  };
  return (
    <>
      <Header title="게시물 추가" isButton={true} buttonName="추가" icon="fas fa-plus" onClickHandler={onClickHandler}></Header>
      <DropZone images={images} setImages={setImages}/>
      <Category>
        <label>카테고리: </label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          onChange={(e) => changeCategory(e, setcategory)}
        >
          <MenuItem value="타임라인">타임라인</MenuItem>
          <MenuItem value="공지사항">공지사항</MenuItem>
        </Select>
      </Category>
      <Content>
        <label>내용:</label>
        <textarea
          value={content}
          onChange={(e) => changeContent(e, setContent)}
        ></textarea>
      </Content>
    </>
  )
}

const Category = styled.div`
  margin: 1vh 0;
  display: flex;
  align-items: center;
  & > label {
    margin-right: 3vw;
    font-size: 20px;
    flex-grow: 1;
  }
  & > span {
    padding: 3px;
    border-radius: 10px;
    background: white;
  }
`;

const Content = styled.div`
  margin: 1vh 0;
  display: flex;
  gap: 15px;
  & > label {
    font-size: 24px;
    flex-grow: 1;
  }
  & > textarea {
    width: 60%;
    padding: 15px;
    border: 1px solid #aaa;
    height: 200px;
    font-size: 1rem;
    line-height: 200%;
    border-radius: 10px;
    box-shadow: 0px -1px 1px #aaa;
    color: #022;
    background: white;
    outline: none;
  }
`;

export default CreatePosts
