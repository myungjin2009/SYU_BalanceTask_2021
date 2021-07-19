import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import TimelineBlock from '../components/TimelineBlock';
import photo1 from '../images/노답.jpg';
import photo2 from '../images/멋쟁이들.jpg';
import photo3 from '../images/별.jpg';

const getUserPosts = (setIsLoading, setPosts) => {
  console.log('아직 데이터 받는 중');
  setTimeout(()=>{
    call_api().then((res)=>{
      const posts = [
        {
          photo_name : '오늘 공부한 것',
          photo_url : photo1,
          content: `오늘 공부 했는데 오류가 나왔어요.. 
          그래도 노력했습니다! 노력 많이 했는데, 통과 시켜주시죠? 😊 제발 부탁드려요
          제발!!!!!!!!!!!!!!!!!!! 아아가가가가가각가가각 거의다 왔어!!!!!!!!!!!!!!!!!!!!!! 화이팅 오늘 공부 했는데 오류가 나왔어요.. 그래도 노력했습니다! 노력 많이 했는데, 통과 시켜주시죠? 😊 제발 부탁드려요
          제발!!!!!!!!!!!!!!!!!!! 아아가가가가가각가가각 거의다 왔어!!!!!!!!!!!!!!!!!!!!!! 화이팅`,
          user_name: '박건형',
          date: '2021.07.15 23:00',
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
          date: '2021.07.15 13:00',
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
          date: '2021.07.15 13:00',
          votes: {
            negative_votes: 0,
            positive_votes: 4,
            invalid_vote: 0
          }
        }
      ]
      setIsLoading(false);
      setPosts(posts);
      console.log('데이터 받기 성공!');
    }).catch(err => console.log(err));
  }, 2000)
}
const call_api = async() =>{
  const data = await fetch('/api/posts');
  // const body = await data.json();
  return data;
}
const getUserMainPosts = () => {
  const posts_data = [
    {
      photo_name : '멋진 사람들',
      photo_url : photo3,
      content: '다음 주 목요일(7월 22일)에 만날까요?',
      user_name: '박건형',
      date: '2021.07.15 00:01',
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
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([0]);

  useEffect(()=>{
    getUserPosts(setIsLoading, setPosts);
  },[]);
  
  return(
    <>
    {isLoading? 
    <Container>
        <LoadingBlock></LoadingBlock>
        <LoadingBlock></LoadingBlock>
    </Container>:
    <Container>
      {isTimeline ? posts.map((user_post,i)=>(
        <TimelineBlock key={i} user_post = {user_post}/>
      )) : getUserMainPosts().map((user_post, i)=>(
      <TimelineBlock key={i} user_post = {user_post} />
      ))}
    </Container>
    }
    </>
  )
}

const blink_effect = keyframes`
  90%{
    opacity: 0.5;
  }
`

const Container = styled.div`
  width: 100vw;
  height: 85vh;
  margin-top: 15vh;
  background: #fffefe;
`;
const LoadingBlock = styled.div`
  width: 90%;
  height: 40vh;
  background: #eee;
  margin: 1.5vh auto;
  animation: ${blink_effect} 0.8s ease-in-out infinite;
  border-radius: 30px;
  &:first-child{
    margin-top: 17vh;
  }
`;
export default ProjectTimeline