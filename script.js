var canvas = document.getElementById("jeu de raquette");
var ctx = canvas.getContext("2d");

var pomme = new Image();
pomme.src = 'apple.png';

var x = canvas.width/2;
var y = canvas.height-80;
var raquetteHeight = 26;
var raquetteWidth = 195;
var score = 0;
var blockX = 85;
var blockY = 70;
var blockHeight = 63;
var blockWidth = 60;

var velocityX = 5.2;
var velocityY = -5.2;
var raquetteX = (canvas.width - raquetteWidth)/2;
var ball = 20.8;
var rightPressed = false;
var leftPressed = false;

var blocks = new Array(3);

var colonnes = 8;
var lignes = 4;

ctx.font = "32px Consolas";


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

function KeyDown(evt) {
    if( evt.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(evt.key == "ArrowLeft") {
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
    ctx.fillStyle = "#8fbcbb";
    ctx.fill();
    ctx.closePath();
}
function drawraquette() {
    ctx.beginPath();
    ctx.rect(raquetteX, canvas.height-raquetteHeight, raquetteWidth, raquetteHeight);
    ctx.fillStyle = "#8fbcbb";
    ctx.fill();
    ctx.closePath();
}
function drawscore() {
    ctx.beginPath();
    ctx.fillText("Score :"+score, 26, 44);
    ctx.fillStyle = "#8fbcbb";
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
                //ctx.rect( bx, by, blockWidth, blockHeight);
                ctx.drawImage(pomme, bx, by,64,64);
            }
        }
    }

    ctx.fillStyle = "#8fbcbb";
    ctx.fill();
    ctx.closePath();
}


function CheckWin() {
    var win = true;
    for (var i in blocks) {
        for (var j in blocks[i]) {
            if (blocks[i][j] == 1) {
                win = false;
            }
        }
    }
    return win;

} 
function Collision() {
    for (var i in blocks) {
        for (var j in blocks[i]) {
            if (blocks[i][j] == 1) {

                let bx = blockX + i*blockWidth + i*blockX;
                let by = blockY + j*blockHeight +j*blockY;
                  
                if (x >= bx && x <= bx + blockWidth + ball  && y >= by && y <= by + blockHeight + ball) {
                    blocks[i][j] = 0;
                    velocityY = -velocityY;
                    score = score + 1;

                }

            }
        }
    }

}



function draw() {
     
    ctx.clearRect(0, 0, canvas.width, canvas.height);
     
    drawBall(); drawraquette();
    Collision(); drawblocks();
    drawscore();
    if (CheckWin()) {
        if(alert('Winner, Your score:'+score)){}
        else    window.location.reload(); 
    }
    

    if(x  > canvas.width - ball || x  < ball) {
        velocityX = -velocityX;
    }

    if((y  > canvas.height - ball - raquetteHeight  ) && (x  > raquetteX+2 && x < raquetteX + raquetteWidth-2)  ) {
        velocityY = -velocityY;
    }  

    if(y > canvas.height - ball) {
        if(alert('Game Over, Your score:'+score)){}
        else    window.location.reload(); 
    }

    if( y < ball  ) {
        velocityY = -velocityY;   
    }
    
    if(rightPressed) {
        raquetteX += 18.2;
        if (raquetteX + raquetteWidth > canvas.width){
            raquetteX = canvas.width - raquetteWidth;
        }
    }
    else if(leftPressed) {
        raquetteX -= 18.2;
        if (raquetteX < 0){
            raquetteX = 0;
        }
    }
    x= x + velocityX;  y= y + velocityY;
    
}
initBlocks();
setInterval(draw, 10);
