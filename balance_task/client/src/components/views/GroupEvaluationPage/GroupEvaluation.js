import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { useSelector, useDispatch} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';


import Header from '../Header/Header';
import { sendEvaluation } from '../../../_actions/group_action';

const appEvaluationHandler = (e, setAppEvaluation) =>{
  setAppEvaluation(e.target.value);
}

const membersEvaluationHandler = (e, setMembersEvaluation, i, membersEvaluation) =>{
  const new_array = membersEvaluation.map((el, index)=>(index===i ? e.target.value: el));

  console.log(new_array);
  setMembersEvaluation(new_array);
}

const changeScoreForApp = (e, newValue, setPointForApp) =>{
  console.log(newValue);
  setPointForApp(newValue);
}

const changeScoreForMembers = (e, newValue, setPointForMembers, i, pointForMembers) =>{
  const new_array = pointForMembers.map((el, index)=>(index===i ? newValue: el));
  console.log(new_array);
  setPointForMembers(new_array);
}



const ProjectEnd = (props) => {
  const group = props.match.params.group;
  console.log(props);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);
  // 완성하면 주석풀기
  const members = useSelector(state => state.user.members);

  const group_members = members.filter(el => el.group_name === group).filter(el => el.id!==userData.id);
  console.log(group_members);
  //그룹 맴버 필터링이 필요하긴함
  // const group_members = [
  //   {
  //     id: "bjh@naver.com",
  //     name: '백정훈'
  //   },
  //   {
  //     id: "audwls@naver.com",
  //     name: '김명진'
  //   },
  //   {
  //     id: "pgh@naver.com",
  //     name: '박건형'
  //   },
  // ];
  //useEffect를 이용해서 조건적으로 해서 리다이랙션 안되는건 시키면 될듯
  const [pointForApp, setPointForApp] = useState(50);
  const [pointForMembers, setPointForMembers] = useState(new Array(group_members.length).fill(50));
  const [appEvaluation, setAppEvaluation] = useState('');
  const [membersEvaluation, setMembersEvaluation] = useState(new Array(group_members.length).fill(''));

  useEffect(()=>{
    if(group_members.length===0){
      props.history.goBack();
      return;
    }
  },[]);

  const sendEvaluationData = () => {
    const members_evaluation = group_members;
    members_evaluation.forEach((el, i)=>{
      el.point = pointForMembers[i];
      el.evaluation = membersEvaluation[i];
    });

    const app_evaluatuon = { evalutation: appEvaluation, point: pointForApp}
    if(userData.id === undefined || userData.id === null){
      return;
    }
    const body = {
      app_evaluatuon,
      members_evaluation,
      group,
      id:userData.id
    }
    dispatch(sendEvaluation(body)).then((res)=>{
      if(res.payload.success){
        alert('평가 성공!');
        window.location.replace('/my_page');
      }else{
        alert('오류가 발생했네요');
      }
    });
  }

  const header_obj = {
    title:group+" 종료 페이지",
    isButton:true,
    buttonName: "제출하기",
    icon: "fas fa-file-import",
    onClickHandler: sendEvaluationData
  }

  

  return (
    <>
      <Header {...header_obj}/>
      <Container>
        <AppEvaluation>
          <Typography id="app-evaluation-slider" variant="h5" align="center" gutterBottom>
            1. Balance Task를 평가해주세요.
          </Typography>
          <Box margin="10px 30px">
            <Slider
              defaultValue={50}
              aria-labelledby="app-evaluation-slider"
              valueLabelDisplay="auto"
              onChange={(e, newValue)=>changeScoreForApp(e, newValue, setPointForApp)}
              step={10}
              marks
              min={0}
              max={100}
            />
          </Box>
          <Box m={3}>
            <TextArea placeholder="Balance Task 어떠셨나요?😊" onChange={(e)=>appEvaluationHandler(e, setAppEvaluation)}>
            </TextArea>
          </Box>
        </AppEvaluation>
        <MembersEvaluation>
          <Typography id="discrete-slider" variant="h5" align="center" gutterBottom>
            2. 팀원을 평가해주세요.
          </Typography>
          {
            group_members.map((el, i) => (
              <MemberBlock key={i}>
                <NameBox>{el.name}</NameBox>
                <Box>
                  <Typography align="center" variant="h6">점수</Typography>
                  <Box margin="0 30px">
                    <Slider
                      defaultValue={50}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      onChange={(e, newValue)=>changeScoreForMembers(e, newValue, setPointForMembers, i, pointForMembers)}
                      step={10}
                      marks
                      min={0}
                      max={100}
                    />
                  </Box>
                </Box>
                <Box>
                  <Box m={3}>
                    <TextArea placeholder="팀원에게 이 점수를 매겨준 이유가 무엇일까요?" onChange={(e)=>membersEvaluationHandler(e, setMembersEvaluation, i, membersEvaluation)} value={membersEvaluation[i]}>
                    </TextArea>
                  </Box>
                </Box>
              </MemberBlock>
            ))
          }
        </MembersEvaluation>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 100vw;
  max-width: 700px;
  margin: 0 auto;
  height: 100%;
`;
const AppEvaluation = styled.div`
  margin-top: 100px;
`;

const MembersEvaluation = styled.div`
  margin-top: 50px;
`;

const TextArea = styled.textarea`
  width: 100%; 
  min-height: 60px;
  resize: none; 
  padding: 5px; 
  border-radius: 5px; 
  font-size: 16px;
`;

const NameBox = styled.div`
  text-align: center;
  width: 100px;
  border: 1px solid black;
  border-radius: 50px;
  margin: 10px auto;
`;

const MemberBlock = styled.div`
  &:last-of-type{
    margin-bottom: 100px;
  }
`;
export default withRouter(ProjectEnd);
