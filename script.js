var canvas = document.getElementById("Balle et raquette");
var ctx = canvas.getContext("2d");


var x = canvas.width/2;
var y = canvas.height-80;
var raquetteHeight = 10;
var raquetteWidth = 75;
var velocityX = 2;
var velocityY = -2;
var raquetteX = (canvas.width-raquetteWidth)/2;
var ball = 10;
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
    ctx.arc(x, y, ball, 0, Math.PI*2);
    ctx.fillStyle = "#6095DD";
    ctx.fill();
    ctx.closePath();
}
function drawraquette() {
    ctx.beginPath();
    ctx.rect(raquetteX, canvas.height-raquetteHeight, raquetteWidth, raquetteHeight);
    ctx.fillStyle = "#6095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawraquette();
    
    if(x + velocityX > canvas.width-ball || x + velocityX < ball) {
        velocityX = -velocityX;
    }

    // if(y + velocityY > canvas.height-ball  || y + velocityY < ball ) {
    //     velocityY = -velocityY;
    //     }else { 
    //             if (y + velocityY > canvas.height-ball) {
    //                 if( x  > raquetteX && x < raquetteX + raquetteWidth  ) {
    //                     velocityY = -velocityY;
    //                 }else{
    //                       alert("GAME OVER");
    //     }
        
    // }

    // }
    if((y + velocityY > canvas.height-ball  - raquetteHeight  ) && (x  > raquetteX && x < raquetteX + raquetteWidth)   ) {
        velocityY = -velocityY;
    }  

    if(y + velocityY > canvas.height-ball     ) {
        alert("gameover");
    }

    if( y + velocityY < ball  ) {
        velocityY = -velocityY;   
    }
    


    // if(y + velocityY > canvas.height-ball - raquetteHeight || y + velocityY < ball ) {
    //     velocityY = -velocityY;
    // }

    if(rightPressed) {
        raquetteX += 7;
        if (raquetteX + raquetteWidth > canvas.width){
            raquetteX = canvas.width - raquetteWidth;
        }
    }
    else if(leftPressed) {
        raquetteX -= 7;
        if (raquetteX < 0){
            raquetteX = 0;
        }
    }
    
    x += velocityX;
    y += velocityY;
}

setInterval(draw, 10);