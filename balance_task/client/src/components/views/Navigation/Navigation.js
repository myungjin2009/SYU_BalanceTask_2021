import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = () => {
  return (
    <Container>
      <Li>
        <i className="fas fa-user-friends"></i>
        <Link to="/worker_list">워커목록</Link>
      </Li>
      <Li>
        <i className="fas fa-users"></i>
        <Link to="/group_search">그룹찾기</Link>
      </Li>
      <Li>
        <i className="far fa-user"></i>
        <Link to="/">마이페이지</Link>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  & > a {
    color: #555;
  }
  & > i {
    color: #555;
  }
`;

export default Navigation;
