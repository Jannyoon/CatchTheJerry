const JERRY_COUNT = 5;
const CHEESE_COUNT = 5;
const ITEM_SIZE = 70;

const itemList = Object.freeze({
  jerry : "jerry",
  cheese : "cheese"
});

const resultList = Object.freeze({
  success : 'SUCCESS!',
  fail : 'REGAME?'
})

const scoreField = document.querySelector('.field__ButtonScore');
const gameBtn = document.querySelector('.gameBtn');
const icon = document.querySelector('.fa-solid');
const gameTimer = document.querySelector('.gameTimer');
const gameScore = document.querySelector('.gameScore');

const gameField = document.querySelector('.field__MouseCheese');
const gameFieldSize = gameField.getBoundingClientRect();
const gameFieldWidth = gameFieldSize.width-ITEM_SIZE;
const gameFieldHeight = gameFieldSize.height-ITEM_SIZE-25;

const firstScene = document.querySelector('.first__scene');
const startBtn = document.querySelector('.startBtn');

const refreshScene = document.querySelector('.refresh__scene');
const refreshBtn = document.querySelector('.refreshBtn');
const refreshHover = document.querySelector('.hover');

let state = 'gaming';
let timer = undefined;
let score = 0;
const gameDuration = 10;
let remainingSec = null;

startBtn.addEventListener('click',()=>{
  startGame();
})

//일시정지 & 재개 구현
gameBtn.addEventListener('click',()=>{
  if (state==='gaming'){
    state = 'pause';
    icon.classList.add('fa-play');
    icon.classList.remove('fa-pause');
    stopTimer();
    hideGame();
  }
  else if (state==='pause'){
    state='gaming';
    icon.classList.add('fa-pause');
    icon.classList.remove('fa-play');
    showGame();
    startTimer();
  }
})

gameField.addEventListener('click',(event)=>{
  if (state!=='gaming') return;
  onItemClick(event);
})


refreshBtn.addEventListener('click',()=>{
  startGame();
})

function startGame(){
  score = 0;
  timer = undefined;
  
  state==='gaming' ?
  hidePopup(firstScene) :
  hidePopup(refreshScene);
   //가장 첫 스타트 화면을 지운다.

  state='gaming';
  showScoreTimerField(); //점수, 정지버튼, 타이머를 보여준다.
  showGame();
  initGame();
}

function stopGame(result){
  state = 'end';
  remainingSec = null; //남은 시간 초기화
  stopTimer();
  hideScoreTimerField();
  hideGame();
  showPopup(refreshScene, result);
}

//popUpList : firstPopUp & refreshPopUp
function showPopup(node, result){
  node.classList.remove('popUp--hide');
  updatePopupText(result);
}


function updatePopupText(text){
  refreshBtn.innerText = text;
}

function hidePopup(node){
  node.classList.add('popUp--hide');
}



function showScoreTimerField(){ 
  scoreField.classList.remove('game--hide');
  startTimer();
  showScore();
}

function hideScoreTimerField(){ 
  scoreField.classList.add('game--hide');
  stopTimer();
}


function startTimer(){
  if (remainingSec===null) remainingSec = gameDuration; //시간 초기화
  showRemainingTime(remainingSec);
  timer = setInterval(()=>{
    if (score===JERRY_COUNT){
      stopGame(resultList.success);
      return;
    }
    if (remainingSec<=0){
      score===JERRY_COUNT ?
      stopGame(resultList.success):
      stopGame(resultList.fail);
      return;
    }
    showRemainingTime(--remainingSec);
  },1000);
}

function stopTimer(){
  clearInterval(timer);
}


function showGame(){
  gameField.classList.remove('game--hide');
}

function hideGame(){
  gameField.classList.add('game--hide');
}


function showRemainingTime(time){
  const minute = Math.floor(time/60);
  const sec = Math.floor(time%60);
  gameTimer.innerText = `${String(minute).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
}

function showScore(){
  gameScore.innerText = JERRY_COUNT-score;
}


//필드에 아이템 생성
function initGame(){
  gameField.innerHTML='';
  addItem(itemList.jerry, JERRY_COUNT);
  addItem(itemList.cheese, CHEESE_COUNT);
}

function onItemClick(e){
  const target = e.target;
  if (target.matches(`.${itemList.jerry}`)){
    score++;
    target.remove();
    showScore(); //점수 실시간으로 update함
    console.log("제리");
  }
  else if (target.matches(`.${itemList.cheese}`)){
    stopGame(resultList.fail);
    console.log("치즈");
  }

}


//아이템명과 아이템 횟수를 받아온다.
function addItem(item, itemCount){
  for (let i=0; i<itemCount; i++){
    const newItem = document.createElement('img');
    newItem.setAttribute('class', `item ${item}`); //class='jerry'
    newItem.setAttribute('src',`./img/${item}.png`)
   
    newItem.style.left = `${randomPosition(0, gameFieldWidth)}px`;
    newItem.style.top = `${randomPosition(0,gameFieldHeight)}px`;
    newItem.style.position="absolute";
    gameField.appendChild(newItem); 
    console.log('생성');
  }

}


function randomPosition(min, max) {
  return Math.random() * (max - min) + min;
}