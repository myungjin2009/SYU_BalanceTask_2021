import React, { useState } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

import AddingPosts from "../routes/AddingPosts";
import GroupChat from "../routes/GroupChat";
import ProjectTermination from "../routes/ProjectTermination";
import ProjectTimeline from "./views/ProjectTimelinePage/ProjectTimeline";
import WorkerCalendar from "../routes/WorkerCalendar";
import WorkerInvitation from "../routes/WorkerInvitation";
import Settings from "./views/SettingPage/Setting";
import Signup from "./views/SignupPage/Signup";
import Login from "./views/LoginPage/Login";
import NotFound from "./views/NotFoundPage/NotFound";
import MyPage from "./views/MyPagePage/MyPage";
import GroupSearch from "./views/GroupSearchPage/GroupSearch";
import WorkerList from "./views/WorkerListPage/WorkerList";
import Detail from "./views/GroupSearchPage/Detail";
import FindingPW from "./views/FindingPW/FindingPW";
// import Prac from "./practice";

const Router = (props) => {
  const [isTimeline, setIsTimeline] = useState(true);
  const [user, setUser] = useState("박건형");
  const [search, setSearch] = useState(null);
  const [isUser, setIsUSer] = useState(false);
  
  return(
    <BrowserRouter>
      {isUser ? (
        <Switch>
          <Route exact path="/" component={Auth(MyPage, true)} />
          <Route
            exact
            path="/group_search"
            component={Auth(GroupSearch, true)}
          />
          <Route exact path="/group_search/:team" component={Auth(Detail,true)}/>
          <Route exact path="/worker_list" component={Auth(WorkerList, true)} />
          <Route
            exact
            path="/project_timeline"
            render={() => (
              <ProjectTimeline
                search={search}
                user={user}
                isTimeline={isTimeline}
                setSearch={setSearch}
                setIsTimeline={setIsTimeline}
              />
            )}
          />
          <Route
            path="/project_timeline/adding_posts"
            component={AddingPosts}
          />
          <Route path="/group_chat" component={GroupChat} />
          <Route path="/worker_calendar" component={WorkerCalendar} />
          <Route path="/worker_invitation" component={WorkerInvitation} />
          <Route path="/project_termination" component={ProjectTermination} />
          <Route path="/setting" component={Settings} />
          <Route exact component={Auth(NotFound, null)} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Auth(Login, false)} />
          <Route path="/signup" component={Auth(Signup, false)} />
          <Route path="/finding_password" component={Auth(FindingPW, false)}/>
          {/* <Route path="/practice" component={Prac}/> */}
          <Route exact component={Auth(NotFound, null)} />
        </Switch>
      )}
    </BrowserRouter>
  );
};
export default Router;
