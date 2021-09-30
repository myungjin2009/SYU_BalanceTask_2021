import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

// import ProjectTermination from "../routes/ProjectTermination";
// import WorkerInvitation from "../routes/WorkerInvitation";

// 회원이 아닐 때
import FindingPW from "./views/FindingPWPage/FindingPW";
import Signup from "./views/SignupPage/Signup";
import Login from "./views/LoginPage/Login";

//회원일 때

//마이페이지
import MyPage from "./views/MyPagePage/MyPage";
import EditProfileMessage from "./views/MyPagePage/EditProfileMessage";
import EditProfileImage from "./views/MyPagePage/EditProfileImage";
import NoticePage from "./views/NoticePage/NoticePage";

//그룹검색 페이지
import GroupSearch from "./views/GroupSearchPage/GroupSearch";
import Detail from "./views/GroupSearchPage/Detail";
import CreateGroup from "./views/CreateGroupPage/CreateGroup";

//워커리스트 페이지
import WorkerList from "./views/WorkerListPage/WorkerList";

//설정페이지
import Settings from "./views/SettingPage/Settings";
import AppInfo from "./views/SettingPage/AppInfo";
import Contact from "./views/SettingPage/Contact";
import EditAccount from "./views/SettingPage/EditAccount";
import Withdraw from "./views/SettingPage/Withdraw";

//여기서부터는 자기가 속한 그룹만 들어갈 수 있음

//프로젝트 타임라인페이지
import ProjectTimeline from "./views/ProjectTimelinePage/ProjectTimeline";

//프로젝트 공지사항페이지
import ProjectNotice from "./views/ProjectNoticePage/ProjectNotice";

//프로젝트 타임라인과 공지사항에서 공통으로 사용하는 페이지
import PostBlockDetail from "./views/common/PostBlockDetail";
import CreatePost from "./views/CreatePostPage/CreatePost";

//그룹캘린더 페이지
import GroupCalendar from "./views/GroupCalendar/GroupCalendar";


//그룹챗 페이지
import GroupChat from './views/GroupChatPage/GroupChat';
//프론트엔드 개발 공간
import Prac from "./practice";
import MJPractice from './MJpractice';

//NotFound 페이지
import NotFound from "./views/NotFoundPage/NotFound";

const Router = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Auth(Login, false)} />
        <Route path="/signup" component={Auth(Signup, false)} />
        <Route path="/finding_password" component={Auth(FindingPW, false)}/>
        <Route path="/practice" component={Prac}/>
        <Route exact path = "/MJPractice" component = {Auth(MJPractice, true)} />
        <Route exact path="/my_page" component={Auth(MyPage, true)} />
        <Route exact path="/my_page/notice" component={Auth(NoticePage, true)} />
        <Route exact path="/editProfileMessage/:message" component={Auth(EditProfileMessage, true)} />
        <Route exact path="/editProfileImage" component={Auth(EditProfileImage, true)} />
        <Route
          exact
          path="/group_search"
          component={Auth(GroupSearch, true)}
        />
        <Route exact path="/create_group" component={Auth(CreateGroup, true)} />
        <Route exact path="/group_search/:team" component={Auth(Detail,true)}/>

        <Route exact path="/worker_list" component={Auth(WorkerList, true)} />

        <Route exact path="/:group/project_timeline" component={Auth(ProjectTimeline, true)} />
        <Route exact path="/:group/project_timeline/:index" component={Auth(PostBlockDetail, true)}/>
        <Route exact path="/:group/project_notice" component={Auth(ProjectNotice, true)} />
        <Route exact path="/:group/project_notice/:index" component={Auth(PostBlockDetail, true)}/>
        <Route exact path="/:group/group_calendar" component={Auth(GroupCalendar, true)} />
        <Route
          exact
          path="/:group/create_posts"
          component={Auth(CreatePost, true)}
        />
        <Route exact path="/:group/group_chat" component={Auth(GroupChat, true)} />

        <Route exact path="/settings" component={Settings} />
        <Route exact path="/settings/AppInfo" component={AppInfo} />
        <Route exact path="/settings/Contact" component={Contact} />
        <Route exact path="/settings/EditAccount" component={EditAccount} />
        <Route exact path="/settings/Withdraw" component={Withdraw} />
        
        
        {/* <Route path="/worker_invitation" component={WorkerInvitation} /> */}
        {/* <Route path="/project_termination" component={ProjectTermination} /> */}

        <Route exact component={Auth(NotFound, null)} />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
