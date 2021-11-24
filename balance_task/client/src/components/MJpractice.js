import React from 'react';
import styled from 'styled-components';
import { Dot, LoadingWrapper, BounceAnimation } from './styles'

const MJpractice = (props) => {

  const [number,setNumber] = React.useState(0);
  const getData = (num) => {
    setNumber(num);
  }

  return(
    <LoadingWrapper>
      <h3>Loading</h3>
      <Dot delay="0s" />
      <Dot delay="0.1s" />
      <Dot delay="0.2s" />
    </LoadingWrapper>
  );
}

export default MJpractice;