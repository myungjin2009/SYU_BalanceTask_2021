import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import GroupSearchHeader from './GroupSearchHeader';
import GroupCard from './GroupCard';
import Navigation from '../Navigation/Navigation';
import { receiveGroupCard , chooseLoadingGroup} from '../../../_actions/group_action';
import {useDispatch, useSelector} from 'react-redux'; 

//스크롤 내릴 때마다 새로운 정보 받기
const handleScrollEvent = (e, dispatch, groups_list, isLoading,setEntireList, setNumber, number)=>{
  if(isLoading)return;
  const body = {
    last_number: number,
    date: new Date() 
  };
  const {target: {scrollTop, clientHeight, scrollHeight}} = e;
  // console.log(scrollTop+clientHeight);
  // console.log(scrollHeight);
  if(Math.ceil(scrollTop + clientHeight) === scrollHeight){
    //바로 로딩 true로 설정
    console.log('됐다');
    dispatch(receiveGroupCard(body)).then(res=>{
      // setTimeout(()=>{
      // }, 2000);
      setEntireList([...groups_list,...res.payload.array]);
      setNumber(number+10);
      //console.log(entireNotice,res.payload.array)
      
    });
    //바로 로딩 false로 바꾸자
  }
}


const GroupSearch = (props) => {
  //entireList는 data를 조작하기 위한 useState의 변수이다.
  const groups_list = useSelector(state => state.group.groups_list);
  const isLoading = useSelector(state => state.group.isLoading.group_search);
  const [entireList, setEntireList] = useState(groups_list);
  const [search, setSearch] = useState('');
  const [number, setNumber] = useState(-1);
  const dispatch = useDispatch();
  //0. 먼저 리덕스로부터 데이터를 받는다. 하지만 처음엔 없다.
  //3. 또 다시 리덕스로부터 데이터를 받는다. 이번엔 데이터가 있다.
  //6. 또 다시 리덕스로부터 데이터를 받는다. 이번에도 데이터가 있다.



  useEffect(()=>{
    let mounted = true;
    if(isLoading){
      //1. 데이터 가져오고 redux의 store에 저장됨
      //7. 새로운 데이터를 다시 가져오고 redux의 store에 저장됨 그리고 다시 3번과정으로 돌아감. 이과정은 이벤트 발동시 반복됨
      const body = {
        last_number: number,
        date: new Date() 
      };
      dispatch(receiveGroupCard(body))
      .then(response =>{
        //   // 백엔드 애들이 주석 풀어주기
        if(response.payload.success && mounted){ // 오류 있으면 지우자
          //   // 2.로딩 해제하고 다시 리렌더링 된다.
          console.log(response);
          setNumber(number+10);
        dispatch(chooseLoadingGroup({group_search: false}));
      }
      });

    }else{
      const newArray = entireList.filter((el)=>el.title===search);
      if(newArray.length===0){
        if(search===''){
          //4. 현재 isLoading은 false이기에 서버로부터 데이터를 더는 안가져온다. 
          // entireList에는 데이터가 없는 상태이므로 리덕스 안에 있는 데이터를 entireList에 넣는다.
          setEntireList(groups_list);
        }else{
          setEntireList(newArray);
        }
        return;
      }else{
        //검색할 때만 사용된다.
        setEntireList(newArray);
      }
      
    }
    //5.  ref로 등록된 버튼을 누르면 다시 isLoading이 true가 된다.
    //버튼을 누를 때마다 데이터 가져옴
    //스크롤 이벤트 넣으면서 사라진 버튼 이벤트
    return () =>(mounted = false);
  },[isLoading, search]);

  useEffect(() => {
    setEntireList(groups_list);
  },[groups_list]);

  const onClickHandler = (kind) =>{
    if(kind==='스터디'){
      const newArray = groups_list.filter(el => el.kind===kind);
      setEntireList(newArray);
    }else if(kind==='학교 조별 과제'){
      const newArray = groups_list.filter(el => el.kind===kind);
      setEntireList(newArray);
    }else if(kind==='팀 프로젝트'){
      const newArray = groups_list.filter(el => el.kind===kind);
      setEntireList(newArray);
    }else{
      setEntireList(groups_list);
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
          isLoading ? 
          <Main>
            <LoadingBlock></LoadingBlock>
            <LoadingBlock></LoadingBlock>
            <LoadingBlock></LoadingBlock>
          </Main>
          :
          <Main onScroll={(e)=>handleScrollEvent(e, dispatch, groups_list, isLoading,setEntireList, setNumber, number)}>
            {
              entireList.length !== 0 ?
              entireList.map((el, index)=><GroupCard props={props} cardData={el} key={index}/>)
              :
              <h2 style={{marginTop: "20vh"}}>아직 올린 사람이 없습니다!</h2>
            }
          </Main>
        }
      <Button>
        <Link to="/create_group"><i className="fas fa-plus"></i></Link>
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