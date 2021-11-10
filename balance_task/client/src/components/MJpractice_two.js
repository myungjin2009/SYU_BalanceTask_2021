import React from 'react';
import styled from 'styled-components';

const MJpractice_two = (props) => {
    
    const up = () => {
        props.getData(props.isNumber + 1);
    }

    return(
        <DDingJin>
            띵진이의 두번째 공간
            <button onClick={() => up()}>숫자올리기</button>
        </DDingJin>
    );
}

const DDingJin = styled.div`
    display : block;
    font-size: 100px;
`;


export default MJpractice_two;