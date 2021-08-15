import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import { receiveTimeline ,chooseLoading, receiveNotice} from '../../../_actions/group_action';
import TimelineBlock from './TimelineBlock';
import GroupHeader from './GroupHeader';

const getTimeline = (userData, dispatch, entireTimeline, setTimeline) => {
  if(userData !== {} || userData !== null){
    const body = {
      last_number: entireTimeline.length-1,
      // group: userData.group
    };
    dispatch(receiveTimeline(body)).then(res=>{
      dispatch(chooseLoading(false));
      setTimeline(entireTimeline);
      console.log('timeline 데이터 받기 성공!');
    });
  }
  
}

const getNotice = (userData, dispatch, entireNotice, setNotice) => {
  if(userData !== {} || userData !== null){
    const body = {
      last_number: entireNotice.length-1,
      // group: userData.group
    };
    dispatch(receiveNotice(body)).then(res =>{
      dispatch(chooseLoading(false));
      setNotice(entireNotice);
      console.log('notice 데이터 받기 성공!');
    });
  }
  
}

const searchPosts = (search, posts, setPosts, entirePosts) =>{
  if(posts.length !== entirePosts.length){
    const search_list =entirePosts.filter((post)=>post.user_name === search);
    setPosts(search_list);

  }else{
    const search_list =posts.filter((post)=>post.user_name === search);
    setPosts(search_list);
  }
}

//스크롤 내릴 때마다 새로운 정보 받기
const handleScrollEvent = (e, entireTimeline, entireNotice, userData , isLoading, isTimeline, dispatch)=>{
  //로딩 될 때 스크롤 하면 데이터 받으면 안되니까 로딩시 바로 끝내기
  if(isLoading)return;
  if(isTimeline){
    const body = {
      last_number: entireTimeline.length-1,
      // group: userData.group
    };
    const {target: {scrollTop, clientHeight, scrollHeight}} = e;
    console.log(scrollTop+clientHeight);
    console.log(scrollHeight);
    if(Math.floor(scrollTop + clientHeight) == scrollHeight){
      console.log('됐다');
      //바로 로딩 true로 설정
      dispatch(receiveTimeline(body));
      //바로 로딩 false로 바꾸자
    }
  }else{
    const body = {
      last_number: entireNotice.length-1,
      // group: userData.group
    };
    const {target: {scrollTop, clientHeight, scrollHeight}} = e;
    console.log(scrollTop+clientHeight);
    console.log(scrollHeight);
    if(Math.floor(scrollTop + clientHeight) == scrollHeight){
      console.log('됐다');
      //바로 로딩 true로 설정
      dispatch(receiveNotice(body));
      //바로 로딩 false로 바꾸자
    }
  }
  
}

const ProjectTimeline = ({user}) =>{
  const entireTimeline = useSelector(state => state.group.timelineList);
  const isLoading = useSelector(state => state.group.isLoading);
  const entireNotice = useSelector(state => state.group.noticeList);
  const userData = useSelector(state => {
    console.log(state.user);
    return state.user.userData;
  });

  const dispatch = useDispatch();

  const [timeline, setTimeline] = useState(entireTimeline);
  const [notice, setNotice] = useState(entireNotice);
  const [search, setSearch] = useState(null);
  const [isTimeline, setIsTimeline] = useState(true);

  useEffect(()=>{
    if(isTimeline){
      
      //어차피 공지사항 보려면 무조건 timeline을 넘어가야하니까 이렇게 함.
      if(isLoading){
        if(userData === undefined){
          return;
        }
        getTimeline(userData, dispatch, entireTimeline, setTimeline);
        getNotice(userData, dispatch, entireNotice, setNotice);
      }else{
        if(search ==='' || search === null){
          setTimeline(entireTimeline);
        }else{
          searchPosts(search, timeline, setTimeline, entireTimeline);
        }
      }
    }else{
      if(search ==='' || search === null){
        setNotice(entireNotice);
      }else{
        searchPosts(search, notice, setNotice, entireNotice);
      }
    }
  },[search, isLoading, isTimeline, userData]);

  return(
    <>
      <GroupHeader setSearch={setSearch} isTimeline={isTimeline} setIsTimeline={setIsTimeline}/>
      {
        isTimeline ? 
        <Container onScroll={(e)=>handleScrollEvent(e, entireTimeline, entireNotice, userData, isLoading, isTimeline, dispatch)}>
          {
            isLoading ? 
            <>
              <LoadingBlock></LoadingBlock>
              <LoadingBlock></LoadingBlock>
            </>
            :
            timeline.map((user_post,i)=>(
              <TimelineBlock key={i} isTimeline={isTimeline} index={i} user={user} user_post = {user_post}/>
              ))
          }
        </Container> 
          :
        <Container onScroll={(e)=>handleScrollEvent(e, entireTimeline, entireNotice, userData, isLoading, isTimeline, dispatch)}>
          {
            isLoading ?
            <>
              <LoadingBlock></LoadingBlock>
              <LoadingBlock></LoadingBlock>
            </>
            :
            notice.map((user_post, i)=>(
              <TimelineBlock key={i} index={i} user={user} user_post = {user_post} />
            ))
          }
        </Container>   
      }
    </>
  )
}

const blink_effect = keyframes`
  90%{
    opacity: 0.5;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 85vh;
  margin-top: 15vh;
  background: #fffefe;
  overflow-y: auto;
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