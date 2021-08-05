import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header/Header";
import { findPassword, authUserEmail, changePassword} from "../../../_actions/user_action";
import useTimer from "../../../hook/useTimer";

const changeEmail = (e, setEmail) => {
  const {
    target: { value },
  } = e;
  setEmail(value);
};

const changeName = (e, setName) => {
  const {
    target: { value },
  } = e;
  setName(value);
};
const changeAuthNumber = (e, setAuthNumber) => {
  const {
    target: { value },
  } = e;
  setAuthNumber(value);
};

const chnagePasswordHandler = (e, setPassword) => {
  setPassword(e.target.value);
};

const chnagePasswordCheckHandler = (e, setPasswordCheck) => {
  setPasswordCheck(e.target.value);
};

const handleAuthorize = (e, dispatch, auth_input, setMinutes) => {
  e.preventDefault();
  const {
    current: { value },
  } = auth_input;
  if (value === "") {
    alert("이메일을 입력해주세요");
    auth_input.current.focus();
    return;
  } else {
    //5분으로 세팅
    setMinutes(5);
    const body = {
      value,
    };
    dispatch(authUserEmail(body)).then((response) => {
      if(response.payload.success === false){
        console.log(response.payload.success);
        alert('오류!');
        return;
      }
      console.log(response);
    });
  }
};

function FindingPW(props) {
  //InputBox에 대한 것
  console.log(props);
  const [isClick, setIsClick] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  const { minutes, seconds, setMinutes } = useTimer({ mm: 0, ss: 0 });

  //IdBox에 대한 것
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const auth_input = useRef(null);
  const dispatch = useDispatch();
  const title = "비밀번호 찾기";

  const idBox = useRef(null);
  //비밀번호 찾기 함수
  const findPasswordHandler = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || authNumber === "") {
      alert("이름, 이메일, 인증 번호 모두 입력해주셔야합니다.");
      return;
    }
    if (minutes === 0 && seconds === 0) {
      alert("인증 시간 초과하셨습니다. 다시 회원가입해주시기 바랍니다.");
      props.history.push("/");
      return;
    }
    const body = {
      name,
      email,
      authNumber,
    };
    dispatch(findPassword(body)).then((response) => {
      if (response.payload.success) {
        //만약 인증번호와 이름, 이메일이 맞다면
        setIsClick(true);
      } else {
        alert("맞지 않습니다.");
      }
    });
  };
  //비밀번호 바꾸기 함수
  const changePasswordHandler = (e) => {
    e.preventDefault();
    if(password==='' || passwordCheck===''){
      alert('비밀번호와 비밀번호확인 모두 입력해주세요');
      return;
    }
    if(password !== passwordCheck){
      alert('비밀번호를 다시 확인 해주세요');
      return;
    }
    const body = {
      email, name, password,
    }
    dispatch(changePassword(body))
    .then(response => {
      if(response.payload.success === true){
        props.history.push('/');
      }
    });
  };

  useEffect(() => {
    if (isClick) {
      if (idBox !== null) {
        idBox.current.style.display = "flex";
      }
    }
  }, [isClick]);

  return (
    <Container>
      <Header title={title} />
      <InputBox>
        <form
          onSubmit={(e) => {
            handleAuthorize(e, dispatch, auth_input, setMinutes);
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => changeName(e, setName)}
            placeholder="이름"
            required
          />
          <input
            ref={auth_input}
            type="email"
            value={email}
            onChange={(e) => changeEmail(e, setEmail)}
            placeholder="이메일"
            required
          />
          <button rype="button">인증번호 받기</button>
        </form>
        <form onSubmit={findPasswordHandler}>
          <input
            type="text"
            value={authNumber}
            onChange={(e) => changeAuthNumber(e, setAuthNumber)}
            placeholder="인증번호를 입력해주세요"
            required
          />
          <button type="submit">확인</button>
        </form>
      </InputBox>
      <IdBox ref={idBox} onSubmit={changePasswordHandler}>
        <header>비밀번호를 바꿔보세요.</header>
        <input type="password" placeholder="비밀번호" value={password} onChange={(e)=>chnagePasswordHandler(e, setPassword)} autoComplete="none" />
        <input type="password" placeholder="비밀번호확인" value={passwordCheck} onChange={(e)=>{chnagePasswordCheckHandler(e, setPasswordCheck)}} autoComplete="none" />
        <button type="submit">제출하기</button>
      </IdBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  gap: 5vh;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  width: 70vw;
  padding: 30px;
  border-radius: 5px;
  background: #eee;
  & > form > * {
    margin: 5px 0;
  }
  & > form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & > form > input {
    padding: 5px;
    outline: none;
    font-size: 16px;
    border: 1px solid gray;
    border: none;
  }
  & > form > button {
    background: #0288d1;
    width: 50%;
    border: none;
    color: white;
    padding: 8px;
    margin-top: 3vh;
    box-shadow: 1px 1px 1px gray;
    &:active {
      box-shadow: -1px -1px 1px gray;
    }
  }
`;

const IdBox = styled.form`
  display: none;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  padding: 30px;
  border: none;
  border-radius: 5px;
  gap: 10px;
  background: #c1d5e0;
  & > * {
    margin: 5px 0;
  }
  & > header {
    font-weight: bold;
  }
  & > input {
    padding: 5px;
    outline: none;
    font-size: 16px;
    border: 1px solid gray;
    border: none;
  }
  & > button {
    background: #0288d1;
    width: 50%;
    border: none;
    color: white;
    padding: 8px;
    margin-top: 3vh;
    box-shadow: 1px 1px 1px gray;
    &:active {
      box-shadow: -1px -1px 1px gray;
    }
  }
`;

export default withRouter(FindingPW);
