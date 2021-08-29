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
  /api/user => method: post
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
  /api/user/change_password => method: post
  #### 설명: 바뀐 비밀번호를 서버로 보낸다. 서버에서는 데이터베이스 업데이트 해야함


## 마이페이지 - 작성자: 김명진
  /api/user/receive_mypage => method: post
  #### 설명 : 사용자의 프로필(별명,사진,가입된 프로젝트) 보여주기 위한 정보 불러오기
  ####        사용자 정보를 서버에 보내야 하니깐
  

## < GROUP >

## 그룹 찾기 페이지 - 작성자: 박건형
  /api/group/search_card => method: post
  #### 설명: 현재의 그룹 카드의 마지막 번호를 서버에 보내고 서버에서 가공한(몇 개의) 그룹 찾기 카드들 가져오기


## 그룹 찾기 페이지(Detail) - 작성자: 박건형
  /api/group/participation => method: post
  #### 설명: 해당 그룹에 참여 요청하기
  #### 위치: views/GroupSearchPage/Detail.js


## 프로젝트 현황페이지 - 작성자: 박건형
  /api/group/timeline => method: post
  #### 설명: timeline 정보 가져오기
  /api/group/notice => method: post
  #### 설명: notice 정보 가져오기
  /api/group/vote =>method: post
  #### 설명:  게시물 투표하기
  #### 위치: views/GroupSearchPage/

## 그룹 만들기 페이지 - 작성자: 박건형
  /api/group/create_group => method: post
  #### 설명: 그룹 만들기에 필요한 양식을 작성 후 서버에 요청
  #### 위치: views/CreateGroupPage/CreateGroup.js


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


