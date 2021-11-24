import styled,{keyframes} from 'styled-components'

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const BounceAnimation = keyframes`
  0% { 
    margin-bottom: 0; 
  }

  50% { 
    margin-bottom: 3rem;
  }

  100% { 
    margin-bottom: 0;
  }
`

export const Dot = styled.div`
  background-color: white;
  border-radius: 50%;
  width: 0.75rem;
  height: 0.75rem;
  margin: 4vh 0.5vh 0 0.5vh;
  /*Animation*/
  animation: ${BounceAnimation} 1.5s linear infinite;
  animation-delay: ${(props) => props.delay};
  `

