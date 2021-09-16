import React from 'react'
import styled from 'styled-components';

function InfoBlock(props) {
  const {sender, content, time} = props;
  
  return (
    <Container>
      <NameBlock>
        보낸사람: {sender}
      </NameBlock>
      <Content>
        {content}
      </Content>
      <TimeBlock>
        {time}
      </TimeBlock>
    </Container>
  )
}

InfoBlock.defaultProps = {
  sender: '김두유',
  content: '안녕하세요 저 두유개발자에 들어가고 싶은 두유입니다.',
  time: '2021-09-16 8시 8분'
}

const Container = styled.div`
  width: 100%;
  height: 150px;
  background: rgb(214,214,214);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
`;
const NameBlock = styled.div`
  
`;
const Content = styled.div`

`;
const TimeBlock = styled.div`
  font-size: 12px;
  text-align: right;
`;
export default InfoBlock;
