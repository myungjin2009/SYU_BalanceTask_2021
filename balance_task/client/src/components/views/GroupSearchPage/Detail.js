import React from 'react';
import styled from 'styled-components';

const Detail = (props)=>{
  const {match:{params:{team}}} = props;
  const {location:{state:{content, writer, date, image, kind}}} = props;
  return(
    <Conatainer>
      <Header>
        <i className="fas fa-chevron-left"></i>
        <span>{team}</span>
      </Header>
      <Name><label>작성자: </label>{writer}</Name>
      <Category>
        <label>카테고리: </label>
        {kind}
        {/* <select>
          <option>
            학교 조별 과제
          </option>
          <option>
            팀 프로젝트
          </option>
          <option>
            스터디
          </option>
        </select> */}
      </Category>
      <Img image={image}>
      </Img>
      <Deadline>
        <label>기간: </label> {date}
      </Deadline>
      <Content>
        <label>내용:</label>
        <p>{content}</p>
      </Content>
      <button>
        그룹 참여 요청
      </button>
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
  &>div{
    width: 90%;
  }
`;

const Header = styled.header`
  width: 100vw;
  text-align:center;
  border-bottom: 0.5px solid #aaa;
  box-shadow: 0 2px 4px #aaa;
  &>span{
    font-size: 30px;
    line-height: 60px;
  }
  &>i{
    position: absolute;
    font-size: 30px;
    top: 15px;
    left: 10px;
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
`;

const Category = styled.div`
  margin: 1vh 0;
  display: flex;
  align-items: center;
  &>label{
    margin-right: 3vw;
    font-size: 24px;
  }
`;
const Img = styled.div`
  margin: 1vh 0;
  background-image: url(${({image})=>image});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  border: 5px solid #aaa;
`;
const Deadline = styled.div`
  display: flex;
  align-items: center;
  &>label{
    margin-right: 3vw;
    font-size: 24px;
  }
`;
const Content = styled.div`
  margin: 5vh 0;
  &>label{
    font-size: 24px;
  }
  &>p{
    padding: 3px;
    border: 1px solid black;
    min-height: 100px;
    border-radius: 10px;
    box-shadow: 0px -1px 1px black;
  }
`;

export default Detail;