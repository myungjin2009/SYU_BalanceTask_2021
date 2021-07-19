import React, { useState } from 'react';
import {Route, Link, BrowserRouter} from 'react-router-dom';
import AddingPosts from '../routes/AddingPosts';
import GroupChat from '../routes/GroupChat';
import ProjectTermination from '../routes/ProjectTermination';
import ProjectTimeline from '../routes/ProjectTimeline';
import WorkerCalendar from '../routes/WorkerCalendar';
import WorkerInvitation from '../routes/WorkerInvitation';
import GroupHeader from './GroupHeader';



const Router = () =>{
  const [isTimeline, setIsTimeline] = useState(true);
  return(
    <BrowserRouter>
      <Route exact path = "/project_timeline">
        <GroupHeader isTimeline={isTimeline} setIsTimeline={setIsTimeline}/>
        <ProjectTimeline isTimeline={isTimeline}/>
      </Route>
      <Route path = "/project_timeline/adding_posts" component={AddingPosts}/>
      <Route path = "/group_chat" component={GroupChat}/>
      <Route path = "/worker_calendar" component={WorkerCalendar}/>
      <Route path = "/worker_invitation" component={WorkerInvitation}/>
      <Route path = "/project_termination" component={ProjectTermination}/>
    </BrowserRouter>
  )
}
export default Router;