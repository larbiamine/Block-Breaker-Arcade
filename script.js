var canvas = document.getElementById("Balle et raquette");
var ctx = canvas.getContext("2d");


var x = canvas.width/2;
var y = canvas.height-80;
var raquetteHeight = 10;
var raquetteWidth = 75;

var blockX = 20;
var blockY = 20;
var blockHeight = 15;
var blockWidth = 38;

var velocityX = 2;
var velocityY = -2;
var raquetteX = (canvas.width - raquetteWidth)/2;
var ball = 10;
var rightPressed = false;
var leftPressed = false;

var blocks = new Array(3);

var colonnes = 8;
var lignes = 4;

function initBlocks() {
    for (var i = 0; i < colonnes; i++) {
        blocks[i] = new Array(lignes);
        for (var j = 0; j < lignes; j++) {
            blocks[i][j] = 1;
        }
    }
}

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

function drawblocks() {
    
    ctx.beginPath();

    for (var i in blocks) {
        for (var j in blocks[i]) {
            if (blocks[i][j] == 1) {

                let bx = blockX + i*blockWidth + i*blockX;
                let by = blockY + j*blockHeight +j*blockY;
                ctx.rect( bx, by, blockWidth, blockHeight);
            }
        }
    }

    ctx.fillStyle = "#6095DD";
    ctx.fill();
    ctx.closePath();
}

function Collision() {
    for (var i in blocks) {
        for (var j in blocks[i]) {
            if (blocks[i][j] == 1) {

                let bx = blockX + i*blockWidth + i*blockX;
                let by = blockY + j*blockHeight +j*blockY;

                if (x >= bx && x <= bx + blockWidth && y >= by && y <= by + blockHeight ) {
                    blocks[i][j] == 0;
                    velocityY = -velocityY;

                }

            }
        }
    }

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
     
    drawBall(); drawraquette();
    Collision(); drawblocks();
    
    
    if(x  > canvas.width - ball || x  < ball) {
        velocityX = -velocityX;
    }

    if((y  > canvas.height - ball - raquetteHeight  ) && (x  > raquetteX+2 && x < raquetteX + raquetteWidth-2)  ) {
        velocityY = -velocityY;
    }  

    if(y > canvas.height - ball) {
        if(alert('GameOver')){}
        else    window.location.reload(); 
    }

    if( y < ball  ) {
        velocityY = -velocityY;   
    }
    
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
    x= x + velocityX;  y= y + velocityY;
    
}
initBlocks();
setInterval(draw, 10);
