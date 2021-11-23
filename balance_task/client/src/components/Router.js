import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

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

//점수(evaluation score) 페이지
import ScorePage from "../components/views/ScorePage/Score";

//그룹검색 페이지
import GroupSearch from "./views/GroupSearchPage/GroupSearch";
import Detail from "./views/GroupSearchPage/Detail";
import CreateGroup from "./views/CreateGroupPage/CreateGroup";
import UpdateGroup from "./views/UpdateGroupPage/UpdateGroup";

//워커리스트 페이지
import WorkerList from "./views/WorkerListPage/WorkerList";

//설정페이지
import Settings from "./views/SettingPage/Settings";
import AppInfo from "./views/SettingPage/AppInfo";
import Contact from "./views/SettingPage/Contact";
import EditAccount from "./views/SettingPage/EditAccount";
import Withdraw from "./views/SettingPage/Withdraw";


/*여기서부터는 자기가 속한 그룹만 들어갈 수 있음*/

// 그룹 종료 페이지
import GroupEvaluation from "./views/GroupEvaluationPage/GroupEvaluation";

//프로젝트 타임라인페이지
import ProjectTimeline from "./views/ProjectTimelinePage/ProjectTimeline";

//프로젝트 공지사항페이지
import ProjectNotice from "./views/ProjectNoticePage/ProjectNotice";

//프로젝트 타임라인과 공지사항에서 공통으로 사용하는 페이지
import PostBlockDetail from "./views/common/PostBlockDetail";
import CreatePost from "./views/CreatePostPage/CreatePost";

//게시물 수정하기, 타임라인 공지사항 공통 페이지
import EditPost from './views/common/editPost';

//그룹캘린더 페이지
import GroupCalendar from "./views/GroupCalendar/GroupCalendar";


//그룹챗 페이지
import GroupChat from './views/GroupChatPage/GroupChat';

//프론트엔드 개발 공간
import Prac from "./practice";
import MJPractice from './MJpractice';

//NotFound 페이지
import NotFound from "./views/NotFoundPage/NotFound";
import Image from "./views/common/Image";

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
        <Route exact path="/Score" component={Auth(ScorePage, true)} />
        <Route
          exact
          path="/group_search"
          component={Auth(GroupSearch, true)}
        />
        <Route exact path="/create_group" component={Auth(CreateGroup, true)} />
        <Route exact path="/group_search/:team" component={Auth(Detail,true)}/>

        <Route exact path="/worker_list" component={Auth(WorkerList, true)} />
        <Route exact path="/group_search/edit_post/:group" component={Auth(UpdateGroup, true)} />

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
        <Route exact path="/:group/project_timeline/:index/editPost" component={Auth(EditPost, true)} />
        <Route exact path="/:group/project_notice/:index/editPost" component={Auth(EditPost, true)} />
        <Route exact path="/:group/group_chat" component={Auth(GroupChat, true)} />
        {/* 해당 그룹이 있으며 isComplete: true만 들어갈 수 있게 */}
        <Route exact path="/my_page/evaluation/:group" component={Auth(GroupEvaluation, true)} />

        <Route exact path="/settings" component={Auth(Settings, true)} />
        <Route exact path="/settings/AppInfo" component={Auth(AppInfo, true)} />
        <Route exact path="/settings/Contact" component={Auth(Contact, true)} />
        <Route exact path="/settings/EditAccount" component={Auth(EditAccount, true)} />
        <Route exact path="/settings/Withdraw" component={Auth(Withdraw, true)} />
        <Route exact path="/image/:image_name" component={Auth(Image, true)} />

        <Route exact component={Auth(NotFound, null)} />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
