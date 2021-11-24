import React from 'react'
import styled from 'styled-components';

function ScoreBlock({el}) {
  const {name, point, content, group} = el;
  return (
    <Container>
      <BlockContainer>
        <NameBlock>
          <span>이름: &nbsp;</span>
          <span>{name}</span>
        </NameBlock>
        <ContentBlock>
          <span>그룹: </span>
          <span>{group}</span>
        </ContentBlock>
        <ContentBlock>
          <span style={{width: "40px"}}>내용: </span>
          <span>{content}</span>
        </ContentBlock>
      </BlockContainer>
      <PointBlock>
        <span>{point}</span>
      </PointBlock>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  background: #eee;
  margin: 10px 0;
  padding: 10px;
  display: flex;
`;

const BlockContainer = styled.div`
  width: 80%;
  padding: 10px;
`;

const NameBlock = styled.div`
  display: flex;
`;

const ContentBlock = styled.div`
  display: flex;
  gap: 5px;
`;

const PointBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  color: orange;
  border-left: 2px solid white;
`;
export default ScoreBlock;
