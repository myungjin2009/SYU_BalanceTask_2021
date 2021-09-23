import React, { useState } from 'react'
import styled from "styled-components";
import axios from 'axios';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DropZone from '../common/DropZone';
import Header from '../Header/Header';
import { withRouter } from 'react-router';

function CreatePosts(props) {
  const {userData} = props;
  const {match: {params: {group}}} = props;
  const [images, setImages] = useState([]);
  const [category, setcategory] = useState("타임라인");
  const [content, setContent] = useState("");
  const [detailImageFile, setDetailImageFile] = useState([]);
  const changeCategory = (e, setcategory) => {
    setcategory(e.target.value);
  };

  const onClickHandler = async() =>{
    if(images.length === 0){
      return alert('사진을 필수적으로 올려주세요');
    }
    
    const formData = new FormData();
    formData.append('images', detailImageFile);
    formData.append('category', category);
    formData.append('content', content);
    formData.append('id', userData.id);
    formData.append('group', group);
    const config = {
      'content-type': 'multipart/form-data'
    }
    const response = await axios.post('/api/group/post', formData, config);
    const data = response.data;
    if(data.success){
      alert('글을 성공적으로 업로드했습니다.');
      props.history.push(`/${props.match.params.group}/project_timeline`);
      return;
    }
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
      <DropZone margin="60px 0 0 0" images={images} detailImageFile={detailImageFile} setDetailImageFile={setDetailImageFile} setImages={setImages}/>
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
  width: 90%;
  margin: 1vh auto;
  & > label {
    display: block;
    margin: 5px 0;
  }
  & > div {
    display: block;
  }
`;

const Content = styled.div`
  width: 90%;
  height: 300px;
  max-height: 400px; 
  margin: 1vh auto;
  gap: 15px;
  & > label {
    display: block;
    margin: 5px 0;
  }
  & > textarea {
    width: 100%;
    padding: 15px;
    border: 1px solid #aaa;
    height: 100%;
    font-size: 1rem;
    line-height: 200%;
    border-radius: 10px;
    box-shadow: 0px -1px 1px #aaa;
    color: #022;
    background: white;
    outline: none;
  }
`;

export default withRouter(CreatePosts);
