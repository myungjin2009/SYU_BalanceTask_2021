import React from 'react';
import styled from 'styled-components';

const NoticeBlock = ({user_post}) =>{
  const {photo_name, photo_url, content, user_name, time, votes} =user_post;
  return(
    <Container>
      <Image photo_url={photo_url}></Image>
      <Content>
        <p>{content}</p>
        <span>작성자: {user_name} &nbsp;&nbsp;&nbsp;&nbsp;보낸 시간: {time}</span>
      </Content>
      <VotingSpace>
        <ButtonContainer>
          <button>찬성</button>
          <button>반대</button>  
        </ButtonContainer>
        <Bar>
          <div></div>
        </Bar>
      </VotingSpace>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 50vh;
`;
const Image = styled.div`
  width: 100%;
  height: 60%;
  background-image: url('${({photo_url})=>photo_url}');
  background-size:cover;
  background-position:center;
}
`;
const Content = styled.div`
  width: 100%;
  height: 25%;
  padding: 5px;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  &>span{
    display: block;
    font-size: 12px;
    text-align: end;
  }
`; 
const VotingSpace = styled.div`
  width: 100%;
  height: 15%;
  display:flex;
  align-items: center;
  background: #ccc;
  border-bottom: 3px solid #7D7D7D;
`; 
const ButtonContainer = styled.div`
  width: 30%;
  margin: 0 auto;
  display:flex;
  &>button{
    width:60px;
    height: 40px;
    padding:3px;
    margin:3px;
    border-radius:30px;
    background: #fff;
  }
`;
const Bar = styled.div`
  width: 50%;
  height: 60%;
  background: #fff;
  margin: 0 auto; 
`; 

export default NoticeBlock;