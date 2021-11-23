import React, { useRef } from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { postNoticeConfirm, postNoticeReject} from '../../../_actions/user_action';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import calculateDate from '../common/DateCalculator';

function InfoBlock(props) {
  const dispatch = useDispatch();
  const {aramsdata:{senduser, time, groupname, content, point}} = props;
  
  const Container_Ref = useRef(null);
  
  console.log(props.aramsdata);
  
  const canceilHandler = () =>{
    const new_obj = {
      ...props.aramsdata,
      isConfirm: false
    }
    dispatch(postNoticeReject(new_obj)).then(res=>{
      if(res.payload.success){
        console.log('취소 성공');
        Container_Ref.current.style.display = "none";
      }
    });
  }

  const confirmHandler = () =>{
    const new_obj = {
      ...props.aramsdata,
      isConfirm: true
    }
    dispatch(postNoticeConfirm(new_obj)).then(res=>{
      if(res.payload.success){
        console.log('확인 성공');
        Container_Ref.current.style.display = "none";
      }
    });
  }

  const movePage = () =>{
    if(content===2){
      props.history.push('/my_page/evaluation/'+ groupname);
      confirmHandler();
    }
  }
  return (
    <Container ref={Container_Ref}>
      <i className="fas fa-times" onClick={canceilHandler}></i>
      <NameBlock onClick={movePage}>
        보낸사람: {senduser}
        {
          content === null && <div>평점: <span>{point}</span></div>
        }
      </NameBlock>
      <Content onClick={movePage}>
        {content === null && `${senduser}님이 ${groupname}에 들어오고 싶어합니다. 허락하시겠습니까?`}
        {content === 0 && `${senduser}님의 ${groupname}에 가입이 거절 되었습니다..`}
        {content === 1 && `${senduser}님의 ${groupname}에 가입 되었습니다!`}
        {content === 2 && `${senduser}님의 ${groupname}을 평가해주세요!`}
      </Content>
      <TimeBlock>
        {calculateDate(time, true)}
      </TimeBlock>
      <ButtonContainer>
        {
          content !==undefined && content !== 2 &&
          <>
            <Button variant="contained" color="primary" style={{width: "45%", margin: "2.5%"}} onClick={confirmHandler}>확인</Button>
            <Button variant="contained" color="secondary" style={{width: "45%", margin: "2.5%"}} onClick={canceilHandler}>취소</Button>
          </>  
        }
      </ButtonContainer>
    </Container>
  )
}

InfoBlock.defaultProps = {
  senduser: '김두유',
  content: '안녕하세요 저 두유개발자에 들어가고 싶은 두유입니다.',
  time: '2021-09-16 8시 8분'
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: rgb(214,214,214);
  border-radius: 5px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  margin:10px 0;
  & > i{
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;
const NameBlock = styled.div`
  &>div{
    display: inline-block;
    border: 1px solid none;
    margin: 0 30px;
    padding: 6px;
    border-radius: 50%;
    
    &>span{
      display: inline-block;
      color: orange;
      padding: 6px;
      background: white;
      border-radius: 50%;
    }
  }
`;
const Content = styled.div`
  width: 300px;
`;
const TimeBlock = styled.div`
  font-size: 12px;
  text-align: right;
`;
const ButtonContainer = styled.div`
  width: 100%;
`;
export default withRouter(InfoBlock);
