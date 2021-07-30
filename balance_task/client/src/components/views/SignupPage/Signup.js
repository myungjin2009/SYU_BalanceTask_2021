import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { authUserEmail, signupUser } from "../../../_actions/user_action";

//입력데이터 바뀔 때마다 state 값이 달라지는 함수들
const changeEmail = (e, setEmail) => {
  setEmail(e.target.value);
};

const changeAuthNumber = (e, setAuthNumber) => {
  setAuthNumber(e.target.value);
}

const changePassword = (e, setPassword) => {
  setPassword(e.target.value);
};

const changePasswordCheck = (e, setPasswordCheck) => {
  setPasswordCheck(e.target.value);
};

const changeName = (e, setName) => {
  setName(e.target.value);
};

const changeIsCheck = (e, setIsCheck) => {
  setIsCheck(e.target.checked);
};
//인증번호 보내는 함수
const handleAuthorize = async (dispatch, setIsClick, auth_input, isClick) => {
  const {
    current: { value },
  } = auth_input;
  if (value === "") {
    alert("이메일을 입력해주세요");
    auth_input.current.focus();
    return;
  } else if (isClick === true) {
    alert("이미 이메일에 인증번호를 보냈습니다.");
    return;
  } else {
    setIsClick(true);
    console.log(isClick);
    dispatch(authUserEmail());
  }
};

const Signup = () => {
  const [isClick, setIsClick] = useState(false);
  const [email, setEmail] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [isCheck, setIsCheck] = useState(false);

  const auth_input = useRef(null);
  const password_input = useRef(null);

  const dispatch = useDispatch();

  //최종적으로 입력데이터 보내는 함수
  const handleSubmit = async(e) => {
    const pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,15}$/;
    e.preventDefault();
    if (
      email === "" ||
      authNumber === "" ||
      password === "" ||
      passwordCheck === "" ||
      name === "" ||
      isCheck === false
    ) {
      console.log(email,
        authNumber,
        password,
        passwordCheck,
        name,
        isCheck);
      alert('아직 입력 안된 칸이 있습니다. 모두 입력해주세요!');
      return;
    } 
    
    if(!pwdCheck.test(password)){
      // pwdCheck는 정규 표현식으로 test하는 함수를 지원한다.
      alert("비밀번호는 영문, 숫자, 특수문자 합 9-15자리가 되어야합니다.");
    } 
    
    if (password !== passwordCheck){
      alert('비밀번호를 다시 확인해주세요');
      password_input.current.focus();
      console.log('?');
      return;
    }

    const body = {
      email, authNumber, password, name, isCheck
    }
    dispatch(signupUser(body)).then(response => console.log(response));
  };


  return (
    <Container onSubmit={handleSubmit} autoComplete="off">
      <h1>회원가입</h1>
      <KakaoButton type="button">카카오 로그인</KakaoButton>
      <EmailBox>
        <input
          type="email"
          ref={auth_input}
          value={email}
          onChange={(e) => changeEmail(e, setEmail)}
          placeholder="이메일"
        />
        <button
          type="button"
          onClick={(e) => handleAuthorize(dispatch, setIsClick, auth_input, isClick)}
        >
          인증
        </button>
      </EmailBox>
      {isClick ? (
        <Input
          type="text"
          required
          value={authNumber}
          placeholder="인증번호를 입력해주세요 3:00"
          onChange={(e) => changeAuthNumber(e, setAuthNumber)}
        />
      ) : (
        <p>이메일 인증 버튼을 눌러야 회원가입 버튼이 생깁니다!</p>
      )}
      <Input
        type="password"
        ref={password_input}
        value={password}
        onChange={(e) => changePassword(e, setPassword)}
        placeholder="비밀번호(영문, 숫자, 특수문자 합 9-15자리)"
        autoComplete="off"
        required
      />
      <Input
        type="password"
        required
        value={passwordCheck}
        onChange={(e) => changePasswordCheck(e, setPasswordCheck)}
        autoComplete="off"
        placeholder="비밀번호 확인"
      />
      <Input
        type="text"
        value={name}
        onChange={(e) => changeName(e, setName)}
        placeholder="이름(2-15자)"
        required
      />
      <TermsAndConditions>
        What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
        and typesetting industry. Lorem Ipsum has been the industry's standard
        dummy text ever since the 1500s, when an unknown printer took a galley
        of type and scrambled it to make a type specimen book. It has survived
        not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with
        the release of Letraset sheets containing Lorem Ipsum passages, and more
        recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </TermsAndConditions>
      <CheckBox>
        <input
          type="checkbox"
          value={isCheck}
          onChange={(e) => {
            changeIsCheck(e, setIsCheck);
          }}
          required
        />
        <span>이용약관에 동의합니다.</span>
      </CheckBox>
      {isClick ? <button type="submit">회원가입</button> : ""}
    </Container>
  );
};

const Container = styled.form`
  width: 80vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > h1 {
    margin-top: 10%;
    margin-bottom: 20%;
    text-align: center;
  }
  & > button:last-child {
    width: 100%;
  }
`;

const KakaoButton = styled.button`
  margin: 0 atuo;
  width: 7rem;
  hegiht: 100%;
`;

const EmailBox = styled.div`
  width: 100%;
  border: 1px solid black;
  margin: 1vh;
  & > input {
    width: 85%;
    font-size: 1rem;
    padding: 5px;
    outline: none;
    border: none;
  }
  & > button {
    width: 10%;
    margin: 2.5%;
  }
`;
const Input = styled.input`
  margin: 1vh;
  width: 100%;
  font-size: 1rem;
  padding: 5px;
  outline: none;
  border: 1px solid black;
`;
const TermsAndConditions = styled.p`
  width: 100%;
  padding: 10px;
  overflow-y: scroll;
  height: 10vh;
  margin-bottom: 10px;
`;

const CheckBox = styled.div`
  margin: 2vh;
`;
export default Signup;
