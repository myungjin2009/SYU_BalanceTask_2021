import React, { useState } from 'react';
import {Route, Link, BrowserRouter} from 'react-router-dom';
import ProjectTimeline from '../routes/ProjectTimeline';
import GroupHeader from './GroupHeader';
import ProjectNotice from './ProjectNotice';



const Router = () =>{
  const [isTimeline, setIsTimeline] = useState(true);
  return(
    <BrowserRouter>
      <Route path = "/project_timeline">
        <GroupHeader isTimeline={isTimeline} setIsTimeline={setIsTimeline}/>
        <ProjectTimeline isTimeline={isTimeline}/>
      </Route>
    </BrowserRouter>
  )
}
export default Router;