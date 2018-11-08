var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 25;
var ballRadius = 10;
var dx = 15;
var dy = -15;
var paddleHeight = 10;
var paddleWidth = 100;
var paddle1X = (canvas.width - paddleWidth)/2;
var paddle2X = (canvas.width - paddleWidth)/2;
var paddleDx = 7;
var rightPressed;
var leftPressed;
var dPressed;
var aPressed;

function keyDownHandler(event){
	
	if(event.keyCode == 39){
		rightPressed = true;
	}
	else if(event.keyCode == 37){
		leftPressed = true;
	}
	else if(event.keyCode == 68){
		dPressed = true;
	}
	else if(event.keyCode == 65){
		aPressed = true;
	}
}

function keyUpHandler(event){
	
	if(event.keyCode == 39){
		rightPressed = false;
	}
	else if(event.keyCode == 37){
		leftPressed = false;
	}
	else if(event.keyCode == 68){
		dPressed = false;
	}
	else if(event.keyCode == 65){
		aPressed = false;
	}
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function drawPaddle1(){
	
	ctx.beginPath();
	ctx.rect(paddle1X, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
	
}

function drawPaddle2(){
	
	ctx.beginPath();
	ctx.rect(paddle2X, 0, paddleWidth, paddleHeight);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
	
}

function drawBall(){
	
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
	
}

function draw(){
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle1();
	drawPaddle2();
	
	if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
		dx = -dx;
	}
	
	if((y + dy > canvas.height - paddleHeight - ballRadius && x + dx > paddle1X && x + dx < paddle1X + paddleWidth)){
		dy = -dy;
	}
	else if((y + dy < paddleHeight + ballRadius && x + dx > paddle2X && x + dx < paddle2X + paddleWidth)){
		dy = -dy;
	}
	else if(y + dy > canvas.height || y + dy < 0 + ballRadius){
		location.reload();
	}
	
	if(rightPressed && paddle1X + paddleWidth < canvas.width){
		paddle1X += paddleDx;
	}
	else if(leftPressed && paddle1X > 0){
		paddle1X -= paddleDx;
	}
	if(dPressed && paddle2X + paddleWidth < canvas.width){
		paddle2X += paddleDx;
	}
	else if(aPressed && paddle2X > 0){
		paddle2X -= paddleDx;
	}
	
	x += dx;
	y += dy;
	
	requestAnimationFrame(draw);
	
}

requestAnimationFrame(draw);
