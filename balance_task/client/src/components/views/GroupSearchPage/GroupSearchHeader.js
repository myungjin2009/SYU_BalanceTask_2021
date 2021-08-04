import React from "react";
import styled from "styled-components";

const onChangeHandler = (e, setSearch) => {
  setSearch(e.target.value);
};

const GroupSearchHeader = ({ search, setSearch }) => {
  return (
    <SearchBar>
      <Input
        type="text"
        placeholder="그룹명을 입력해주세요."
        value={search}
        onChange={(e) => onChangeHandler(e, setSearch)}
      />
      <i className="fas fa-search"></i>
    </SearchBar>
  );
};

const SearchBar = styled.div`
  width: 100%;
  height: 7vh;
  margin: 20px;
  padding: 1vh;
  display: flex;
  justify-content: space-around;
  border-radius: 10px;
  border: 4px solid #76d8f3;
  & > i {
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
  border: none;
  color: #aaa;
`;

export default GroupSearchHeader;
