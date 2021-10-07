import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import {receiveProjectMypage, myDataLoading} from '../_actions/user_action';


const ONChange= (textBox,text,setText) => {
  setText(textBox.current.value);
}

const MJPracitce = (props) => {

  const [text, setText] = React.useState();
  const textBox = React.useRef();
  const fruits = [
    {
      name: "사과",
      color: "red"
    },
    {
      name: "orange",
      color: "orangeCOLOR"
    },
    {
      name: "포도과",
      color: "violet"
    },
    {
      name: "키위",
      color: "brown"
    },
  ];

  React.useEffect(() => {

  },[text]);

  //console.log(fruits[0].color);
  /**
   * 검색 조건에 따른 배열 필터링(쿼리)
   */
  const filterItems = (query) => {
    return fruits.filter((el) =>
      el.name.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
    );
  }

  //console.log(filterItems('or')); // ['apple', 'grapes']
  //console.log(filterItems('an')); // ['banana', 'mango', 'orange']

  const fruitResults = fruits.map((val,idx) => {
    return(<div key={idx}>
        <div>과일 이름: {val.name}</div>
        <div>과일 색깔: {val.color}</div>
        <br/>
      </div>
    );
  });

  //const filteredFruitResults = 

  if(true){
    return (
      <Block>
        <div>띵진이의 검색 알고리즘 연습</div>
        <input type="text" placeholder="검색하세요" ref={textBox} onChange = {()=>{ONChange(textBox,text,setText)}}></input>
        <br></br>
        {fruitResults}
      </Block>
    );
  }else{
    return(null);
  }

}


const Block = styled.div`
  width: 300px;
  height:300px;
  & > .textBox {
    background-color: red;
    width: 200px;
    height: 30px;
  }
`;


export default withRouter(MJPracitce);
