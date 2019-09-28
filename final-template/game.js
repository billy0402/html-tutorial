const gameWidth = $('body').width();
const gameHeight = $('body').height();

// 建立物件
let GameObject = function (selector, size, position) {
    this.$el = $(selector); //選擇器
    this.position = position; //遊戲物體位置
    this.size = size; //遊戲物體大小
    this.setCss();
    this.updatePosition();
};

GameObject.prototype.setCss = function () {
    this.$el.css('width', this.size.width + 'px');
    this.$el.css('height', this.size.height + 'px');
    this.$el.css('position', 'absolute'); //設置其css為絕對定位
    this.$el.css('text-algin', 'center');
};

GameObject.prototype.updatePosition = function () {
    this.$el.css('left', this.position.x + 'px');
    this.$el.css('top', this.position.y + 'px');
};

GameObject.prototype.hit = function (otherObject) {
    let inRangeX = otherObject.position.x > this.position.x - otherObject.size.width &&
                   otherObject.position.x < this.position.x + this.size.width + otherObject.size.width;

    let inRangeY = false;
    if (this.$el.attr('class') == 'board auto-board') {
        inRangeY = otherObject.position.y < this.position.y + this.size.height;
    } else if (this.$el.attr('class') == 'board user-board') {
        inRangeY = otherObject.position.y + otherObject.size.height > this.position.y;
    }

    return inRangeX && inRangeY;
};


// 建立小球
let Ball = function () {
    this.size = { width: 15, height: 15 }; //球的大小
    this.init();
    GameObject.call(this, '.ball', this.size, this.position) //繼承GameObject。並將參數和自身傳入
};

Ball.prototype = Object.create(GameObject.prototype); //將Ball的原型鏈連接GameObjecr的原型鏈
Ball.prototype.constructor = Ball.constructor; //因為連接，所以需要重新指向構造函數。將原型鏈的構造函數指向自己的構造函數複製代碼

Ball.prototype.init = function () {
    this.position = { x: gameWidth / 2, y: gameHeight / 2 }; //球的位置
    let randomSpeed = Math.random() * 2 * Math.PI;
    this.velocity = { //球的速度
        x: Math.cos(randomSpeed) * 8,
        y: Math.sin(randomSpeed) * 8
    }
};

// 移動小球
Ball.prototype.update = function () {
    this.position.x += this.velocity.x; //X軸按速度移動
    this.position.y += this.velocity.y; //Y軸按速度移動
    this.updatePosition();

    if (this.position.x < 10 || this.position.x + this.size.width > gameWidth - 10) { //如果撞到了左右牆壁
        this.velocity.x = -this.velocity.x; // 回彈
    }

    if (this.position.y < 10 || this.position.y + this.size.height > gameHeight - 10) { //如果撞到了上下牆壁
        this.velocity.y = -this.velocity.y; // 回彈
    }
};

let ball = new Ball();


// 建立板子
let Board = function (selector, positionY) {
    this.size = { width: 100, height: 15 }; //鎖定板子大小
    this.position = { x: (gameWidth - this.size.width) / 2, y: positionY }
    GameObject.call(this, selector, this.size, this.position); //對接父對象
};

Board.prototype = Object.create(GameObject.prototype); //對接父對象原型鏈
Board.prototype.constructor = Board.constructor; //更改原型鏈上的構造為自己的構造複製代碼
let autoBoard = new Board('.auto-board', 30);
let userBoard = new Board('.user-board', gameHeight - 45);

// 避免板子超出左右邊界
Board.prototype.update = function () {
    if (this.position.x < 10) {
        this.position.x = 10;
    }

    if (this.position.x + this.size.width > gameWidth - 10) {
        this.position.x = gameWidth - 10 - this.size.width;
    }

    this.updatePosition();
};


// ----------------------------------------------------------------------------------------------------
// 建立遊戲
let Game = function () {
    this.gameTimer = null; //唯一timer 負責開始遊戲結束遊戲的timer
    this.score = 0; //分數
    this.keyboardControl(); //鍵盤監聽事件
    this.control = {}; //這個放置各個鍵盤按鍵情況的對象
};

// 鍵盤監聽器
Game.prototype.keyboardControl = function () {
    let _this = this; //防止this作用域混淆
    $(window).keydown(function (event) { //按鍵按下
        _this.control[event.key] = true; //設置當前的key value為true
    });
    $(window).keyup(function (event) { //按鍵抬起
        _this.control[event.key] = false; //設置當前的key value為false
    })
};

// 開始遊戲
Game.prototype.startGame = function () {
    let _this = this;
    let countdown = 3; //倒計時3秒
    this.score = 0; //初始化分數0
    ball.init(); //重製球的位置

    let countdownTimer = setInterval(function () {
        $('.title').text(countdown);
        countdown--;

        if (countdown < 0) { //如果時間 < 0
            clearInterval(countdownTimer); //清除定時器
            $('.info').hide(); //隱藏信息
            $('.game-info').show();
            _this.startGameMain(); //開始主要的遊戲函數
        }
    }, 1000)
};

// 判定規則
Game.prototype.startGameMain = function () {
    let _this = this; //作用域
    this.gameTimer = setInterval(function () { //唯一定時器
        // 小球觸碰板子
        if (autoBoard.hit(ball)) { //如果一號板子撞到了球
            console.log('碰到了自動板子');
            ball.velocity.y = -ball.velocity.y; //Y反向運動
        }
        if (userBoard.hit(ball)) { //如果二號板子撞到了球
            console.log('碰到了玩家板子');
            _this.score += 10; //自己的分數+10
            ball.velocity.y = -ball.velocity.y;
        }

        // 小球觸碰上下邊界
        if (ball.position.y < 10) {
            console.log('自動板子輸了');
            _this.endGame('你赢了'); //後面的結束遊戲方法
        }
        if (ball.position.y + ball.size.height > gameHeight - 10) {
            console.log('玩家板子輸了');
            _this.endGame('你輸了');
        }

        $('.game').mousemove(function (mouse) {
            userBoard.position.x = mouse.pageX - userBoard.size.width / 2;
        });

        if (_this.control['ArrowLeft']) { //如果左鍵
            userBoard.position.x -= 8; //二號板子左移8
        }

        if (_this.control['ArrowRight']) { //如果右鍵
            userBoard.position.x += 8; //二號板子右移8
        }

        autoBoard.position.x += ball.position.x > autoBoard.position.x + autoBoard.size.width / 2 ? 12 : 0;
        autoBoard.position.x += ball.position.x < autoBoard.position.x + autoBoard.size.width / 2 ? -12 : 0;
        autoBoard.update();
        userBoard.update();
        ball.update(); //球體更新方法
        $('.score').text(_this.score); //jQuery更新分數
    }, 30) //每隔30ms走一次
};

//結束遊戲
Game.prototype.endGame = function (res) {
    clearInterval(this.gameTimer); //清除定時器
    $('.title').html(res + '<br />分數：' + this.score); //展示分數
    $('.game-info').hide();
    $('.info').show(); //展示信息
};

let game = new Game();
$('.start').click(function () {
    game.startGame();
})
