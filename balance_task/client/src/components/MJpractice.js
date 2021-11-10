import React from 'react';
import styled from 'styled-components';

import MJpractice_two from './MJpractice_two';

const two_show = (two_ref) => {
  console.log("보여주기 버튼이 눌렸습니다.");
  
}

const MJpractice = (props) => {

  const [number,setNumber] = React.useState(0);
  const getData = (num) => {
    setNumber(num);
  }

  return(
    <div>
      띵진이 메인 공간 {number}
      <br/>
      <button>추가하기</button>
      <hr></hr>
      <MJpractice_two isNumber = {number} getData={getData}/>

    </div>
  );
}

export default MJpractice;