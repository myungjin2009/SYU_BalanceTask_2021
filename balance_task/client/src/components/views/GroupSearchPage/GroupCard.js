import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import calculateDate from '../common/DateCalculator';
import { useSelector, useDispatch } from 'react-redux';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { deleteGroupCard } from '../../../_actions/group_action';

const GroupCard = ({props, cardData}) =>{
  const {id, title, content, writer, date, image, kind, postimage, makeuser, highlight} = cardData;
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);
  const date_array = date.split('~');
  const start_date = calculateDate(date_array[0]);
  const deadline = calculateDate(date_array[1]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (number) => {
    if(number===1){
      handleUpdate();
    }else if(number===2){ 
      handleDelete();
    }else{

    }
    setAnchorEl(null);
  };

  const handleUpdate = () =>{
    props.history.push('/group_search/edit_post/'+title, {
      cardData, start_date, deadline
    });
  }

  const handleDelete = () =>{
    const body = {
      id
    }
    dispatch(deleteGroupCard(body)).then(res=>{
      if(res.payload.success){
        console.log(title +'삭제 성공!');
      }
    });
  }

  return(
    <Container >
      <Main onClick={()=>{
        props.history.push('/group_search/'+title, {
          ...cardData ,start_date, deadline
        });
      }}>
        <Img image={image}></Img>
        <Content>
          <Title>팀: <span>{title}</span></Title>
          <P>{highlight}</P>
        </Content>
      </Main>
      { 
        userData !==undefined && userData.id===makeuser &&
        (
          <ETC>
            <i className="fas fa-ellipsis-v"  onClick={handleClick}></i>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={()=>handleClose(1)}>수정</MenuItem>
              <MenuItem onClick={()=>handleClose(2)}>삭제</MenuItem>
              <MenuItem onClick={()=>handleClose(3)}>공유</MenuItem>
            </Menu>
          </ETC>
        )
      }
      <Default>
        <DefaultContent><span>작성자</span>: {writer} &nbsp;</DefaultContent>
        <DefaultContent><span>기간</span>: {start_date} ~ {deadline} </DefaultContent>
      </Default>
    </Container>
  );
}

const Container = styled.div`
  position:relative;
  display: flex;
  flex-direction: column;
  width: 95%;
  max-height: 300px;
  padding: 10px;
  margin: 5px;
  border: 1px solid #aaa;
  border-radius: 10px;
  background: #eee;
`;

const Main = styled.div`
    display: flex;
    align-items: center;
    gap:15px;
    
`;

const Img = styled.div`
  width: 70px;
  height: 70px;
  background: gray;
  background-image: url(${({image}) => image});
  background-position: center;
  background-size: cover;
  border-radius: 35px;
  border: 2px solid #cfd8dc;
`;

const Content = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  padding: 10px;
  &>div{
    margin:10px 0;
  }
`;

const ETC = styled.div`
  position: absolute;
  right: 2%;
  height: 30px;
  width: 30px;
  text-align: center;
  &>i{
    width: 100%;
    font-size:20px;
  }
`;

const Title = styled.div`
  width: 100%;
  padding: 3px;
  &>span{
    background: white;
    padding: 0 10px;
    border-radius: 5px;
  }
`;

const P =styled.p`
    width: 100%;
    overflow:hidden;
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    background: white;
    padding: 8px 10px;
    border-radius: 5px;
`

const Default = styled.div`
  font-size: 10px;
  width: 100%;
`;

const DefaultContent = styled.span`
  padding: 3px;
  color: #263238;
  &>span{
    font-weight: 700;
    font-size: 11px;
    color: #555;
  }
`;

export default withRouter(GroupCard);