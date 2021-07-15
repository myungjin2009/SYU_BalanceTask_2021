import React from 'react';
import styled from 'styled-components';

const TimelineBlock = ({user_post}) =>{
  console.log(user_post);
  const {photo_name, photo_url, content, user_name, time, votes} =user_post;
  return(
    <Container>
      <img src={photo_url} alt={photo_name}/>
      <Content>
        <p>{content}</p>
        <div>{time}</div>
      </Content>
      <VotingSpace>
        <ButtonContainer>
          <button>찬성</button>
          <button>반대</button>  
        </ButtonContainer>
        <Bar>
          
        </Bar>
      </VotingSpace>
    </Container>
  )
}
export default TimelineBlock;

const Container = styled.div`
  width: 100%;
  margin-bottom: 10px;
  &>img{
    width: 400px;
  }
`;
const Content = styled.div`
  width: 100%;
  
`; 
const VotingSpace = styled.div`
  width: 100%;
  
`; 
const ButtonContainer = styled.div`
  width: 100%;
  
`;
const Bar = styled.div`
  width: 100%;
  
`; 