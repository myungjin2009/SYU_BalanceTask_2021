import React from "react";
import styled from "styled-components";

function BottomBar({ calendarData, setIsWeekends }) {
  return (
    <Container>
      <WeekendsSetting>
        <label>주말 블럭 없애기</label>
        <input
          type="checkbox"
          onClick={(e) => {
            setIsWeekends(e.target.checked);
          }}
        />
      </WeekendsSetting>
      <h2>한 눈에 할 일 보기</h2>
      <Table>
        <thead>
          <tr>
            <td>시작하는 날</td>
            <td>끝나는 날</td>
            <td>내용</td>
          </tr>
        </thead>
        <tbody>
        {calendarData.map((el, i) => {
          return (
            <tr key={i}>
              <td>{el.start}&nbsp;</td>
              <td>{el.end}</td>
              <td >{el.title}</td>
            </tr>
          );
        })}
        </tbody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const WeekendsSetting = styled.div`
  width: 100%;
  font-size: 20px;
  line-height: 40px;
  & > label {
    margin: 3px;
  }
`;

const Table = styled.table`
  width: 100%;
  &>thead>tr, &>tbody>tr{
    width: 100%;
    &>td{
      width: 120px;
      &:last-child{
        text-align: left;
      }
    }
  }
`;

export default BottomBar;
