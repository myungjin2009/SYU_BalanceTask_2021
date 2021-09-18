import React from 'react'
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
function Header(props) {
  const {title, message, isButton, buttonName, icon, onClickHandler} = props;
  const goBack = ()=>{
    if(message){
      const data = window.confirm(message);
      if(data){
        props.history.goBack();
        return;
      }
      return;
    }
    props.history.goBack();
  }
  return (
    <Title>
      <i className="fas fa-chevron-left" onClick={goBack}></i>
      <span>{title}</span>
      {isButton && 
        <div onClick={onClickHandler}>
          { icon && <i className={icon}></i>}
          { buttonName && <span>{buttonName}</span>}
        </div>}
    </Title>
  )
}

Header.defaultProps = {
  title: "제목",
  message: null,
  isButton: false,
  onClickHandler: () =>{},
  icon: null,
  buttonName: null
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
    display: inline-block;
    font-size: 18px;
    line-height: 60px;
    font-weight: 700;
  }
  &>i:first-child{
    position: absolute;
    font-size: 20px;
    top: 20px;
    left: 10px;
  }
  & > div {
    display: flex;
    flex-direction: column;
    position: absolute;
    font-size: 20px;
    top: 15px;
    right: 20px;
    &:active {
      color: royalblue;
    }
    & > span {
      font-size: 15px;
    }
  }
`;
export default withRouter(Header);
