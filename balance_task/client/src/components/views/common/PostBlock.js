import React,{useState} from 'react';
import { voteForPosts} from '../../../_actions/group_action';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const handleVote = (dispatch, votes, index, user, e, kind, setVote, path) => {
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
    dispatch(voteForPosts(body));
    if(path==="/project_timeline"){
      setVote(current_vote);
    }else if(path === "/project_notice"){
      setVote(current_vote);
    }
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
    dispatch(voteForPosts(body));
    if(path==="/project_timeline"){
      setVote(current_vote);
    }else if(path==="/project_notice"){
      setVote(current_vote);
    }
  }
  // api 호출
}

const PostBlock = (props) =>{
  const {index, user_post ,user} = props;
  const {photo_name, photo_url, content, user_name, date, votes_list, kind, profileImage} = user_post;
  //vote는 사용하지 않음 votes_list로 매핑하므로 vote는 사용하지 않지만, 리렌더링 하기 위해 setVote는 사용
  const [vote, setVote] = useState(votes_list);
  const path = props.match.path;
  const dispatch = useDispatch();
  
  return(
    <Container>
      <Image photo_url={photo_url} onClick = {()=>{
      if(path="/project_timeline"){
        props.history.push('/project_timeline/'+index, user_post);
      }else if(path="/project_notice"){
        props.history.push('/project_notice/'+index, user_post);
      }
    }}></Image>
      <Content>
        <p>{content}</p>
        <span><b>작성자</b>: {user_name} &nbsp;&nbsp;&nbsp;&nbsp;<b>보낸 시간</b>: {date}</span>
      </Content>
      <VotingSpace>
        <ButtonContainer>
          <button onClick={(e)=>handleVote(dispatch, votes_list, index, user, e, kind, setVote, path)}>찬성</button>
          <button onClick={(e)=>handleVote(dispatch, votes_list, index, user, e, kind, setVote, path)}>반대</button>  
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
`;
const NegativeBlock = styled.div`
  width: 100%;
  height: 100%;
  background: #ef5350;
`;
const WhiteBlock = styled.div`
  width: 100%;
  height: 100%;
  background: white;
`;
export default withRouter(PostBlock);