const JERRY_COUNT = 5;
const CHEESE_COUNT = 5;
const ITEM_SIZE = 70;


const itemList = Object.freeze({
  jerry : "jerry",
  cheese : "cheese"
});

const scoreField = document.querySelector('.field__ButtonScore');
const gameBtn = document.querySelector('.gameBtn');
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

//let start = false;
let timer = undefined;
let score = JERRY_COUNT;
const gameDuration = 10;


startBtn.addEventListener('click',()=>{
  startGame();
})


function startGame(){
  popupHide(firstScene); //가장 첫 스타트 화면을 지운다.
  showScoreTimerField(); //점수, 정지버튼, 타이머를 보여준다.
  initGame();
}

//popUpList : firstPopUp & refreshPopUp
function popupHide(node){
  node.classList.add('popUp--hide');
}

function showScoreTimerField(){ 
  scoreField.classList.remove('game--hide');
  startTimer();
  showScore();
}

function startTimer(){
  let remainingSec = gameDuration; //시간 초기화
  showRemainingTime(remainingSec);
  timer = setInterval(()=>{
    if (remainingSec<=0) return;
    showRemainingTime(--remainingSec);
  },1000);
}

function showRemainingTime(time){
  const minute = Math.floor(time/60);
  const sec = Math.floor(time%60);
  gameTimer.innerText = `${String(minute).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
}

function showScore(){
  gameScore.innerText = score;
}

//필드에 아이템 생성
function initGame(){
  addItem(itemList.jerry, JERRY_COUNT);
  addItem(itemList.cheese, CHEESE_COUNT);
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