import React from 'react'
import styled from 'styled-components';

function ScoreBlock({el}) {
  const { point, content, group_name, ratername} = el;
  return (
    <Container>
      <BlockContainer>
        <NameBlock>
          <span>이름: &nbsp;</span>
          <span>{ratername}</span>
        </NameBlock>
        <ContentBlock>
          <span>그룹: &nbsp;</span>
          <span>{group_name}</span>
        </ContentBlock>
        <ContentBlock>
          <span >내용: &nbsp;</span>
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
  border-radius: 10px;
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
`;

const PointBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  color: orange;
  border-left: 2px solid white;
  font-size: 25px;
  font-weight: 700;
`;
export default ScoreBlock;
