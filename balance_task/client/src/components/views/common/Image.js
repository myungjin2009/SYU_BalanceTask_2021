import React from 'react'
import {withRouter} from 'react-router-dom';

function Image(props) {
  const {location:{state:{postimage}}} = props;
  const background = {
    width:"100vw", height: "100vh", background: "black", position: "absolute", top: 0
  }
  return (
    <>
      <div style={{width:"100vw", height: "100vh", display: "flex", alignItems: "center"}}>
        <img style={{width:"100%", zIndex: "10"}} src={postimage} />
      </div>
      <div style={background} onClick={()=>props.history.goBack()}>
      </div>
    </>
  )
}

export default withRouter(Image);
