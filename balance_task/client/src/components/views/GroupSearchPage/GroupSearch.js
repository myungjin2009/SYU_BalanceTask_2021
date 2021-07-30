import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GroupSearchHeader from './GroupSearchHeader';
import GroupCard from './GroupCard';
import Navigation from '../Navigation/Navigation';

const GroupSearch = () => {
  const list = [1,2,3,4];
  return(
    <Container>
      <Menu><i className="fas fa-bars"></i></Menu>
      <GroupSearchHeader />
      <Category>
        <Block>학교 조별 과제</Block>
        <Block>팀 프로젝트</Block>
        <Block>스터디</Block>
      </Category>
      <Main>
        {
          list.map((el, index)=><GroupCard key={index}/>)
        }
      </Main>
      <Button>
        <Link to="/adding_group"><i className="fas fa-plus"></i></Link>
      </Button>
      <Navigation/>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  padding: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Menu = styled.div`
  align-self: flex-start;
  width: 30px;
  height: 30px;
  font-size: 20px;
  text-align: center;
  background: #eee;
  border: none;
  box-shadow: 1px 1px 1px #aaa;
  &:active{
    box-shadow: -1px -1px 1px #aaa;
  }
  color: #aaa;
`;


const Category = styled.div`
  width: 100%;
  height: 5.5vh;
  display: flex;
  justify-content: space-around;
`;

const Block = styled.div`
  display: inline-block;
  width: 100px;;
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
  height: 68vh;
  padding: 3vh 0;
  overflow-y: auto;
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

export default GroupSearch;