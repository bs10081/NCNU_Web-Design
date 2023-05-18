var cardArr = []; // 存儲卡牌的陣列
var isSelected = []; // 標記已選擇的卡牌
var cardPool;

window.onload = function () {
    for (let i = 0; i < 5; i++) {
        cardArr[i] = document.getElementById(i); // 獲取卡牌元素並存入陣列
        cardArr[i].addEventListener("click", cardShow); // 添加點擊事件監聽器
    }
    cardPool = document.getElementById("cardPool"); // 獲取卡牌池元素
    start(); // 初始化遊戲

    document.getElementById("btnFlipAll").addEventListener("click", function () {
        var allFlipped = cardArr.every(card => card.src.includes('forward')); // 檢查是否所有卡牌都已翻轉
        cardArr.forEach((card, i) => {
            setTimeout(function () {
                if (allFlipped) {
                    cardHide.call(card); // 如果所有卡牌都已翻轉，則將它們翻回背面
                } else {
                    cardShow.call(card); // 否則，將它們翻到正面
                }
            }, i * 500); // 延遲 = 索引 * 500毫秒
        });
    }); // end of btnFlipAll
}

function start() {
    cardPool.style.display = "block"; // 顯示卡牌池
    isSelected.fill(false); // 將isSelected陣列填充為false
    cardArr.forEach((card, i) => {
        card.src = "image/back/blue_back.png"; // 設置卡牌背面圖片
        card.style.height = "100px";
        card.addEventListener("click", cardShow); // 添加點擊事件監聽器
        card.classList.add('dealing'); // 添加dealing類以觸發發牌動畫
        setTimeout(() => { // 動畫結束後刪除dealing類
            card.classList.remove('dealing');
        }, 500);
        var num;
        do {
            num = myRandom(1, 52); // 隨機生成卡牌數字
        } while (isSelected[num]) // 檢查該卡牌是否已被選擇過
        isSelected[num] = true; // 標記該卡牌為已選擇
        // 創建數據屬性來保存卡牌值
        card.dataset.cardValue = num2Card(num);
    });
}

function stop() {
    cardPool.style.display = "none"; // 隱藏卡牌池
}

function cardShow() {
    this.removeEventListener("click", cardShow);
    this.classList.add('flip'); // 添加flip類以觸發翻轉動畫
    setTimeout(() => {
        this.src = `image/forward/${this.dataset.cardValue}.png`; // 卡牌翻轉後更換圖片
    }, 250);
    this.addEventListener("click", cardHide);
    setTimeout(() => {
        this.classList.remove('flip'); // 動畫結束後刪除flip類
    }, 500);
}

function cardHide() {
    this.removeEventListener("click", cardHide);
    this.classList.add('flip');
    setTimeout(() => {
        this.src = "image/back/blue_back.png"; // 將卡牌翻回背面
    }, 250);
    this.addEventListener("click", cardShow);
    setTimeout(() => {
        this.classList.remove('flip'); // 動畫結束後刪除flip類
    }, 500);
}

function myRandom(a, b) {
    return Math.floor(a + Math.random() * (b - a + 1)); // 生成a和b之間的隨機整數
}

function num2Card(num) {
    var suit;
    var rank;
    var doc_name;

    if (num >= 1 && num <= 13) {
        suit = "S";
        rank = rankCalculation(num);
    } else if (num >= 14 && num <= 26) {
        suit = "H";
        rank = rankCalculation(num - 13);
    } else if (num >= 27 && num <= 39) {
        suit = "D";
        rank = rankCalculation(num - 26);
    } else if (num >= 40 && num <= 52) {
        suit = "C";
        rank = rankCalculation(num - 39);
    } else {
        return "";
    }

    doc_name = rank + suit;
    return doc_name; // 根據數字返回卡牌名稱
}

function rankCalculation(num) {
    return (num === 1) ? "A" : (num === 11) ? "J" : (num === 12) ? "Q" : (num === 13) ? "K" : num; // 根據數字返回卡牌等級
}
