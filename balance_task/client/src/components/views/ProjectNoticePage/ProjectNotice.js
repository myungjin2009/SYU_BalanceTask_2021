import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {chooseLoading, receiveNotice} from '../../../_actions/group_action';
import PostBlock from '../common/PostBlock';
import GroupHeader from '../common/GroupHeader';
import { withRouter, Link } from 'react-router-dom';

const getNotice = (userData, dispatch, entireNotice, setIsCompleted) => {
  
    const body = {
      last_number: entireNotice.length-1,
      group: userData.group
    };
    dispatch(receiveNotice(body)).then(res =>{
      setIsCompleted(true);
      console.log('notice 데이터 받기 성공!');
      dispatch(chooseLoading({notice: false}));
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

//스크롤 내릴 때마다 새로운 정보 받기
const handleScrollEvent = (e, entireNotice, userData , isLoading, dispatch, setNotice)=>{
  //로딩 될 때 스크롤 하면 데이터 받으면 안되니까 로딩시 바로 끝내기
  if(isLoading)return;
  const body = {
    last_number: entireNotice.length-1,
    group: userData.group
  };
  const {target: {scrollTop, clientHeight, scrollHeight}} = e;
  if(Math.floor(scrollTop + clientHeight) == scrollHeight){
    console.log('됐다');
    //바로 로딩 true로 설정
    dispatch(receiveNotice(body)).then(res =>{
      console.log(entireNotice, res.payload.array)
      setNotice([...entireNotice,...res.payload.array]);
    });
    //바로 로딩 false로 바꾸자
  }
}

const ProjectNotice = (props) =>{
  const isLoading = useSelector(state => state.group.isLoading.notice);
  const entireNotice = useSelector(state => state.group.noticeList);
  const userData = useSelector(state => state.user.userData);
  console.log(entireNotice);
  const dispatch = useDispatch();

  const [notice, setNotice] = useState(entireNotice);
  const [search, setSearch] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const group=props.match.params.group;

  useEffect(()=>{
    //어차피 공지사항 보려면 무조건 timeline을 넘어가야하니까 이렇게 함.
    if(isLoading){
      if(userData === undefined){
        return;
      }
      getNotice(userData, dispatch, entireNotice, setIsCompleted);
    }else{
      if(isCompleted){
        setNotice(entireNotice);
        console.log(entireNotice);
        console.log('notice 최신화 성공!');
        return;
      }
      if(search ==='' || search === null){
        setNotice(entireNotice);
      }else{
        searchPosts(search, notice, setNotice, entireNotice);
      }
    }
  },[search, isLoading, userData]);

  return(
    <>
      <GroupHeader setSearch={setSearch} group={group}/>
      <Container onScroll={(e)=>handleScrollEvent(e, entireNotice, userData, isLoading, dispatch, setNotice)}>
        {
          isLoading ?
          <>
            <LoadingBlock></LoadingBlock>
            <LoadingBlock></LoadingBlock>
          </>
          :
          notice.map((user_post, i)=>(
            <PostBlock key={i} index={i} user={userData.username} user_post = {user_post} />
          ))
        }
      </Container>
      <Button><Link to={`/${group}/project_notice/adding_posts`} className="AddButton"><i className="fas fa-plus"></i></Link></Button>
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
const Button = styled.div`
  position: fixed;
  bottom: 5vh;
  right: 5vw;
  width: 40px;
  height: 40px;
  &>.AddButton{
    display: block;
    text-align: center;
    background: #aaa;
    border-radius: 50%;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    opacity: 0.5;
    color:black;
  }
`;
export default withRouter(ProjectNotice);