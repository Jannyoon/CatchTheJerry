# 바닐라 JS로 클릭형 게임 만들기

https://zesty-empanada-3d3cde.netlify.app/
<hr>

## 실행 이미지
![image](https://github.com/Jannyoon/CatchTheJerry/assets/149743716/2686f7ad-4557-48fd-bfbd-4cda32204e1e)
![image](https://github.com/Jannyoon/CatchTheJerry/assets/149743716/1dcc8df5-73ed-4fe2-9cb0-6265d3b04ebc)
![image](https://github.com/Jannyoon/CatchTheJerry/assets/149743716/3f189ff8-bfb9-4967-96dd-cc7da6b57d24)
![image](https://github.com/Jannyoon/CatchTheJerry/assets/149743716/8023c36e-aa90-4cab-8d32-cafcc2c2e52f)


<hr>

## 초기화면 
- popUp first__scene => 보여지고 있는 상태
- popUp refresh__scene => hide 되어 있음
- 게임버튼, 스코어, 타이머 => visuality : hidden 되어 있을 것
<br>

### 사용자가 start 버튼을 누르면?
1. popUp first__scene에 classList.add(popUp--hide) 될 것 => popUpHide 함수 필요
2. 게임의 스코어와 게임 버튼(pause, restart), 타이머가 보여져야 함 =>showScoreTimerField();
3. 아이템 배치 : initGame()
<br>

### 점수와 타이머가 보여지고 나면? 
showScoreTimerField()가 하는 일
1. 타이머 시작
2. 점수 & 타이머 & 일시정지 버튼 화면 표기
<br>


### 타이머가 시작되면?startTimer()
- 실시간으로 duration이 감소한다.
- 현재 스코어를 화면에 보여줘야 한다.
<br>


### 아이템 클릭 : 이벤트 위임 이용
- gameField. event.target 사용
- onItemClick 함수 이용
<br>


### 일시정지, 재개 구현
- gameBtn.addEventListener('click'을 이용)
- 현재 gaming 상태를 활용.

1. gaming 상태에서 gameBtn을 누를 경우 재생으로 icon 바뀜
2. state : "pause"로 바꿈
3. stopTimer 함수 실행
4. 일시정지 상태에선 item들이 보이지 않아야 함
<br>


### stop 게임 구현
1. 쥐가 아닌 치즈를 눌렀을 때 게임이 정지되어야 한다.
그 전에 (score===제리숫자)면 stopGame('success') 전달한다.

2. 시간이 모두 종료되었을 때 : 스코어와 제리 숫자 비교<br>
2-1. 같으면 성공 =>인수 : success<br>
2-2. 틀리면 실패 : 인수 : fail<br>
<br>

### 게임이 종료하면 발생할 일
- state = 'end'
- 타이머 종료
- 게임스코어 사라짐
- 게임 필드 아이템 사라짐
- 리프레쉬 팝업 등장
<br>


### 리프레쉬 버튼을 클릭했을 때
- 리프레쉬 팝업 숨겨짐 
- state가 'gaming'일 땐 startScene이 숨겨지지만 'end'일 땐 refreshScene이 숨겨지도록 수정한다.
1. popUp first__scene에 classList.add(popUp--hide) 될 것 => popUpHide 함수 필요
2. 게임의 스코어와 게임 버튼(pause, restart), 타이머가 보여져야 함 =>showScoreTimerField();
3. 아이템 배치 : initGame()
<br>

### sound 파일삽입
- module 활용
