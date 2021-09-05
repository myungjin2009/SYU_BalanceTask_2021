// ISSUE!!!!!!!!!!!!!!!!!문제 발생!!!!!!!!!!!!!!!!!!1
// handleChangeText로 인하여 컴포넌트가 계속 리렌더링 됨.
// ProfileMessage를 계속해서 불러옴
// input text 글씨가 바뀌지가 않음



import React from 'react';
import {useLocation} from 'react-router';
import styled,{keyframes} from 'styled-components';
import Header from '../Header/Header';


const handleChangeText = (e, setCount, setText) => {          //프로필수정-글자수 세기
    setText(e.target.value);
    setCount(e.target.value.length);
};

const LoadMessage = () => {
        const location = useLocation();
        const Message = location.state.Message;
        console.log(location.state.Message);
        return Message;
}

const EditProfileMessage = (props) => {    
    const Message = LoadMessage();
    const[count, setCount] = React.useState(0);                  //프로필수정-글자수 세기
    const[text, setText] = React.useState('');                   //프로필수정-글자수 세기
    return(
    <div>
        <Header title = "프로필 수정"></Header>
        <Content>
            <input type="text"  maxLength="25" value={Message} onChange={(e) => handleChangeText(e, setCount, setText)}></input>
            <div className="numCount">{count}/25</div>
        </Content>

    </div>);
}

const Content = styled.div`
    margin-top: 60px;           //헤더가 가림
    width: 100%;
    height: 50vh;
    border: 2px solid blue;
    text-align: center;

    & > input {
        width: 80%;
        margin-top: 6vh;
        padding: .8em .5em;
        border: 1px solid #999;
        border-radius: 0;
        outline-style: none;
    }
    & > .numCount {
        margin-top: 2vh;
`;


export default EditProfileMessage;
