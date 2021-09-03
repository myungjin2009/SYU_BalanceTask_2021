import React from 'react';
import styled,{keyframes} from 'styled-components';
// import "./Modal.css";

const Modal = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = props;

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.

        <MyModal>
            <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section>
                    <header>
                        {header}
                        {/* <button className="close" onClick={close}> &times; </button> */}
                        <div className="close" onClick={close}>
                            <i class="fas fa-times"></i>
                        </div>
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                        <button className="close" onClick={close}> close </button>
                    </footer>
                </section>
            ) : null }
            </div>
        </MyModal>
    )
}

const modal_show = keyframes`
    from {
        opacity: 0;
        margin-top: -50px;
    }
    to {
        opacity: 1;
        margin-top: 0;
    }
`;

const modal_bg_show = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const MyModal = styled.div`
    & > .modal.openModal{
        display: flex;
        align-items: center;
        animation: ${modal_bg_show} .3s; 
    }
    & > .modal {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99;
        background-color: rgba(0, 0, 0, 0.6);
        & > button {
            outline: none;
            cursor: pointer;
            border: 0;
        }
        & > section {
            width: 90%;
            max-width: 450px;
            margin:0 auto;
            border-radius: .3rem;
            background-color: #fff;
            animation: ${modal_show} .3s;
            overflow: hidden;
    
            & > header {
                position: relative;
                padding: 16px 64px 16px 16px;
                background-color: #f1f1f1;
                font-weight: 700;
    
                & > .close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    width: 30px;
                    font-size: 21px;
                    font-weight: 700;
                    text-align: center;
                    color: #999;
                    background-color: transparent;
                }
            }
    
            
            & > main {
                padding: 16px;
                border-bottom: 1px solid #dee2e6;
                border-top: 1px solid #dee2e6;
            }
    
    
            & > footer {
                padding: 12px 16px;
                text-align: right;
                & > button {
                    padding: 0.5rem 1rem;  
                    font-size: 1rem;
                    text-align: center;
                    border: none;
                    border-radius: 4px;
                }
            }
        }
    }
`;

export default Modal;