import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {chooseLoadingGroup, receiveNotice} from '../../../_actions/group_action';
import PostBlock from '../common/PostBlock';
import GroupHeader from '../common/GroupHeader';
import { withRouter, Link } from 'react-router-dom';

const getNotice = (group, dispatch, entireNotice, setIsCompleted) => {
  
    const body = {
      last_number: entireNotice.length-1,
      group: group
    };
    dispatch(receiveNotice(body)).then(res =>{
      setIsCompleted(true);
      console.log('notice 데이터 받기 성공!');
      dispatch(chooseLoadingGroup({notice: false}));
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
const handleScrollEvent = (e, entireNotice, group , isLoading, dispatch,setNotice)=>{
  //로딩 될 때 스크롤 하면 데이터 받으면 안되니까 로딩시 바로 끝내기
  if(isLoading)return;
  const body = {
    last_number: entireNotice.length-1,
    group: group
  };
  const {target: {scrollTop, clientHeight, scrollHeight}} = e;
  if(Math.floor(scrollTop + clientHeight) == scrollHeight){
    console.log('됐다');
    //바로 로딩 true로 설정
    dispatch(receiveNotice(body)).then(res=>{
      console.log(entireNotice,res.payload.array)
      setNotice([...entireNotice,...res.payload.array]);
    });
    //바로 로딩 false로 바꾸자
  }
}

const ProjectNotice = (props) =>{
  const entireNotice = useSelector(state => state.group.noticeList);
  const isLoading = useSelector(state => state.group.isLoading.notice);
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
      console.log(isLoading);      
      getNotice(group, dispatch, entireNotice, setIsCompleted);
    }else{
      if(isCompleted){
        setNotice(entireNotice);
        console.log('notice 최신화 성공!');
        console.log(entireNotice);
      }
      if(search ==='' || search === null){
        setNotice(entireNotice);
      }else{
        searchPosts(search, notice, setNotice, entireNotice);
      }
    }
  },[search, isLoading]);

  return(
    <>
      <GroupHeader setSearch={setSearch} group={group}/>
      <Container onScroll={(e)=>handleScrollEvent(e, entireNotice, group, isLoading, dispatch,setNotice)}>
        {
          isLoading ?
          <>
            <LoadingBlock></LoadingBlock>
            <LoadingBlock></LoadingBlock>
          </>
          :
          notice.length !==0 ? notice.map((user_post, i)=>(
            <PostBlock key={i} index={i} userData={userData} user_post = {user_post} group={group} isTimeline = {false} photo_url={user_post.image}/>
          )):
            <div>
                <NoGroup>
                    <div className="NoWorkerIcon">
                      <i className="fas fa-info-circle"></i>
                    </div>
                    <div className="NoWorkerMessage">아무런 공지사항이 없습니다.</div>
                    <div className="RecommendArrow">
                      <i className="fas fa-sort-down"></i>
                    </div>
                </NoGroup>
            </div>
        }
      </Container>
      <Button direction="left"><Link to={`/my_page`} className="Button-type"><i className="fas fa-user"></i></Link></Button>
      <Button direction="right"><Link to={`/${group}/create_posts`} className="Button-type"><i className="fas fa-plus"></i></Link></Button>
      
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
  ${(props)=>props.direction}: 5vw;
  width: 40px;
  height: 40px;
  &>.Button-type{
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

const ArrowMove = keyframes`
    0% {
      transform:translate(0, 0);
    }
    100% {
      transform:translate(0, 35%);
    }
`;

const NoGroup = styled.div`
    text-align: center;
    margin-top: 12vh;
    & > .NoWorkerIcon {
      font-size: 8vh;
      color: rgb(255,179,128);
    }
    & > .NoWorkerMessage {
      font-size: 3vh;
      font-weight: bold;
      margin-top: 2vh;
    }
    & > .RecommendArrow{
      position: fixed;
      bottom: 12vh;
      right: 5vw;
      font-size: 5vh;
      width: 40px;
      color: rgba(74,171,242);
      margin-top: 5vh;
      animation: ${ArrowMove} 0.5s 1s 10 ease alternate;
    }
`;

export default withRouter(ProjectNotice);