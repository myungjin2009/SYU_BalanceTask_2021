import React from "react";
import styled from "styled-components";

function BottomBar({ dayData, setIsWeekends }) {
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
      <table>
        {dayData.map((el, i) => {
          return (
            <tr key={i}>
              <td>{el.start}&nbsp;</td>
              <td>{el.title}</td>
            </tr>
          );
        })}
      </table>
    </Container>
  );
}

const Container = styled.div`
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

export default BottomBar;
