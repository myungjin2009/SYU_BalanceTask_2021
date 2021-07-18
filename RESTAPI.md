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
## 로그인페이지 - 작성자: 박건형
  /api/user => method: post
  #### 설명: 회원정보 비교하기, post로 한 이유는 중요한 정보니까
  /api/kakao_user => method: post 
  #### 설명: 카카오 회원 정보 가져오기, post로 한 이유는 중요한 정보니까

  
  
## 회원가입페이지 - 작성자: 박건형
  /api/user_email => method: get
  #### 설명: 이메일을 서버로 보내기, 이메일을 서버로 보내서 서버는 nodemailer를 사용해서
  ####       그 이메일 사용자에게 인증번호를 보내야하니까
  /api/signup => method: post
  #### 설명: 회원정보 데이터베이스에 넣기, 중요한 정보니까 post



## 아이디 찾기페이지 - 작성자: 박건형
  /api/user_email => method: post
  #### 설명: 이메일을 서버로 보내기, 이메일을 서버로 보내서 서버는 nodemailer를 사용해서
  ####       그 이메일 사용자에게 인증번호를 보내야하니까
  /api/check_user => method: post
  #### 설명: 이메일로 회원 아이디 찾기, 회원 아이디 찾는 거니 회원 이름과 이메일을 서버로 보내야함
 
 

## 비밀번호 찾기페이지 - 작성자: 박건형
  /api/user_email => method: post
  #### 설명: 이메일을 서버로 보내기, 이메일을 서버로 보내서 서버는 nodemailer를 사용해서
  ####       그 이메일 사용자에게 인증번호를 보내야하니까
  /api/check_user_id => method: post
  #### 설명: 이메일로 회원 아이디 찾기, 회원 아이디 찾는 거니 회원 이름, 이메일, 아이디를 서버로 보내야함
  /api/change_password => method: post
  #### 설명: 바뀐 비밀번호를 서버로 보낸다. 서버에서는 데이터베이스 업데이트 해야함



## 프로젝트 현황페이지 - 작성자: 박건형
  /api/posts => method: get
  #### 설명: 게시물들 정보 가져오기
  /api/vote =>method: post
  #### 설명:  게시물 투표하기
