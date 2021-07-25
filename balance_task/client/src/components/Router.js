import React, { useState } from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import AddingPosts from '../routes/AddingPosts';
import GroupChat from '../routes/GroupChat';
import ProjectTermination from '../routes/ProjectTermination';
import ProjectTimeline from '../routes/ProjectTimeline';
import WorkerCalendar from '../routes/WorkerCalendar';
import WorkerInvitation from '../routes/WorkerInvitation';
import GroupHeader from './GroupHeader';
import Settings from "../routes/Setting";
import Sigunup from '../routes/Signup';
import Login from '../routes/Login';
import NotFound from '../routes/NotFound';
import MyPage from '../routes/MyPage';

const Router = (props) =>{
  const [isTimeline, setIsTimeline] = useState(true);
  const [user, setUser] = useState('박건형');
  const [search, setSearch] = useState(null);
  const [isUser, setIsUSer] = useState(false);
  
  return(
    <BrowserRouter>
        {
          isUser ? 
          <Switch>
            <Route exact path = '/' component={MyPage}/>
            <Route exact path = "/project_timeline">
              <GroupHeader search={search} setSearch={setSearch} isTimeline={isTimeline} setIsTimeline={setIsTimeline}/>
              <ProjectTimeline search={search} user={user} isTimeline={isTimeline}/>
            </Route>
            <Route path = "/project_timeline/adding_posts" component={AddingPosts}/>
            <Route path = "/group_chat" component={GroupChat}/>
            <Route path = "/worker_calendar" component={WorkerCalendar}/>
            <Route path = "/worker_invitation" component={WorkerInvitation}/>
            <Route path = "/project_termination" component={ProjectTermination}/>
            <Route path = "/setting" component={Settings}/>
            <Route path = "/signup" component={Sigunup}/>
            <Route exact component={NotFound}/>
          </Switch>:
          <Switch>
            <Route exact path = '/' component={Login}/>
            <Route exact component={NotFound}/>
          </Switch>
        }
    </BrowserRouter>
  )
}
export default Router;