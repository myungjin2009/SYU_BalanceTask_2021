import React, {useEffect} from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { useSelector, useDispatch} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Header from '../Header/Header';
const ProjectEnd = (props) => {
  const group = props.match.params.group;
  const header_obj = {
    title:group+" 종료 페이지",
    isButton:true,
    buttonName: "제출하기",
    icon: "fas fa-file-import",
    onClickHandler:"함수"
  }
  const dispatch = useDispatch();
  // 완성하면 주석풀기
  // const group_member = useSelector(state => state.group.group_members);
  const group_member = [
    {
      id: "bjh@naver.com",
      name: '백정훈'
    },
    {
      id: "audwls@naver.com",
      name: '김명진'
    },
    {
      id: "pgh@naver.com",
      name: '박건형'
    },
  ]
  useEffect(() => {
    //완성하면 주석풀기
    // if(group_member=== null || group_member === undefined){
    //   props.history.goBack();
    // }
  }, []);

  return (
    <Container>
      <Header {...header_obj}/>
      <AppEvaluation>
        <Typography id="app-evaluation-slider" variant="h5" align="center" gutterBottom>
          Balance Task를 평가해주세요.
        </Typography>
        <Box m={3}>
          <Slider
            defaultValue={50}
            aria-labelledby="app-evaluation-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={100}
          />
        </Box>
        <Box m={3}>
          <textarea style={{width: "100%", minHeight: "60px", resize: "none" }}>
          </textarea>
        </Box>
      </AppEvaluation>
      <MemberEvaluation>
        <Typography id="discrete-slider" variant="h5" align="center" gutterBottom>
          팀원을 평가해주세요.
        </Typography>
        {
          group_member.map((el, i) => (
            <MemberBlock key={i}>
              <div>{el.name}</div>
              <div>
                <label>점수</label>
                <Box m={3}>
                  <Slider
                    defaultValue={50}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={0}
                    max={100}
                  />
                </Box>
              </div>
              <div>
                <label>내용</label>
                <Box m={3}>
                  <textarea style={{width: "100%", minHeight: "60px", resize: "none" }}>
                  </textarea>
                </Box>
              </div>
            </MemberBlock>
          ))
        }
      </MemberEvaluation>
      
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
const AppEvaluation = styled.div`
  margin-top: 100px;
`;

const MemberEvaluation = styled.div`

`;

const MemberBlock = styled.div`

`;
export default withRouter(ProjectEnd);
