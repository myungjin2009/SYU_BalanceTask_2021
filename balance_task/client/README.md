# front-end

# Kim MJ comfirmed♬
# Park GH comfirmed♬

## 역할 분담
1. 박건형: 로그인, 그룹 찾기페이지, 그룹찾기(눌렀을 때), 비밀번호 찾기, 캘린더, 프로젝트 현황 상세페이지
2. 김명진: 설정(SettingPage), 그룹만들기(CreateGroupPage), 마이페이지(MyPage), 
           내 워커 리스트(WorkerListPage), 그룹 채팅(GroupChatPage), 프로젝트 종료(FinishProjectPage), 게시물 만들기(CreatePostPage)

https://fontawesome.com/
=>아이콘
https://material.io/resources/color/#!/?view.left=0&view.right=0
=>색깔
https://fonts.google.com/
=>폰트

## 박건형의 일정
1. 로그인, 그룹 찾기페이지, 그룹찾기(눌렀을 때) => 7월 31일까지 state, ui 모두 해결하기
2. 비밀번호 찾기, 캘린더, 프로젝트 현황 상세페이지 -> 8월 10일까지 해보기
3. 이 과정을 다했다면, FCM과 progressive앱 신경쓰기(단, 팀원이 덜 되어 있을 경우에는 아주 조금만 도와주는 걸로 => 앞으로 나아가려면 많이 도와줄 수 없음)
4. 현재(8월 9일) 캘린더 페이지를 제외하고 모두 다 끝냄. 물론 그룹 찾기 페이지와 프로젝트 현황페이지에서 내리면 추가적으로 조회되는 기능은 못함

## 김명진의 일정
1. 페이지 UI, CSS 모두 완성하기 (70%) (8월 11일 까지)
2. UI에 맞는 기능(함수)구현, 라우트 (0%)

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

## redux 적용할 때 순서
1. 먼저 redux없이 해본다.
2. 기능상으로 페이지를 완성 했을 때 그 때 redux를 적용한다
3. _action폴더의 types.js에서 새로운 type을 만든다. 
4. _actions폴더에 새로운 기능의 action을 만든다. <br/>
또는 이미 그 기능 관련해서 ㅁㅁ_actions.js라고 만들어졌으면 그 파일 안에 액션크리에이터와 액션을 만든다. types.js 해당 타입을 import하는 거 잊지말기
5. 다 만들었으면 _reducers폴더에서 새로운 리듀서 파일을 만든다. <br/>
또는 이미 그 기능 관련해서 ㅁㅁ_reducer.js가 있다면 그 파일에서 switch문 안에 어떻게 액션을 처리할 건지 정한다.<br/>
새로운 기능의 reducer를 만드는 거라면 ㅇㅇ_reducer.js를 만들고 _reducer폴더의 index.js를 수정해주자<br/>
그냥 index.js에 import해서 만든 리듀서 불러와서 밑에 처럼 리듀서들을 합치면 된다.<br/>
const rootReducer = combineReducers({
  user, oo
});
6. 액션, 액션크리에이터와 리듀서 모두 다 끝냈다면 이제 이 redux를 어디서 사용할건지 페이지를 찾는다.
7. 그 페이지에서 dispatch함수를 사용한다. dispatch는 당연히 액션크리에이터함수를 품고 있어야한다.
8. 만약, rest api로 처리하는 부분이 액션크리에이터에 들어가 있다면 액션크리에이터를 처리하고 그 후에 어떻게 할건지 dispatch함수 뒤에 then을 사용해서 response를 받으면된다.

## 생각
1. 아직, 관리자 페이지를 만들지 못했다. 관리자 페이지에 무엇이 있을면 될까?
=> 그룹 찾기 페이지 삭제, 회원 관리, 그룹 관리