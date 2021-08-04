import React, { useState } from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

import AddingPosts from '../routes/AddingPosts';
import GroupChat from '../routes/GroupChat';
import ProjectTermination from '../routes/ProjectTermination';
import ProjectTimeline from './views/ProjectTimelinePage/ProjectTimeline';
import WorkerCalendar from '../routes/WorkerCalendar';
import WorkerInvitation from '../routes/WorkerInvitation';
import GroupHeader from './views/ProjectTimelinePage/GroupHeader';
import Settings from "./views/SettingPage/Setting";
import Sigunup from './views/SignupPage/Signup';
import Login from './views/LoginPage/Login';
import NotFound from './views/NotFoundPage/NotFound';
import MyPage from './views/MyPagePage/MyPage';
import GroupSearch from './views/GroupSearchPage/GroupSearch';
import Navigation from './views/Navigation/Navigation';

const Router = (props) =>{
  const [isTimeline, setIsTimeline] = useState(true);
  const [user, setUser] = useState('박건형');
  const [search, setSearch] = useState(null);
  const [isUser, setIsUSer] = useState(true);
  
  return(
    <BrowserRouter>
        {
          isUser ? 
          <Switch>
            <Route exact path = '/'>
              <MyPage/>
              <Navigation/>
            </Route>
            <Route exact path= "/group_search">
              <GroupSearch/>
              <Navigation/>
            </Route>
            <Route  exact path = '/worker_list'>
              <Navigation/>
            </Route>
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