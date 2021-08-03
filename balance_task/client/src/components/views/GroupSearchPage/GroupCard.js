import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const GroupCard = ({title, content, writer, date, image, props, kind}) =>{

  return(
    <Container onClick={()=>{
      props.history.push('/group_search/'+title, {
        title, content, writer, date, image, kind
      });
    }}>
      <Main>
        <Img image={image}></Img>
        <Content>
          <Title>팀: <span>{title}</span></Title>
          <div>
            <div>내용: </div>
            <p>{content}</p>
          </div>
        </Content>
      </Main>
      <Default>
        <DefaultContent><span>작성자</span>: {writer} &nbsp;</DefaultContent>
        <DefaultContent><span>기간</span>: {date}</DefaultContent>
      </Default>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  max-height: 300px;
  padding: 10px;
  margin: 5px;
  border: 1px solid #aaa;
  border-radius: 10px;
  background: #eee;
`;

const Main = styled.div`
    display: flex;
    align-items: center;
    gap:15px;
`;

const Img = styled.div`
  width: 70px;
  height: 70px;
  background: gray;
  background-image: url(${({image}) => image});
  background-position: center;
  background-size: cover;
  border-radius: 35px;
  border: 2px solid #cfd8dc;
`;

const Content = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  padding: 10px;
  &>div>p{
    width: 100%;
    padding: 3px;
    overflow:hidden;
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    background: white;
    padding: 0 10px;
    border-radius: 10px;
  }
  &>div{
    margin:2px 0;
  }
`;

const Title = styled.div`
  width: 100%;
  padding: 3px;
  &>span{
    background: white;
    padding: 0 10px;
    border-radius: 10px;
  }
`;

const Default = styled.div`
  font-size: 10px;
  width: 100%;
`;

const DefaultContent = styled.span`
  padding: 3px;
  color: #263238;
  &>span{
    font-weight: 700;
    font-size: 11px;
    color: #555;
  }
`;

export default withRouter(GroupCard);