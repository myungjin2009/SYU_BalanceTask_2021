import React from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import ScoreBlock from './ScoreBlock';

const Score = (props) => {

  const {list} = props;

  const header_obj = {
    title: "박건형의 평가 히스토리",
  }
  
  return(
    <Container>
      <Header {...header_obj}/>
      <ShowBlock>
        {list && list.map((el, i) => <ScoreBlock key={i} el={el} />)}
      </ShowBlock>
    </Container>
  );
}

Score.defaultProps = {
  list:[
    {
      name: '박건형',
      point: 80,
      content: '정말 잘하시던데요? 다음에도 같이 해주세요!!',
      group: '프론트 엔드마스터 되기'
    },
    {
      name: '김명진',
      point: 100,
      content: '이분 배우신분입니다. 같이 해보세요',
      group: '리눅스 마스터 되기'
    },
    {
      name: '백정훈',
      point: 90,
      content: '뭐 좀 하시네',
      group: '백엔드 마스터되기'
    },
    {
      name: '하동호',
      point: 100,
      content: '좀 치시네요',
      group: '작곡 오브 레전드'
    }
  ]
}

const Container = styled.div`
  height: 100vh;
`;

const ShowBlock = styled.div`
  margin-top: 80px;
  width: 100%;
`;

export default Score;