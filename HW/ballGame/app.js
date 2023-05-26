// 獲取相關元素
const gameArea = document.getElementById('game-area'); //遊戲窗格範圍
const startButton = document.getElementById('start-button');

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

    // 清空遊戲區域
    gameArea.innerHTML = '';

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
    console.log(ball_w);
    //設定球的左上角位置座標
    const x = getRandomPosition(ball.offsetWidth, gameArea.clientWidth - ball_w);
    const y = getRandomPosition(ball.offsetHeight, gameArea.clientHeight - ball_h);
    ball.style.left = x + 'px';
    ball.style.top = y + 'px';

    // 點擊球的事件處理函式
    ball.addEventListener('click', handleBallClick);

    // 將球添加到遊戲區域
    gameArea.appendChild(ball);

    // 設定球消失的時間
    const ballDuration = duration[difficulty];
    window.setTimeout(removeBall, ballDuration, ball);
}

function handleBallClick() {
    // 移除球元素
    gameArea.removeChild(this);

    // 顯示勝利圖像或影音畫面
    showResult(true);
}

function removeBall(ball) {
    // 移除球元素
    gameArea.removeChild(ball);

    // 顯示失敗圖像或影音畫面
    showResult(false);
}

function showResult(isWin) {
    // 創建結果容器
    const resultContainer = document.createElement('div');
    resultContainer.style.width = '500px';
    resultContainer.style.display = 'block';
    resultContainer.style.margin = '0 auto';
    resultContainer.style.position = 'absolute';
    resultContainer.style.left = '50%';
    resultContainer.style.top = '50%';
    resultContainer.style.transform = 'translate(-50%, -50%)';

    if (isWin) {
        const failText = document.createElement('p');
        failText.textContent = 'Winer Winer Chicken Dinner';
        failText.style.textAlign = 'center';
        resultContainer.appendChild(failText);
        // 若為勝利，創建圖片元素
        const resultImage = document.createElement('img');
        resultImage.src = 'image/win-image.png';
        resultImage.style.width = '300px';
        resultImage.style.display = 'block';
        resultImage.style.margin = '0 auto';

        // 將圖片元素添加到結果容器
        resultContainer.appendChild(resultImage);
    } else {
        // 若為失敗，直接打開 10 個新的分頁，每個分頁都會播放 "Never Gonna Give You Up" 的影片
        for (let i = 0; i < 10; i++) {
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
        }
        const failText = document.createElement('p');
        failText.textContent = 'You are loser';
        failText.style.textAlign = 'center';
        resultContainer.appendChild(failText);

        const failImage = document.createElement('img');
        failImage.src = 'image/loser-image.png';
        failImage.style.width = '300px';
        failImage.style.display = 'block';
        failImage.style.margin = '0 auto';
        resultContainer.appendChild(failImage);

    }

    // 將結果容器添加到遊戲區域
    gameArea.appendChild(resultContainer);

    // 重新顯示開始按鈕
    startButton.disabled = false;
}

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPosition(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

