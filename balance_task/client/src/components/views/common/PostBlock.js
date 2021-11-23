import React,{useState, useEffect, useRef} from 'react';
import { voteForPosts} from '../../../_actions/group_action';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import calculateDate from './DateCalculator';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const handleVote = (dispatch, votes, board_no, userData, e, kind, setVote, path, group, index) => {
  if(votes === null) return;
  const button_text = e.target.textContent;
  if(button_text==="찬성") {
    const current_vote = votes.map((el)=>{
      if(el.user_name===userData.name && el.vote === '반대'){
        return {...el, vote: '찬성'}
      }
      else if(el.user_name===userData.name && el.vote === 0){
        return {...el, vote: '찬성'}
      }
      else{
        return {...el};
      }
    });
    let body = {
      board_number: board_no,
      id:userData.id,
      current_vote,
      group,
      kind,
      timeline_no: index
    }
    dispatch(voteForPosts(body)).then(()=>{
      if(path==="/:group/project_timeline"){
        setVote(current_vote);
        // setStatus('찬성');
      }
    });
    
  }else if(button_text==="반대"){
    const current_vote = votes.map((el)=>{
      if(el.user_name===userData.name && el.vote === '찬성'){
        return {...el, vote: '반대'}
      }
      else if(el.user_name===userData.name && el.vote === 0){
        return {...el, vote: '반대'}
      }
      else{
        return {...el};
      }
    });
    let body = {
      board_number: board_no,
      id:userData.id,
      current_vote,
      group,
      kind,
      timeline_no: index
    }
    dispatch(voteForPosts(body)).then(()=>{
      if(path==="/:group/project_timeline"){
        setVote(current_vote);
        // setStatus('반대');
      }
    });
    
  }
  // api 호출
}

const PostBlock = (props) =>{
  const {index, board_no, user_post, photo_url, userData, group, isTimeline} = props;
  const {content, user_name, date, votes_list, kind} = user_post;
  const vote_div = useRef([]);

  //vote는 사용하지 않음 votes_list로 매핑하므로 vote는 사용하지 않지만, 리렌더링 하기 위해 setVote는 사용
  const [vote, setVote] = useState(votes_list);
  const [status, setStatus] = useState('');
  console.log(board_no, vote, content);
  const path = props.match.path;
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(vote_div.current===null||vote_div.current === undefined){
      return;
    }
    console.log(vote_div);
    vote.forEach((el,i)=>{
      if(el.vote === '찬성') {
        console.log(vote_div.current[i].style.background);
        vote_div.current[i].style.background = 'royalblue';
      }
      else if(el.vote === '반대') {
        console.log(vote_div.current[i].style.background);
        vote_div.current[i].style.background = '#ef5350';
      }
      else{
        console.log(vote_div.current[i].style.background);
        vote_div.current[i].style.background = 'white';
      };
    })
  },[vote]);
  return(
    <Container>
      <ImageBlock>
        {photo_url.map((url, index)=>(
          <Image key={index} photo_url={url} onClick = {()=>{
            if(path==="/:group/project_timeline"){
              props.history.push(`/${group}/project_timeline/`+index, {user_post, photo_url, index});
            }else if(path==="/:group/project_notice"){
              props.history.push(`/${group}/project_notice/`+index, {user_post, photo_url, index});
            }
          }}></Image>
        ))}
      </ImageBlock>
      <Content>
        <p>{content}</p>
        <span><b>작성자</b>: {user_name} &nbsp;&nbsp;&nbsp;&nbsp;<b>보낸 시간</b>: {calculateDate(date, true)}</span>
      </Content>
      {isTimeline && 
      (
        <VotingSpace>
          <ButtonContainer>
            <button className="ThumbUpIcon" style={{fontSize:'0'}} onClick={(e)=>handleVote(dispatch, votes_list, board_no, userData, e, kind, setVote, path, group, index)}>
              <ThumbUpIcon/>찬성
            </button>
            
            <button style={{fontSize:'0'}} onClick={(e)=>handleVote(dispatch, votes_list, board_no, userData, e, kind, setVote, path, group, index)}>
              <ThumbDownIcon/>반대
            </button>  
          </ButtonContainer>
          <Bar>
            { 
              votes_list.map((data, i)=><VoteBlock key={i} ref={(el)=>(vote_div.current[i]=el)}></VoteBlock>)
            }
          </Bar>
        </VotingSpace>
      )}
      {!isTimeline && 
        (
          <hr style={{border: "1px solid #7D7D7D"}}/>
        )
      }
      
    </Container>
  )
}
PostBlock.defaultProps = {
  isTimeline: true
}

const Container = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 20px; 
`;
const ImageBlock = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
`;
const Image = styled.div`
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 400px;
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
  height: 30px;
  background: #fff;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden; 
`;
const VoteBlock = styled.div`
  width: 100%;
  height: 100%;
`;
export default withRouter(PostBlock);