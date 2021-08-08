import React, { useEffect, useState } from 'react';
import { voteForPosts, receiveTimeline, receiveNotice } from '../../../_actions/group_action';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const handleVote = (dispatch, votes, index, user, e, kind) => {
  if(votes === null) return;
  const button_text = e.target.textContent;
  if(button_text==="찬성") {
    const current_vote = votes.map((el)=>{
      if(el.user_name===user && el.vote === '반대'){
        return {...el, vote: '찬성'}
      }
      else if(el.user_name===user && el.vote === 0){
        return {...el, vote: '찬성'}
      }
      else{
        return {...el};
      }
    });
    let body = {
      id: index,
      current_vote,
      kind
    }
    dispatch(voteForPosts(body)).then(res =>{
      if(kind === "timeline"){
        dispatch(receiveTimeline([]));
      }else if(kind =="notice"){
        dispatch(receiveNotice([]));
      }
    });
  }else if(button_text==="반대"){
    const current_vote = votes.map((el)=>{
      if(el.user_name===user && el.vote === '찬성'){
        return {...el, vote: '반대'}
      }
      else if(el.user_name===user && el.vote === 0){
        return {...el, vote: '반대'}
      }
      else{
        return {...el};
      }
    });
    let body = {
      id: index,
      current_vote,
      kind
    }
    dispatch(voteForPosts(body)).then(res =>{
      if(kind === "timeline"){
        dispatch(receiveTimeline([]));
      }else if(kind =="notice"){
        dispatch(receiveNotice([]));
      }
    });
  }
  // api 호출
}

const TimelineBlock = ({index, user_post, user}) =>{
  const {photo_name, photo_url, content, user_name, date, votes_list, kind} = user_post;

  const dispatch = useDispatch();
  
  return(
    <Container>
      <Image photo_url={photo_url}></Image>
      <Content>
        <p>{content}</p>
        <span><b>작성자</b>: {user_name} &nbsp;&nbsp;&nbsp;&nbsp;<b>보낸 시간</b>: {date}</span>
      </Content>
      <VotingSpace>
        <ButtonContainer>
          <button onClick={(e)=>handleVote(dispatch, votes_list, index, user, e, kind)}>찬성</button>
          <button onClick={(e)=>handleVote(dispatch, votes_list, index, user, e, kind)}>반대</button>  
        </ButtonContainer>
        <Bar>
          {
            votes_list.map((el, i)=>{
              if(el.vote === '찬성') return(<PositiveBlock key={i}></PositiveBlock>)
              else if(el.vote === '반대') return(<NegativeBlock key={i}></NegativeBlock>)
              else return(<WhiteBlock key={i}></WhiteBlock>)
            })
          }
        </Bar>
      </VotingSpace>
    </Container>
  )
}
export default TimelineBlock;

const Container = styled.div`
  width: 100%;
  height: 50vh;
`;
const Image = styled.div`
  width: 100%;
  height: 60%;
  background-image: url('${({photo_url})=>photo_url}');
  background-size:cover;
  background-position:center;
}
`;
const Content = styled.div`
  width: 100%;
  height: 25%;
  padding: 5px;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  &>span{
    display: block;
    font-size: 12px;
    text-align: end;
  }
  &>p{
    overflow:hidden;
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 10px;
  }
`; 
const VotingSpace = styled.div`
  width: 100%;
  height: 15%;
  display:flex;
  align-items: center;
  background: #ccc;
  border-bottom: 3px solid #7D7D7D;
`; 
const ButtonContainer = styled.div`
  width: 30%;
  margin: 0 auto;
  display:flex;
  &>button{
    width:60px;
    height: 40px;
    padding:3px;
    margin:3px;
    border-radius:30px;
    background: #fff;
  }
`;
const Bar = styled.div`
  display: flex;
  width: 50%;
  height: 60%;
  background: #fff;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden; 
`;
const PositiveBlock = styled.div`
  width: 100%;
  height: 100%;
  background: royalblue;
`
const NegativeBlock = styled.div`
  width: 100%;
  height: 100%;
  background: #ef5350;
`
const WhiteBlock = styled.div`
  width: 100%;
  height: 100%;
  background: white;
`