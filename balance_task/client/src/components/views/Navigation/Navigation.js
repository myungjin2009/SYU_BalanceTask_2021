import React, { useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Navigation = (props) => {
  const {location:{pathname}} = props;
  const workerList_link = useRef(null);
  const groupSearch_link = useRef(null);
  const myPage_link = useRef(null);
  useEffect(()=>{
    if(pathname==='/worker_list'){
      workerList_link.current.style.color = 'royalblue';
    }else if(pathname==='/group_search'){
      groupSearch_link.current.style.color = 'royalblue';
    }else if(pathname==='/my_page'){
      myPage_link.current.style.color = 'royalblue';
    }
  },[]);
  return (
    <Container>
      <Li>
        <Link to="/worker_list">
          <i ref={workerList_link} className="fas fa-user-friends"></i>
          <div>워커목록</div>
        </Link>
      </Li>
      <Li>
        <Link to="/group_search">
          <i ref={groupSearch_link} className="fas fa-users"></i>
          <div>그룹찾기</div>
        </Link>
      </Li>
      <Li>
        
        <Link to="/my_page">
          <i ref={myPage_link} className="far fa-user"></i>
          <div>마이페이지</div>
        </Link>
      </Li>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 8vh;
  background: #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Li = styled.li`
  & > a {
    color: #555;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & > i {
    color: #555;
  }
`;

export default withRouter(Navigation);
