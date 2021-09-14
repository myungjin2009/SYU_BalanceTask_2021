import React from 'react'
import styled from 'styled-components';
import Header from '../Header/Header';
import { withRouter } from 'react-router-dom';

function PostBlockDetail(props) {
  const {photo_name, photo_url, content, user_name, date, votes_list, kind, profileImage} = props.location.state;
  console.log(photo_name, photo_url, content, user_name, date, votes_list, kind, profileImage);
  return (
    <Container>
      <Header title={user_name+"님의 프로젝트 현황"}/>
      <UserBlock>
        <ProfileImage profileImage={profileImage}></ProfileImage>
        <UserInfo>
          <span>{user_name}</span>
          <span>{date}</span>
        </UserInfo>
      </UserBlock>
      <Content>{content}</Content>
      <Image photo_url={photo_url}></Image>
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
