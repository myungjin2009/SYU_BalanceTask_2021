import React from 'react';
import styled from 'styled-components';
import NoticeBlock from '../components/NoticeBlock';
import TimelineBlock from '../components/TimelineBlock';
import photo1 from '../images/노답.jpg';
import photo2 from '../images/멋쟁이들.jpg';
import photo3 from '../images/별.jpg';

const getUserPosts = () => {
  const posts_data = [
    {
      photo_name : '오늘 공부한 것',
      photo_url : photo1,
      content: '오늘 공부 했는데 오류가 나왔어요.. 그래도 노력했습니다!',
      user_name: '박건형',
      time: '23:00',
      votes: {
        negative_votes: 2,
        positive_votes: 1,
        invalid_vote: 1
      }
    },
    {
      photo_name : '저희 좀 멋지죠?',
      photo_url : photo2,
      content: '멘토님을 만나서 프로젝트 회의했다.',
      user_name: '김명진',
      time: '13:00',
      votes: {
        negative_votes: 0,
        positive_votes: 4,
        invalid_vote: 0
      }
    },
    {
      photo_name : '저희 좀 멋지죠?',
      photo_url : photo2,
      content: '하동호 열심히 하자!',
      user_name: '박건형',
      time: '13:00',
      votes: {
        negative_votes: 0,
        positive_votes: 4,
        invalid_vote: 0
      }
    }
  ]
  return posts_data;
}

const getUserMainPosts = () => {
  const posts_data = [
    {
      photo_name : '멋진 사람들',
      photo_url : photo3,
      content: '다음 주 목요일(7월 22일)에 만날까요?',
      user_name: '박건형',
      time: '00:01',
      votes: {
        negative_votes: 0,
        positive_votes: 0,
        invalid_vote: 4
      }
    }
  ]
  return posts_data;
}

const ProjectTimeline = ({isTimeline}) =>{
  
  return(
    <Container>
      {isTimeline ? getUserPosts().map((user_post,i)=>(
        <TimelineBlock key={i} user_post = {user_post}/>
      )) : getUserMainPosts().map((user_post, i)=>(
      <NoticeBlock key={i} user_post = {user_post} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 80vh;
  background: #fffefe;
`;
export default ProjectTimeline