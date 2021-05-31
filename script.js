var canvas = document.getElementById("Balle et raquette");
var ctx = canvas.getContext("2d");

var rad = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", KeyDown, false);
document.addEventListener("keyup", KeyUp, false);

function KeyDown(e) {
    if( e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function KeyUp(e) {
    if(e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI*2);
    ctx.fillStyle = "#0195DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    
    if(x + dx > canvas.width-rad || x + dx < rad) {
        dx = -dx;
    }
    if(y + dy > canvas.height-rad || y + dy < rad) {
        dy = -dy;
    }
    
    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 10);