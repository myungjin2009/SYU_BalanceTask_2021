import React from 'react'
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
function Header(props) {
  const {title} = props;
  return (
    <Title>
      <i className="fas fa-chevron-left" onClick={()=>props.history.goBack()}></i>
      <span>{title}</span>
    </Title>
  )
}
const Title = styled.header`
  position: fixed;
  top:0;
  background: white;
  width: 100vw;
  text-align:center;
  border-bottom: 0.5px solid #aaa;
  box-shadow: 0 2px 4px #aaa;
  z-index: 1000;
  &>span{
    font-size: 30px;
    line-height: 60px;
    font-weight: 700;
  }
  &>i:first-child{
    position: absolute;
    font-size: 30px;
    top: 15px;
    left: 10px;
  }

`;
export default withRouter(Header);
