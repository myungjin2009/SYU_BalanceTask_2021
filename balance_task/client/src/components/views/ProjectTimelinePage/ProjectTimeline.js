import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import { receiveTimeline ,chooseLoading, receiveNotice} from '../../../_actions/group_action';
import TimelineBlock from './TimelineBlock';
import GroupHeader from './GroupHeader';

const getTimeline = (dispatch, entireTimeline, setTimeline) => {
  dispatch(receiveTimeline(entireTimeline)).then(res=>{
    dispatch(chooseLoading(false));
    setTimeline(entireTimeline);
    console.log('timeline 데이터 받기 성공!');
  });
}

const getNotice = (dispatch, entireNotice, setNotice) => {
  dispatch(receiveNotice(entireNotice)).then(res =>{
    dispatch(chooseLoading(false));
    setNotice(entireNotice);
    console.log('notice 데이터 받기 성공!');
  });
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

const ProjectTimeline = ({user}) =>{
  const entireTimeline = useSelector(state => state.group.timelineList);
  const isLoading = useSelector(state => state.group.isLoading);
  const entireNotice = useSelector(state => state.group.noticeList);

  const dispatch = useDispatch();

  const [timeline, setTimeline] = useState(entireTimeline);
  const [notice, setNotice] = useState(entireNotice);
  const [search, setSearch] = useState(null);
  const [isTimeline, setIsTimeline] = useState(true);

  useEffect(()=>{
    if(isTimeline){
      if(isLoading){
        getTimeline(dispatch, entireTimeline, setTimeline);
      }else{
        if(search ==='' || search === null){
          setTimeline(entireTimeline);
        }else{
          searchPosts(search, timeline, setTimeline, entireTimeline);
        }
      }
    }else{
      if(isLoading){
        getNotice(dispatch, entireNotice, setNotice);
      }else{
        if(search ==='' || search === null){
          setNotice(entireNotice);
        }else{
          searchPosts(search, notice, setNotice, entireNotice);
        }
      }
    }
  },[search, isLoading, isTimeline]);

  return(
    <>
      <GroupHeader setSearch={setSearch} isTimeline={isTimeline} setIsTimeline={setIsTimeline}/>
      {
        isTimeline ? 
        <Container>
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
        <Container>
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