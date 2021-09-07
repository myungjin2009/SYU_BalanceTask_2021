import React from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import Button from '@material-ui/core/Button';      //버튼
import {withRouter} from 'react-router-dom';
import { updateMessage, chooseLoading } from '../../../_actions/user_action';
import {useDispatch} from 'react-redux';
const handleChangeText = (e, setCount, setText) => {          //프로필수정-글자수 세기
    setCount(e.target.value.length);
    setText(e.target.value);
};

const ApplyButton = (dispatch,text, props) => {
    const new_obj = {
        text
    }
    dispatch(updateMessage(new_obj)).then((res)=>{
        if(res.payload.success){
            dispatch(chooseLoading(true));
            alert('수정 되었습니다.');
            props.history.push({
                pathname: '/my_page',
                isUpdate: true
            });

        }

    });
}



const EditProfileMessage = (props) => {
    console.log(props.match.params.message);
    const dispatch = useDispatch();
    // const SetMessage = React.useRef(null);
    const[count, setCount] = React.useState(0);                  //프로필수정-글자수 세기
    const[text, setText] = React.useState(props.match.params.message);
    React.useEffect(()=>{
        // const Message = location.state.Message;
        // setText();
        // SetMessage.current.value = Message;
    },[]);

    return(
    <div>
        <Header title = "프로필 수정" message="적용하지 않고 나가시겠습니까?"></Header>
        <Content>
            <input type="text" maxLength="25" value={text} onChange={(e) => handleChangeText(e, setCount, setText)}></input>
            <div className="numCount">{count}/25</div>
            <Button className="applyButton" variant="contained" color="primary" onClick={() => ApplyButton(dispatch, text, props)}>
              적용하기
            </Button>
        </Content>

    </div>);
}

const Content = styled.div`
    margin-top: 60px;           //헤더가 가림
    width: 100%;
    text-align: center;

    & > input {
        width: 80%;
        margin-top: 14vh;
        padding: .8em .5em;
        border: 1px solid #999;
        border-radius: 0;
        outline-style: none;
    }
    & > .numCount {
        margin-top: 4vh;
    }
    & > .applyButton {
        margin-top: 4vh;
        width: 70%;
    }
`;


export default withRouter(EditProfileMessage);