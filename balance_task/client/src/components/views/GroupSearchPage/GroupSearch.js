import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import GroupSearchHeader from './GroupSearchHeader';
import GroupCard from './GroupCard';
import Navigation from '../Navigation/Navigation';
import useAxios from '../../../hook/useAxios';
import img1 from '../../../images/노답.jpg';
import img2 from '../../../images/멋쟁이들.jpg';
import img3 from '../../../images/별.jpg';

const GroupSearch = (props) => {
  const {loading, data, error, refetch} = useAxios({url: '/api/group/search'});
  //entireList는 data를 조작하기 위한 useState의 변수이다.
  const [entireList, setEntireList] = useState([]);
  const [search, setSearch] = useState('');
  console.log(loading, data, error);
  // list는 내가 임의로 만든거 나중엔 list가 사라지고 data 변수 쓸 것
  const list = [
    {
      "title": "멋쟁이",
      "content": `열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
      열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
      열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
      열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
      열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
      열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
      열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
      열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.`,
      "writer": "박건형",
      "date": "2021-08-01 ~ 2021-09-01",
      "image": img1,
      "kind": '학교 조별 과제'
    },
    {
      "title": "두유개발자",
      "content": `열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
      열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
      열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.
      열심히 안하는 사람은 안뽑아요 자랑스러운 두유들의 모임입니다.`,
      "writer": "거녕",
      "date": "2021-08-01 ~ 2021-09-01",
      "image": img2,
      "kind": '팀 프로젝트'
    },
    {
      "title": "키다리아저씨",
      "content": "재단에서 프로젝트 할 사람 모집",
      "writer": "키다리",
      "date": "2021-07-09 ~ 2021-08-03",
      "image": img3,
      "kind": '팀 프로젝트'
    }
  ];

  useEffect(()=>{
    if(!loading){
      //백엔드 쪽에서 데이터 줄 때는 data로 바꿀 것 list ㄴㄴ
      setEntireList(list);
    }
  },[loading]);

  useEffect(()=>{
    const newArray = entireList.filter((el)=>el.title===search);
    if(newArray.length===0){
      if(search===''){
        setEntireList(list);
      }
      return;
    }
    setEntireList(newArray);
  },[search]);

  const onClickHandler = (kind) =>{
    if(kind==='스터디'){
      const newArray = list.filter(el => el.kind===kind);
      setEntireList(newArray);
    }else if(kind==='학교 조별 과제'){
      const newArray = list.filter(el => el.kind===kind);
      setEntireList(newArray);
    }else if(kind==='팀 프로젝트'){
      const newArray = list.filter(el => el.kind===kind);
      setEntireList(newArray);
    }else{
      setEntireList(list);
    }
  }

  return(
    <Container>
      <GroupSearchHeader search={search} setSearch = {setSearch} />
      <Category>
        <Block onClick={() => onClickHandler('')}>전체</Block>
        <Block onClick={() => onClickHandler('학교 조별 과제')}>학교 조별 과제</Block>
        <Block onClick={() => onClickHandler('팀 프로젝트')}>팀 프로젝트</Block>
        <Block onClick={() => onClickHandler('스터디')}>스터디</Block>
      </Category>
        {
          loading ? 
          <Main>
            <LoadingBlock></LoadingBlock>
            <LoadingBlock></LoadingBlock>
            <LoadingBlock></LoadingBlock>
          </Main>
          :
          <Main>
            {
              entireList.length !== 0 ?
              entireList.map((el, index)=><GroupCard props={props} title={el.title} content={el.content} writer={el.writer} date={el.date} image={el.image} kind={el.kind} key={index}/>)
              :
              <h2 style={{marginTop: "20vh"}}>아직 올린 사람이 없습니다!</h2>
            }
            {
              entireList.length % 3 === 0 && entireList.length !==0 && 
              <button onClick={refetch} style={{marginTop: "5vh", padding: "10px", borderRadius: "10px", border: "1px solid #aaa"}}>더 보기</button>
            }
          </Main>
        }
      <Button>
        <Link to="/adding_group"><i className="fas fa-plus"></i></Link>
      </Button>
      <Navigation />
    </Container>
  )
}

const blink_effect = keyframes`
  50%{
    opacity: 0.5;
  }
`;

const Container = styled.div`
  width: 100vw;
  padding: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const Category = styled.div`
  width: 100%;
  height: 5.5vh;
  display: flex;
  justify-content: space-around;
`;

const Block = styled.div`
  display: inline-block;
  width: 80px;;
  height: 4.5vh;
  text-align: center;
  background: #eee;
  border-radius: 30px;
  font-size: 1.5vh;
  line-height: 300%; 
  color: #333;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70vh;
  padding: 3vh 0;
  overflow-y: auto;
`;

const LoadingBlock = styled.div`
  width: 90%;
  height: 15vh;
  background: #eee;
  margin: 1.5vh auto;
  animation: ${blink_effect} 0.8s ease-in-out infinite;
  border-radius: 30px;
`;

const Button = styled.div`
  position: fixed;
  bottom: 10vh;
  right: 5vw;
  background: #aaa;
  border-radius: 50%;
  text-align: center;
  width: 50px;
  height: 50px;
  line-height: 50px;
  opacity: 0.5;
  &>a{
    color: black;
  }
`;

export default withRouter(GroupSearch);