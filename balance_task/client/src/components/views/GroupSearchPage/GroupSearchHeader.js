import React from 'react';
import styled from 'styled-components';

const GroupSearchHeader = () =>{
  return(
    <SearchBar>
        <Input type="text" placeholder="그룹명을 입력해주세요."/>
        <i className="fas fa-search"></i>
    </SearchBar>
  ) 
}

const SearchBar = styled.div`
  width: 100%;
  height: 7vh;
  margin: 20px;
  padding: 1.0vh;
  display: flex;
  justify-content: space-around;
  border-radius: 10px;
  border: 4px solid #76D8F3;
  &>i{
    color: #aaa;
    display: inline-block;
    width: 20%;
    height: 100%;
    text-align: center;
    font-size: 2vh;
    line-height: 200%;
    background: white;
    border: 1px solid white;
  }
`;

const Input = styled.input`
  width: 80%;
  height: 100%;
  font-size: 15px;
  padding: 5px;
  outline: none;
  border: 1px solid white;
  color: #aaa;
`;

export default GroupSearchHeader