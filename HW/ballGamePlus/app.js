// 獲取相關元素
const gameArea = document.getElementById('game-area'); //遊戲窗格範圍
const startButton = document.getElementById('start-button');
const gameInfo = document.getElementById('game-info');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');

// 設定遊戲時間（秒）
const gameDuration = 60;

// 遊戲是否正在進行中
let gamePlaying = false;

// 設定初始得分和等級
let score = 0;
let level = '';

// 設定球出現時間的長度 (單位: 毫秒)
const duration = {
  easy: 1000,
  medium: 800,
  hard: 500
};

// 設定球的大小
const ballSize = {
  easy: '80px',
  medium: '60px',
  hard: '30px'
};

// 開始遊戲按鈕的點擊事件處理函式
startButton.addEventListener('click', startGame);

function startGame() {
  // 隱藏開始按鈕
  startButton.disabled = true;

  // 遊戲開始
  gamePlaying = true;

  // 清空遊戲區域
  gameArea.innerHTML = '';

  // 重置得分和等級
  score = 0;
  // levelElement.textContent = '';  // clear level text

  // 顯示初始得分和等級
  scoreElement.textContent = '得分: 0';

  // 更新剩餘時間顯示
  timerElement.textContent = `剩餘時間: ${gameDuration}秒`;

  // 啟動計時器
  startTimer();

  // 獲取選擇的難易度
  const difficulty = document.getElementById('difficulty').value;

  // 等待一個介於1～5秒的隨機時間
  const delay = getRandomDelay(1000, 5000);

  // 設定延遲後顯示球
  window.setTimeout(showBall, delay, difficulty);
}


function startTimer() {
  let remainingTime = gameDuration;

  const timer = setInterval(() => {
    remainingTime--;

    // 更新剩餘時間
    timerElement.textContent = `剩餘時間: ${remainingTime}秒`;

    // 檢查遊戲是否結束
    if (remainingTime === 0) {
      gamePlaying = false; // 遊戲結束
      clearInterval(timer); // 停止計時器
      showResult(); // 顯示遊戲結果
    }
  }, 1000);
}

function handleBallClick() {
  // Add animation
  this.style.transform = "scale(0.95)";
  setTimeout(() => {
    this.style.transform = "scale(1)";
  }, 100);

  // 移除球元素
  gameArea.removeChild(this);

  // 更新得分
  score++;
  scoreElement.textContent = `得分: ${score}`;

  // 更新球元素
  if (gamePlaying) {
    showBallAgain();
  }
}


function showBallAgain() {
  // 獲取選擇的難易度
  const difficulty = document.getElementById('difficulty').value;

  // 等待一個介於1～5秒的隨機時間
  const delay = getRandomDelay(1000, 5000);

  // 設定延遲後顯示球
  window.setTimeout(showBall, delay, difficulty);
}

function showBall(difficulty) {
  // 創建一個球元素
  const ball = document.createElement('div');
  ball.classList.add('ball');
  ball.style.width = ballSize[difficulty];
  ball.style.height = ballSize[difficulty];

  var ball_w = parseInt(ball.style.width, 10); // 10 mean decimal
  var ball_h = parseInt(ball.style.height, 10);

  // 計算可移動範圍
  const minX = 0;
  const maxX = gameArea.clientWidth - ball_w;
  const minY = 0;
  const maxY = gameArea.clientHeight - ball_h;

  // 設定球的隨機初始位置
  const x = getRandomPosition(minX, maxX);
  const y = getRandomPosition(minY, maxY);
  ball.style.left = x + 'px';
  ball.style.top = y + 'px';

  if (gamePlaying) {
    // 點擊球的事件處理函式
    ball.addEventListener('click', handleBallClick);

    // 將球添加到遊戲區域
    gameArea.appendChild(ball);

    // 設定球消失的時間
    const ballDuration = duration[difficulty];
    window.setTimeout(removeBall, ballDuration, ball);
  }
}

function removeBall(ball) {
  // 檢查球是否仍在遊戲區域內
  if (gameArea.contains(ball)) {
    // 移除球元素
    gameArea.removeChild(ball);
    // 更新球元素
    showBallAgain();
  }
}

function showResult() {
  // 清空遊戲區域
  gameArea.innerHTML = '';

  // 取得等級
  const level = getLevel();

  // 根據等級選擇圖片
  let imageSrc = '';
  if (level === '優') {
    imageSrc = 'image/high.png';
  } else if (level === '中') {
    imageSrc = 'image/mid.png';
  } else {
    imageSrc = 'image/low.png';
  }

  // 建立圖片元素
  const imageElement = document.createElement('img');
  imageElement.src = imageSrc;

  // 設定圖片寬度為300像素
  imageElement.style.width = '300px';

  // 添加新模拟风格样式
  // imageElement.classList.add('img-neumorphism');

  // 將圖片元素添加到遊戲區域
  gameArea.appendChild(imageElement);


  // 將遊戲區域內容水平和垂直置中
  gameArea.style.display = 'flex';
  gameArea.style.justifyContent = 'center';
  gameArea.style.alignItems = 'center';

  // 將文字訊息元素添加到結果容器
  levelElement.textContent = `等級: ${level}`;

  // 重新顯示開始按鈕
  startButton.disabled = false;
}

function getLevel() {
  if (score >= 10) {
    return '優';
  } else if (score >= 5) {
    return '中';
  } else {
    return '劣';
  }
}

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPosition(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}