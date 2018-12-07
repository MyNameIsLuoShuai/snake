//游戏开始
//随机出现食物
//出现一条蛇，控制移动
//吃到食物，食物消失，自身长度加一，计算分数
//游戏暂停&继续
//游戏结束


var mainDiv = document.getElementsByClassName('main')[0];
var sorceDiv = document.getElementById('sorce');
var over = document.getElementsByClassName('over')[0];
var oend = document.getElementsByClassName('end')[0];
var osure = document.getElementsByClassName('sure')[0];
var ostart = document.getElementsByClassName('start')[0];
var opause = document.getElementsByClassName("pause")[0];
var snakeMove;
//初始化属性
// init();
function init() {
    //地图属性
    mapW = parseInt(getComputedStyle(mainDiv).width);
    mapH = parseInt(getComputedStyle(mainDiv).height);
    //食物属性
    foodW = 40 + 'px';
    foodH = 40 + 'px';
    foodX = 0;
    foodY = 0;
    //蛇的属性
    snakeW = 40 + 'px';
    snakeH = 40 + 'px';
    snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];//我们定义的最初始的蛇样式
    direct = 'right';
    right = false;
    left = false;
    up = true;
    down = true;
    var speed;
    var snakeMove;
    sorce = 0;

    startGame();
    bindDirect();//绑定方向
}
//游戏开始，直接生成食物和我们定义的默认蛇
function startGame() {
    food();
    snake();
}


//生成食物
function food() {
    var food = document.createElement('div');//创建食物div
    foodX = Math.floor(Math.random() * (mapW / 40));//随机产生一个x坐标
    foodY = Math.floor(Math.random() * (mapH / 40));//随机产生一个y坐标
    food.style.left = foodX * 40 + 'px';//设置食物的x坐标
    food.style.top = foodY * 40 + 'px';//设置食物的y坐标
    food.style.position = 'absolute';//设置定位
    food.style.width = foodW;//设置食物的宽度
    food.style.height = foodH;//设置食物的高度
    mainDiv.appendChild(food).setAttribute('class', 'food');//将食物插入地图当中
}
//生成蛇
function snake() {
    for (var i = 0; i < snakeBody.length; i++) {
        var snakeDiv = document.createElement('div');//创建蛇的身体div
        snakeDiv.style.width = snakeW;//蛇的每一节宽度
        snakeDiv.style.height = snakeH;//蛇的每一节高度
        snakeDiv.style.left = snakeBody[i][0] * 40 + 'px';//蛇距离左边的距离
        snakeDiv.style.top = snakeBody[i][1] * 40 + 'px';//蛇距离右边的距离
        snakeDiv.style.position = 'absolute';//设置定位
        snakeDiv.classList.add(snakeBody[i][2]);//为蛇添加class类名，以此来判断属于身体还是脑袋
        mainDiv.appendChild(snakeDiv).classList.add('snake');//为蛇的脑袋和身体添加一个共同的class类名，用来删除蛇，重新渲染
        //此函数为当蛇改变方向时蛇的脑袋冲着哪个方向
        switch (direct) {
            case 'right':
                break;
            case 'up':
                snakeDiv.style.transform = 'rotate(270deg)';
                break;
            case 'left':
                snakeDiv.style.transform = 'rotate(180deg)';
            case 'down':
                snakeDiv.style.transform = 'rotate(90deg)';
                break;
            default:
                break;
        }
    }
}
//蛇移动
function move() {
    for (var i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i][0] = snakeBody[i - 1][0];//蛇的后一个身体x坐标等于前一个的x坐标
        snakeBody[i][1] = snakeBody[i - 1][1];//蛇的后一个身体y坐标等于前一个的y坐标
    }
    //设置方向来控制移动时各节身体坐标的变化
    switch (direct) {
        case 'right':
            snakeBody[i][0] += 1;
            break;
        case 'left':
            snakeBody[i][0] -= 1;
            break;
        case 'down':
            snakeBody[i][1] += 1;
            break;
        case 'up':
            snakeBody[i][1] -= 1;
            break;
        default:
            break;
    }
    removeClass('snake');//删除所有蛇
    snake();//重新渲染
    if (snakeBody[0][0] == foodX && snakeBody[0][1] == foodY) {
        //如果食物和蛇头x y坐标相等，判断当时的方向然后在蛇的最后节添加一个数组，以最后一节为判断添加x y坐标
        switch (direct) {
            case 'right':
                snakeBody.push([snakeBody[snakeBody.length - 1][0] - 1, snakeBody[snakeBody.length - 1][1], 'body']);
                break;
            case 'left':
                snakeBody.push([snakeBody[snakeBody.length - 1][0] + 1, snakeBody[snakeBody.length - 1][1], 'body']);
                break;
            case 'down':
                snakeBody.push([snakeBody[snakeBody.length - 1][0], snakeBody[snakeBody.length - 1][1] - 1, 'body']);
                break;
            case 'up':
                snakeBody.push([snakeBody[snakeBody.length - 1][0], snakeBody[snakeBody.length - 1][1] + 1, 'body']);
                break;
            default:
                break;
        }
        sorce += 1;//积分
        sorceDiv.innerHTML = sorce;
        removeClass('food');//删除食物
        food();//重新渲染食物
    }
    //以下两个如果判断蛇头是否撞墙，也就是蛇头的x y坐标
    if (snakeBody[0][0] < 0 || snakeBody[0][0] >= Math.floor(mapW / 40)) {
        reloadGame();
    }
    if (snakeBody[0][1] < 0 || snakeBody[0][1] >= Math.floor(mapH / 40)) {
        reloadGame();
    }
    //得到蛇头x y坐标，遍历蛇身体坐标，如果等于蛇身体的坐标，结束游戏
    snakeX = snakeBody[0][0];
    snakeY = snakeBody[0][1];
    for (var i = 1; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            reloadGame();
        }
    }

}
//当游戏结束时，重新渲染蛇
function reloadGame() {
    removeClass('snake');//移除蛇
    removeClass('food');//移除食物
    clearInterval(snakeMove);//清楚定时器
    foodW = 40 + 'px';
    foodH = 40 + 'px';
    foodX = 0;
    foodY = 0;
    snakeW = 40 + 'px';
    snakeH = 40 + 'px';
    snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
    direct = 'right';
    right = false;
    left = false;
    up = true;
    down = true;
    over.innerHTML = sorceDiv.innerHTML;
    sorce = 0;
    sorceDiv.innerHTML = 0;
    oend.style.display = 'block';
}
//删除原有蛇或者食物
function removeClass(clas) {
    var ele = document.getElementsByClassName(clas);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}
//方向监听事件
function bindDirect() {
    document.onkeydown = function (e) {
        var code = e.keyCode;
        setCode(code);
    }
}
//上下左右控制方向，如果code等于我们的按键并且方向为真时进入判断，并且改变上下左右的真假
function setCode(code) {
    switch (code) {
        case 37:
            if (left) {
                direct = 'left';
                right = false;
                up = true;
                down = true;
                left = false;
            }
            break;
        case 38:
            if (up) {
                direct = 'up';
                right = true;
                up = false;
                down = false;
                left = true;
            }
            break;
        case 39:
            if (right) {
                direct = 'right';
                right = false;
                up = true;
                down = true;
                left = false;
            }
            break;
        case 40:
            if (down) {
                direct = 'down';
                right = true;
                up = false;
                down = false;
                left = true;
            }
            break;
        default:
            break;

    }
}
//控制点击按钮事件
function event(){
    ostart.onclick = function(){
        snakeMove = setInterval(function () {
            move();
        }, 300)
    }
}
event();
init();

