import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import axios from 'axios';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DropZone from '../common/DropZone';
import Header from '../Header/Header';
import { withRouter, useLocation } from 'react-router';
import {useSelector} from 'react-redux';

function EditPost(props) {
  const userData = useSelector(state => state.user.userData);
  const location = useLocation();
  const {match: {params: {group}}} = props;
  const [category, setcategory] = useState((location.state.data.kind == "timeLine") ? "타임라인" : "공지사항");
  const [content, setContent] = useState(location.state.data.content);
  //console.log(location.state.data);
  useEffect(()=>{
  },[userData]);

  const changeCategory = (e, setcategory) => {
    setcategory(e.target.value);
  };
  
  const onClickHandler = async() =>{

    const formData = new FormData();
    formData.append('category', category);
    formData.append('content', content);
    formData.append('board_id', location.state.data.id);
    formData.append('user_id', userData.id);
    formData.append('group_name', group);
    const config = {
      'content-type': 'multipart/form-data'
    }
    const response = await axios.put('/api/group/post', formData, config);
    //props.history.push(`/${group}/project`);
    const data = response.data;
    if(data.success){
      alert('글을 성공적으로 업데이트 했습니다.');
      if(category=== '타임라인'){
        window.location.replace(`/${props.match.params.group}/project_timeline`);
      }else if(category=== '공지사항'){
        window.location.replace(`/${props.match.params.group}/project_notice`);
      }
      // props.history.push(`/${props.match.params.group}/project_timeline`);
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
    <Header title="게시물 수정" isButton={true} buttonName="추가" icon="fas fa-plus" onClickHandler={onClickHandler}></Header>
    
    <Category>
        {/* <label>카테고리: </label> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          onChange={(e) => changeCategory(e, setcategory)}
        >
          <MenuItem value={category} disabled>{category}</MenuItem>
        </Select>
      </Category>
    <Content>
      <textarea
        value={content}
        placeholder="내용을 입력하세요"
        style={{marginTop: "2vh", height: "50vh", resize: "none"}}
        onChange={(e) => changeContent(e, setContent)}
      ></textarea>
    </Content>
    </>
  );
}

const Category = styled.div`
  width: 90%;
  margin: 10vh auto 1vh auto;
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

export default withRouter(EditPost);