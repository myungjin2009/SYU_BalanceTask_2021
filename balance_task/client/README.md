# front-end

# Kim MJ comfirmed♬
# Park GH comfirmed♬

## 역할 분담
1. 박건형: 로그인, 그룹 찾기페이지, 그룹찾기(눌렀을 때), 아이디 찾기, 비밀번호 찾기, 캘린더, 프로젝트 현황 상세페이지
2. 김명진: 그룹만들기, 마이페이지, 내 워커 리스트, 그룹 채팅, 프로젝트 종료, 게시물 만들기

https://fontawesome.com/
=>아이콘
https://material.io/resources/color/#!/?view.left=0&view.right=0
=>색깔
https://fonts.google.com/
=>폰트

## 박건형의 일정
1. 로그인, 그룹 찾기페이지, 그룹찾기(눌렀을 때) => 7월 31일까지 state, ui 모두 해결하기
2. 아이디 찾기, 비밀번호 찾기, 캘린더, 프로젝트 현황 상세페이지 -> 8월 10일까지 해보기
3. 이 과정을 다했다면, FCM과 progressive앱 신경쓰기(단, 팀원이 덜 되어 있을 경우에는 아주 조금만 도와주는 걸로 => 앞으로 나아가려면 많이 도와줄 수 없음)

## 폴더 구성
### ※ routes 폴더 사용 안할거임
1. client: client측의 루트 폴더

2. src: 웹팩 영향이 있는 폴더

3. _actions: redux의 action들이 있는 곳, 그리고 action creator이 있음. <br/> 
파일의 종류로는 기능이 있는 action과 type들이 있는 js파일로 구성

4. _reducers: rudex의 reducer들이 있는 곳. <br/> 
파일의 종류로는 어떤 기능을 처리 해주는 reducer와 reducer들을 묶는 index.js가 있다.

5. components: 컴포넌트들이 있는 곳.

6. views: 페이지가 될 컴포넌트가 있는 것, 안에는 각각 페이지 폴더들이 있다.

7. hoc(higher order component): 여러 군데에서 쓰일수 있는 것들을 이곳에 넣어서 어디서든 쓸 수 있게 해준다. <br/>
유저인지 유저가 아닌지 판단해서 페이지를 달리 보여준다. 
8. utils에 중복해서 사용하는 것들이나 이미지를 넣으면 될듯?

9. hook은 재사용 가능한 함수들의 모임이라고 보면된다. 