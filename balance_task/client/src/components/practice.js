import React from 'react'
import Modal from './views/MyPagePage/Modal';
import styled from 'styled-components';

function Practice() {

  return (
    <Container>
      <label className="input_file_button" for="input_file">
        업로드
      </label>
<<<<<<< HEAD
      <input type="file" id="input_file" style={{display:"none"}} accept='image/*' name='file' />
=======
      <input type="file" id="input_file" style={{display:"none"}} accept='image/*' name='file'/>
>>>>>>> 08d87a6ab284de53cade3569a893493ba919c246
    </Container>
  );
}
// CSS

const Container = styled.div`
  & > .input_file_button {
    padding: 6px 25px;
    background-color:#FF6600;
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }
`;

export default Practice
