import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { joinGroup } from '../../../_actions/group_action';
const Detail = (props)=>{
  const {match:{params:{team}}} = props;
  const {location:{state:{content, writer, date, image, kind}}} = props;
  const userData = useSelector(state => state.user.userData);
  const dispatch = useDispatch();
  
  const postHandler = () =>{
    dispatch(joinGroup(userData)).then(response=>{
      if(response.payload.success){
        props.history.goBack();
      }
    })
  }

  return(
    <Conatainer>
      <Header>
        <i className="fas fa-chevron-left" onClick={()=>props.history.goBack()}></i>
        <span>{team}</span>
        <div onClick={postHandler}>
          <i className="fas fa-file-import"></i>
          <span>제출하기</span>
        </div>
      </Header>
      <Name><label>작성자: </label><span>{writer}</span></Name>
      <Category>
        <label>카테고리: </label>
        <span>{kind}</span>
      </Category>
      <Img image={image} onClick={()=>{
        window.open(image);
      }}></Img>
      <Deadline>
        <label>기간: </label> 
        <span>{date}</span>
      </Deadline>
      <Content>
        <label>내용:</label>
        <p>{content}</p>
      </Content>
    </Conatainer>
  )
}

const Conatainer = styled.div`
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
const Name = styled.div`
  margin: 1vh 0;
  margin-top: 5vh;
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
const Img = styled.div`
  width: 100%;
  height: 100%;
  margin: 1vh 0;
  background-image: url(${({image})=>image});
  background-position: center;
  background-size: cover;
  border: 5px solid #aaa;
  border-radius: 10px;
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
const Content = styled.div`
  margin: 1vh 0;
  &>label{
    font-size: 24px;
  }
  &>p{
    padding: 15px;
    border: 1px solid #aaa;
    height: 200px;
    font-size: 1rem;
    line-height: 200%;
    border-radius: 10px;
    box-shadow: 0px -1px 1px #aaa;
    color: #022;
    overflow-y: auto;
    background: white;
  }
`;

export default withRouter(Detail);