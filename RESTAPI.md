# 규칙
## 설명
- 먼저 그 페이지를 개발하는 사람이 REST API 짜기
- REST API를 짜면 무조건 여기에 업데이트 해주기
## 방식
- 적용할 페이지
- REST API 내용과 무슨 method를 사용하는지
- 필요한 경우는 주석 쓰기

# REST API 
## 로그인페이지
  /api/user => method: post, 
  /api/kakao_user => method: post 
  
## 회원가입페이지
  /api/user_email => method: post,
  /api/signup => method: post

## 아이디 찾기페이지
  /api/user_email => method: post, 
  /api/finding_password => method: post, 
  /api/password_changing => method: post