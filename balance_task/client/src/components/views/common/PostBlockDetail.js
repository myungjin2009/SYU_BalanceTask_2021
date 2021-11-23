import React from 'react'
import styled from 'styled-components';
import Header from '../Header/Header';
import {useHistory} from 'react-router';
import { withRouter } from 'react-router-dom';
import DateCalculator from './DateCalculator';
//import Default_Profile from "../../../images/profile_sample.jpg";
import {useDispatch} from 'react-redux';
import { deletePost } from '../../../_actions/group_action';

function PostBlockDetail(props) {
  const {photo_name, content, user_name, date, votes_list, kind, profileImage} = props.location.state.user_post;
  const {match: {params: {group}}} = props;
  //console.log(props.location.state.user_post);
  const {photo_url} = props.location.state;
  const [userEdit, setUserEdit] = React.useState(false);
  const dispatch = useDispatch();
  //로그인한 id 가 게시글 작성자 id랑 동일할 경우만 수정/삭제 목록 표시.
  const show3dots = props.userData != null ? (props.userData.name == user_name ? true : false) : false; 
  const history = useHistory();
  const addressPath = props.match.path;
  const addressUrl = props.match.url;

  const shareURL = ()=> {
    var url = '';
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    window.alert("URL이 복사되었습니다. 그룹에 속한 워커들만 열람이 가능합니다.");
  }


  const confirmDelete = () => {
    if(window.confirm("게시글을 삭제하시겠습니까?")) {
      const body = {
        data: props.location.state.user_post
      }
      dispatch(deletePost(body)).then(res=>{
        //if(res.payload.success){
          //console.log(res.payload);
        //}
        props.history.goBack();
      });
     }
  }

  const editPost = () => {
    props.history.push(`${addressUrl}`+`/editPost`, {data: props.location.state.user_post});
    // if(addressPath==="/:group/project_timeline/:index"){
    //   props.history.push(`${addressUrl}`+`/editPost`);
    // }else if(addressPath==="/:group/project_notice/:index"){
    //   props.history.push(`${addressUrl}`+`/editPost`);
    // }
  }

  return (
    <Container>
      <Header title={user_name+"님의 프로젝트 현황"}/>
      <UserBlock>
        <ProfileImage profileImage={profileImage}></ProfileImage>
        <UserInfo>
          <span>{user_name}</span>
          <span>{DateCalculator(date)}</span>
        </UserInfo>
        {show3dots && <UserEdit onClick={() => (userEdit) ? setUserEdit(false) : setUserEdit(true)}>
          <i className="fas fa-ellipsis-v"></i>
          {userEdit && <div className="editWindow">
            <div className="list" onClick={()=>editPost()}>수 정</div>
            <div className="list" onClick={()=>confirmDelete()}>삭 제</div>
            <div className="list" onClick={()=>shareURL()}>공 유</div>
          </div>}
        </UserEdit>}
      </UserBlock>
      <Content>{content}</Content>
      {photo_url.map((url, index)=>(
        <Image key={index} photo_url={url}/>
      ))}
      {votes_list.length !== 0 && (
        <VoteResultBlock>
        <AgreeList>
          <div>찬성</div>
          <ul>
          {
            votes_list.map((el, index)=>{
              if(el.vote === '찬성'){
                return  (<li key={index}>{el.user_name}</li>)
              }
            })
          }
          </ul>
        </AgreeList>
        <ObjectionList>
          <div>반대</div>
          <ul>
          {
            votes_list.map((el, index)=>{
              if(el.vote === "반대"){
                return  (<li key={index}>{el.user_name}</li>)
              }
            })
          }
          </ul>
        </ObjectionList>
        <UnmarkedList>
          <div>미응시</div>
          <ul>
          {
            votes_list.map((el, index)=>{
              if(el.vote === 0){
                return  (<li key={index}>{el.user_name}</li>)
              }
            })
          }
          </ul>
        </UnmarkedList>
      </VoteResultBlock>
      )}
    </Container>
  )
}
const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const UserBlock = styled.div`
  margin: 63px 0 3px 0;
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #eee;
`;

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  background-image: url(${({profileImage})=>profileImage});
  border: 1px solid #2196f3;

`;

const UserInfo = styled.div`
  display:flex;
  flex-direction: column;
  &>span:last-child{
    font-size: 12px;
  }
`;

const UserEdit = styled.div`
  font-size: 20px;
  margin-left: auto;
  padding-top: 2.5vh;
  padding-right: 1.5vh;
  height: 9vh;
  text-align: right;
  & > .editWindow {
    position: absolute;
    transform:translate(-28vw, 0);
    width: 30vw;
    border: solid 1px black;
    background-color: rgb(227,222,243);
    & > .list {
      text-align: center;
      font-size: 2vh;
      padding: 0.7vh 0 0.7vh 0;
      border: solid 1px black;
    }
  }
`;

const Content = styled.p`
  min-height: 15vh; 
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  padding: 6px 6px 10px 6px;
  border-top: 0.5px solid #aaa;
  box-shadow: 0px -2px 3px #aaa;
  color: #616161;
`;
const Image = styled.div`
  width: 100%;
  height: 50%;
  background-image: url('${({photo_url})=>photo_url}');
  background-size:cover;
  background-position:center;
`;

const VoteResultBlock = styled.div`
  mix-height: 30vh;
  display: flex;
  padding: 0px 0px 20px 0px;
`;
const AgreeList = styled.div`
  flex-grow: 1;
  &>div{
    text-align: center;
    background: #2e7d32;
  }
  &>ul>li{
    text-align: center;
  }
`;
const ObjectionList = styled.div`
  flex-grow: 1;
  &>div{
    text-align: center;
    background: #e57373;
  }
  &>ul>li{
    text-align: center;
  }
`;
const UnmarkedList = styled.div`
  flex-grow: 1;
  &>div{
    text-align: center;
    background: white;
  }
  &>ul>li{
    text-align: center;
  }
`;

export default withRouter(PostBlockDetail)
