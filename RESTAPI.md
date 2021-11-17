# 규칙
## 설명
- 먼저 그 페이지를 개발하는 사람이 REST API 짜기
- REST API를 짜면 무조건 여기에 업데이트 해주기
- REST API를 짤 때는 url을 명사과 소문자에 '_' 형식으로 만들어주기
- url은 꼭 의미 있게 쓰기

## 방식
- 적용할 페이지
- REST API 내용과 무슨 method를 사용하는지
- 누가 REST API를 썼는지 이름 쓰기
- 필요한 경우는 주석 쓰기

# REST API 
## < USER >

## 인증 - 작성자: 박건형
  /api/user/auth => method: get
  #### 설명: jwt로 하는 경우(id와 secret key가 결합) 로그인 했을 때 client는 jwt를 갖고 있고,
  ####       데이터 베이스도 jwt를 갖고 있다. 결국 jwt와 secret key만 있으면 해독된 id를 가지고 사용자인지 아닌지 매번 비교하면서
  ####       웹앱을 사용하는 사람이 우리의 유저인지 아닌지 알 수 있다. 
  #### 위치: _actions/user_actions.js => hoc/auth.js에서 사용하며 모든 컴포넌트는 auth.js를 지나 인증받는다. 



## 로그인페이지 - 작성자: 박건형
  /api/user/login => method: post
  #### 설명: 회원정보 비교하기, post로 한 이유는 중요한 정보니까
  /api/kakao_user => method: post 
  #### 설명: 카카오 회원 정보 가져오기, post로 한 이유는 중요한 정보니까

  
  
## 회원가입페이지 - 작성자: 박건형
  /api/user_email => method: post
  #### 설명: 이메일을 서버로 보내기, 이메일을 서버로 보내서 서버는 nodemailer를 사용해서
  ####       그 이메일 사용자에게 인증번호를 보내야하니까
  /api/signup => method: post
  #### 설명: 회원정보 데이터베이스에 넣기, 중요한 정보니까 post
  

## 비밀번호 찾기페이지 - 작성자: 박건형
  /api/user_email => method: post
  #### 설명: 이메일을 서버로 보내기, 이메일을 서버로 보내서 서버는 nodemailer를 사용해서
  ####       그 이메일 사용자에게 인증번호를 보내야하니까
  /api/user/check_id => method: post
  #### 설명: 이메일로 회원 아이디 찾기, 회원 아이디 찾는 거니 회원 이름, 이메일, 아이디를 서버로 보내야함
  /api/user/changing_password => method: post
  #### 설명: 바뀐 비밀번호를 서버로 보낸다. 서버에서는 데이터베이스 업데이트 해야함

## 설정 페이지 - 작성자: 박건형
  /api/user/logout => method: get
  #### 설명: 사용자 로그아웃 서버에 요청
  #### 위치: views/SettingPage/Setting.js

## 마이페이지 - 작성자: 김명진
  /api/user/receive_mypage => method: post
  #### 설명 : 사용자의 프로필(별명,사진,가입된 프로젝트) 보여주기 위한 정보 불러오기
  ####        사용자 정보를 서버에 보내야 하니깐
  /api/user/update_mypage/message => method: post
  #### 설명 : 사용자의 프로필 메시지 업데이트
  ####        사용자의 프로필 메시지를 보냄.
  /api/user/update_mypage/photo => method: post
  #### 설명 : 사용자의 프로필 이미지 업데이트
  ####        사용자의 프로필 이미지를 보냄. NULL을 보내면 서버에서는 기본이미지로 받아들임
  
## 워커리스트 - 작성자: 김명진
  /api/user/load_worker => method: post
  #### 설명 : 사용자의 워커리스트 불러오기
  
## 알림페이지 - 작성자: 박건형
  /api/user/notice/confirm => method: post
  #### 설명 : 사용자가 알림 요청을 확인한다는 것
  /api/user/notice/reject => method: post
  #### 설명 : 사용자가 알림 요청에 대해 거절한다는 것

## < GROUP SEARCH >

## 그룹 찾기 페이지 - 작성자: 박건형
  /api/group/search_card => method: post
  #### 요청페이로드: {last_number, date}
  #### last_number는 게시물의 마지막 번호를 말함 / date는 오늘 날짜를 보내줘서 지난 것은 버리기
  #### 설명: 현재의 그룹 카드의 마지막 번호를 서버에 보내고 서버에서 가공한(몇 개의) 그룹 찾기 카드들 가져오기

## 그룹 찾기 페이지(Detail) - 작성자: 박건형
  /api/group/participation => method: post
  #### 설명: 해당 그룹에 참여 요청하기
  #### 위치: views/GroupSearchPage/Detail.js

## 그룹 만들기 페이지 - 작성자: 박건형
  /api/group/create_group => method: post
  #### 설명: 그룹 만들기에 필요한 양식을 작성 후 서버에 요청
  #### 위치: views/CreateGroupPage/CreateGroup.js

## < PROJECT POSTS >

## 프로젝트 현황페이지 - 작성자: 박건형
  /api/group/timeline => method: post
  #### 설명: timeline 정보 가져오기
  /api/group/notice => method: post
  #### 설명: notice 정보 가져오기
  /api/group/vote =>method: post
  #### 설명:  게시물 투표하기
  #### 위치: views/GroupSearchPage/

## 그룹 게시물 추가 페이지 - 작성자: 박건형
  /api/group/post => method: post
  #### 설명: 그룹 게시물을 올리기에 필요한 양식을 작성후 서버에 요청
  #### 위치: views/CreatePostPage/CreatePost.js

## < GROUP CALENDAR >

## 그룹 캘린더 페이지 - 작성자: 박건형
  /api/group_calendar/add_date => method: post
  #### 설명: 해당 날짜에 무슨 일을 할 건지 추가
  /api/group_calendar/date => method: post
  #### 설명: 그룹 캘린더 화면으로 이동시 데이터 달력에 있는 할 일 데이터를 가져옴
  /api/group_calendar/update_date => method: post
  #### 설명: 해당 그룹 캘린더에서 할 일 수정하기
  /api/group_calendar/delete_date => method: post
  #### 설명: 해당 그룹 캘린더에서 할 일 삭제하기
  #### 위치: views/GroupCalendar/

## < WOKER INVITATION >

## 페이지는 따로 없고, project_timeline 이나 project_notice 페이지에서 실행됨 - 작성자 박건형
  /api/group/member => method: post
  #### 요청 페이로드: {group, id}
  #### 응답 페이로드: {success, group_members, isLeader}
  #### group은 그룹이름이다.
  #### group_members:[{id, name} .... ], isLeader:boolean isLeader를 통해서 그룹에 들어가 있는 나 자신이 리더인지 리더가 아닌지 판별
  #### 설명: 해당 그룹에 누가 있는지 데이터를 받아온다.
  #### 위치: [GroupHeader](/balance_task/client/src/components/views/common/GroupHeader.js)
  
##  이 api는 GroupHeader에서의 api가 먼저 실행이 된 후 사용자가 워커 추가 이벤트를 발생시기키면 실행된다. - 작성자: 박건형
  /api/user/add_worker => method: post
  #### 요청 페이로드: {[{id, name},{id, name},{id, name}]}
  #### 응답 페이로드: {success}
  #### 이 api를 사용하는 유저의 토큰을 이용해서 id와 name 딕셔너리로 유저에 워커리스트에 추가하기
  #### 설명: 해당 그룹에서 같이 계속 작업하고 싶은 사람을 워커 리스트에 추가할 수 있다.
  #### 위치: [AddWorker](/balance_task/client/src/components/views/HidingMenu/AddWorker.js)

## < PROJECT END(PROJECT EVALUATION) >
  
## 그룹 평가 페이지 - 작성자 박건형
  /api/group/evaluation => method: post
  #### 요청 페이로드: {app_evaluatuon, members_evaluation, group}
  #### app_evaluatuon = {evalutation, point} 이 api를 보낸 유저가 이 웹앱을 평가한 데이터
  #### members_evaluation = [{evaluation, point, id, name},{evaluation, point, id, name}] 이 api를 보낸 유저가 다른 유저를 평가한 데이터
  #### group는 그룹
  #### 설명: 해당 그룹에서 프로젝트가 끝났을 때 유저들 간에 평가 할 수 있고, 알림을 통해 들어가서 평가 가능하다.
  /api/group/completion => method: post 
  #### 요청 페이로드: {group}
  #### 응답 페이로드: {success, group_completion} 
  #### success / group_completion=[{group}] 
  #### 설명: 방장이 프로젝트 완료했다고 누르면 그 팀원들 모두에게 알림이 가서 프로젝트 종료 페이지로 갈 수 있도록 도와준다.
  /api/group/alert_message => method: post
  #### 요청 페이로드: {group_members, send_user_id, group}
  #### 응답 페이로드: {success}
  #### group_members=[{id, name}], send_user_id 보낸 이의 아이디, group은 그룹이름
  #### 위치: [ProjectEnd](/balance_task/client/src/components/views/ProjectEvaluationPage/ProjectEvaluation.js)
