import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import TimelineBlock from './TimelineBlock';
import photo1 from '../../../images/노답.jpg';
import photo2 from '../../../images/멋쟁이들.jpg';
import photo3 from '../../../images/별.jpg';

const getUserPosts = (setIsLoading, setPosts, setOriginPosts) => {
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
          votes_list : [
            {
              user_name: '박건형',
              vote: '찬성'
            },
            {
              user_name: '하동호',
              vote: '반대'
            },{
              user_name: '백정훈',
              vote: '반대'
            },{
              user_name: '김명진',
              vote: '찬성'
            }
          ]
        },
        {
          photo_name : '저희 좀 멋지죠?',
          photo_url : photo2,
          content: '멘토님을 만나서 프로젝트 회의했다.',
          user_name: '김명진',
          date: '2021.07.15 13:00',
          votes_list : [
            {
              user_name: '박건형',
              vote: '찬성'
            },
            {
              user_name: '하동호',
              vote: '반대'
            },{
              user_name: '백정훈',
              vote: '반대'
            },{
              user_name: '김명진',
              vote: '찬성'
            }
          ]
        },
        {
          photo_name : '저희 좀 멋지죠?',
          photo_url : photo2,
          content: '하동호 열심히 하자!',
          user_name: '박건형',
          date: '2021.07.15 13:00',
          votes_list : [
            {
              user_name: '박건형',
              vote: '찬성'
            },
            {
              user_name: '하동호',
              vote: '반대'
            },{
              user_name: '백정훈',
              vote: '반대'
            },{
              user_name: '김명진',
              vote: '찬성'
            }
          ]
        }
      ]
      setIsLoading(false);
      setPosts(posts);
      setOriginPosts(posts);
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
      votes_list : [
        {
          user_name: '박건형',
          vote: 0
        },
        {
          user_name: '하동호',
          vote: '반대'
        },{
          user_name: '백정훈',
          vote: '반대'
        },{
          user_name: '김명진',
          vote: 0
        }
      ]
    }
  ]
  return posts_data;
}

const searchPosts = (search, posts, setPosts, originPosts) =>{
  if(posts.length !== originPosts.length){
    console.log(posts.length);
    const search_list =originPosts.filter((post)=>post.user_name === search);
    setPosts(search_list);
    console.log(posts);
  }else{
    console.log(posts.length);
    const search_list =posts.filter((post)=>post.user_name === search);
    setPosts(search_list);
  }
}

const ProjectTimeline = ({isTimeline, user, search}) =>{
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([0]);
  const [originPosts, setOriginPosts] = useState([]);

  useEffect(()=>{
    getUserPosts(setIsLoading, setPosts, setOriginPosts);
    //전체 데이터 저장해둠
  },[]);
  
  useEffect(()=>{
    if(search ===''){
      setPosts(originPosts);
    }else{
      searchPosts(search, posts, setPosts, originPosts);
    }
  },[search]);

  return(
    <>
    {isLoading? 
    <Container>
        <LoadingBlock></LoadingBlock>
        <LoadingBlock></LoadingBlock>
    </Container>:
    <Container>
      {isTimeline ? posts.map((user_post,i)=>(
        <TimelineBlock key={i} user={user} user_post = {user_post}/>
      )) : getUserMainPosts().map((user_post, i)=>(
      <TimelineBlock key={i} user={user} user_post = {user_post} />
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