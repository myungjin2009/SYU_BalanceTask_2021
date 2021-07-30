import React from 'react';
import styled from 'styled-components';

const GroupCard = () =>{
  return(
    <Container>
      <Img>
        
      </Img>
      <Content>
        <Title>제목:</Title>
        <p>내용:</p>
        <Default>
          <DefaultContent><span>작성자</span>: 박건형 &nbsp;</DefaultContent>
          <DefaultContent><span>기간</span>: 2021.02.05 ~ 2021.03.15</DefaultContent>
        </Default>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  min-width: 300px;
  height: 130px;
  padding: 10px;
  margin: 5px;
  border: 2px solid #aaa;
  border-radius: 10px;
  background: #eee;
`;

const Img = styled.div`
  width: 50px;
  height: 50px;
  background: gray;
  border-radius: 25px;
  margin-right: 20px;
`;

const Content = styled.div`
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  padding: 10px;
  &>p{
    width: 100%;
    padding: 3px;
  }
  &>div{
    margin:2px 0;
  }
`;

const Title = styled.div`
  width: 100%;
  padding: 3px;
`;

const Default = styled.div`
  font-size: 10px;
  width: 100%;
`;

const DefaultContent = styled.span`
  &>span{
    font-weight: 700;
    font-size: 11px;
    color: #555;
  }
`;

export default GroupCard;