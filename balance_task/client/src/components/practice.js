import React from 'react'
import Modal from './views/MyPagePage/Modal';

function Practice() {
  const[modalOpen, setModalOpen] = React.useState(false); 
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }     

  return (
    <div>
      <button onClick={openModal}>버튼</button>
      <Modal open={ modalOpen } close={ closeModal } header="Modal heading">
        테스트모달
      </Modal>
    </div>
  )
}

export default Practice
