import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const handleVote = (votes, setVotes, user, e) => {
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
    setVotes(current_vote);
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
    setVotes(current_vote);
  }
  // api 호출
}

const TimelineBlock = ({user_post, user}) =>{
  const {photo_name, photo_url, content, user_name, date, votes_list} = user_post;
  const [isUseable, setIsUseable] = useState(false);
  const [votes, setVotes] = useState([]);
  // useEffect에서 votes_list, isUseable는 되게 중요하다. 처음에 votes_list는 undefined로 시작한다. 그래서 처음에는 매핑하지 않고 넘어가고 useEffect에서도 넘어간다.
  // 그리고 아직 isUseable의 값이 바뀌지 않았으니 아무것도 출력하지 않고, 마운트가 다 되면, useEffect에서 votes_list의 값이 바뀌어 있으니 if문에 들어가서
  //isUseable를 true로 해준다. 근데 이건 바로 적용되는 게 아니니 중첩된 if 문은 통과한다.
  useEffect(()=>{
    if(votes_list !== undefined){
      setIsUseable(true);
      if(isUseable){
        setVotes(votes_list);
      }
    }
  },[votes_list, isUseable]);
  return(
    <Container>
      <Image photo_url={photo_url}></Image>
      <Content>
        <p>{content}</p>
        <span><b>작성자</b>: {user_name} &nbsp;&nbsp;&nbsp;&nbsp;<b>보낸 시간</b>: {date}</span>
      </Content>
      <VotingSpace>
        <ButtonContainer>
          <button onClick={(e)=>handleVote(votes, setVotes, user, e)}>찬성</button>
          <button onClick={(e)=>handleVote(votes, setVotes, user, e)}>반대</button>  
        </ButtonContainer>
        <Bar>
          {isUseable ? 
             votes.map((el, i)=>{
            if(el.vote === '찬성') return(<PositiveBlock key={i}></PositiveBlock>)
            else if(el.vote === '반대') return(<NegativeBlock key={i}></NegativeBlock>)
            else return(<WhiteBlock key={i}></WhiteBlock>)
          }):
          ''
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