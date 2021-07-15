import React from 'react';
import {Route, Link, BrowserRouter} from 'react-router-dom';
import Home from '../routes/Home';
const Router = () =>{
  return(
    <BrowserRouter>
      <Route path="/main">
        <header>제목</header>
      </Route>
      <Route exact path="/home" component={Home} />
    </BrowserRouter>
  )
}
export default Router;