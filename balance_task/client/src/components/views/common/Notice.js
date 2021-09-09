import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notice(props) {
  const {text, handleOnClick} = props;
  const notify = () => toast(text);
  useEffect(()=>{
    notify();
  },[]);
  return (
    <div onClick={handleOnClick}>
      <ToastContainer />
    </div>
  )
}

Notice.defaultProps = { 
  text: '새로운 알림이 왔습니다.',
  handleOnClick: () =>{}
}

export default Notice;
