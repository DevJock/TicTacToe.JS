let h;
let w;
let gridSpacing = 200;
let offsetMultiplier = 1.5;
let gridStroke = 10;

var fontsize = 200;
let grids = [];
let data = [];
let turn = 0;
let playCount = 0;
var stopped = false;
var winner = -1;
var games = 0;
let empty = -1;
let xval = 0;
let oval = 1;


let player1 = "CPU";
let player2 = "Player";
let scoreX = 0;
let scoreO = 0;
let winnings = [-1,-1,-1];



let fontReady = false;


let button;

function fontRead(){
    fontReady = true;
}

function preload() {
	font = loadFont('./Resources/monofonto.ttf',fontRead);
}

function setup() {
	h = windowHeight;
	w = windowWidth;
	createCanvas(w, h);
	textSize(fontsize);
	textAlign(CENTER);
	reset();
	frameRate(10);
	button = createButton('Reset');
	button.position(w/2-25,h-50);
	button.mousePressed(reset);
}


function mouseClicked()
{
	if(turn == 1)
	{
		for(var i=0;i<grids.length;i++)
		{
			if(grids[i].over(mouseX,mouseY) && data[i] == empty)
			{
				data[i] = oval;
				turn = 0;
				playCount+=2;
				return;
			}
		}
	}
}

function draw() 
{
	if(!fontReady)
	{
		return;
	}
	textFont(font);
	winner = testData();
	if(winner === xval || winner === oval)
	{
		let winPlayer = winner == xval ? "X" : "O";
		if(winPlayer == "X")
		{
			scoreX++;
		}
		else if(winPlayer == "O")
		{
			scoreO++;
		}
		console.log(winPlayer +" Wins");
		console.log(data);
		stopped = true;
		turn = 0;
	}
	if(playCount >= data.length)
	{ 
		console.log("Tie");
		return;
	}

	if(turn == 0 && !stopped)
	{
		let pos = educatedGuess();
		data[pos] = xval;
		turn = 1;
	}
	render();
	if(stopped)
	{
		console.log("Game Over");
		noLoop();
		return;
	}
} 

function render()
{
	let fontSize = 100;
	background(0);
	textSize(fontSize);
	fill(125,125,125);
	noStroke();
	text(player1,fontsize,h/2 - fontsize/2);
	text(player2,w - fontsize,h/2 - fontsize/2);
	fill(125,0,0);
	text(scoreX+'',fontsize,h/2 + fontsize/2);
	text(scoreO+'', w - fontsize ,h/2 + fontsize/2);
	drawGrids();
	for(var i=0;i<data.length;i++)
	{
		let piece;
		if(data[i] != empty)
		{
			piece = data[i] == xval ? 'X' : 'O';
			drawLabel(piece,i);
		}
	}
}

function reset()
{
	console.log("Resetting");
	for(var i=0;i<9;i++)
	{
		data[i] = -1;
	}
	player1 = player1.substring(0,7);
	player2 = player2.substring(0,7);
	playCount = 0;
	turn = 0;
	stopped = false;
	winnings = [-1,-1,-1];
	loop();
}


function educatedGuess()
{
	var val = empty;
	do{
		val = getRandomInt(0,8);
	}while(data[val] != empty);
	return val;
}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




function testData()
{
	if(data[0] === data[1] && data[0] === data[2] && data[0] != empty) 
	{
		winnings = [0,1,2];
		return data[0];
	}

	if(data[3] === data[4] && data[3] === data[5] && data[3] != empty)
	{
		winnings = [3,4,5];
		return data[3];
	}
	
	if(data[6] === data[7] && data[6] === data[8] && data[6] != empty)
	{
		winnings = [6,7,8];
		return data[6];
	}
	if(data[0] === data[3] && data[0] === data[6] && data[0] != empty)
	{
		winnings = [0,3,6];
		return data[0];
	}

	if(data[1] === data[4] && data[1] === data[7] && data[1] != empty)
	{
		winnings = [1,4,7];
		return data[1];
	}

	if(data[2] == data[5] && data[2] == data[8] && data[2] != empty)
	{
		winnings = [2,5,8];
		return data[2];
	}

	if(data[0] == data[4] && data[0] == data[8] && data[0] != empty)
	{
		winnings = [0,4,8];
		return data[0];
	}

	if(data[2] == data[4] && data[2] == data[6] && data[2] != empty)
	{
		winnings = [2,4,6];
		return data[2];
	}

	return empty;
}




function drawGrids()
{
	let c = 0;
	let startX = w/2;
	let startY = h/2;
	let x1 = startX - gridSpacing/2 - gridSpacing;
	let x11 = x1;
	let y1 = startY - gridSpacing/2 - gridSpacing;
	grids = [];
	for(var i=0;i<3;i++)
	{
		for(var j=0;j<3;j++)
		{
			if(c === winnings[0] || c === winnings[1] || c === winnings[2])
			{
				grids[grids.length] = new GRID(c++,x1,y1,gridSpacing,gridStroke,true);
				x1 += gridSpacing;
				continue;
			}
			grids[grids.length] = new GRID(c++,x1,y1,gridSpacing,gridStroke,false);
			x1 += gridSpacing;
		}
		y1+= gridSpacing;
		x1 = x11;
	}
}




function drawLabel2(piece,x,y)
{
	textSize(200);
	var bounds = font.textBounds(piece,x,y, fontsize);
	fill(255);
	text(piece,x,y + bounds.h/2);
}

function drawLabel(piece,id)
{
	//console.log(id);
	switch(id)
	{
		case 0:{
			drawLabel2(piece,grids[id].CENTERX,grids[id].CENTERY);
		}break;
		case 1:{
			drawLabel2(piece,grids[id].CENTERX,grids[id].CENTERY);
		}break;
		case 2:{
			drawLabel2(piece,grids[id].CENTERX,grids[id].CENTERY);
		}break;
		case 3:{
			drawLabel2(piece,grids[id].CENTERX,grids[id].CENTERY);
		}break;
		case 4:{
			drawLabel2(piece,grids[id].CENTERX,grids[id].CENTERY);
		}break;
		case 5:{
			drawLabel2(piece,grids[id].CENTERX,grids[id].CENTERY);
		}break;
		case 6:{
			drawLabel2(piece,grids[id].CENTERX,grids[id].CENTERY);
		}break;
		case 7:{
			drawLabel2(piece,grids[id].CENTERX,grids[id].CENTERY);
		}break;
		case 8:{
			drawLabel2(piece,grids[id].CENTERX,grids[id].CENTERY);
		}break;
	}
}


class GRID
{
	constructor(id,x,y,size,border,win = false)
	{
		this.X = x;
		this.Y = y;
		this.CENTERX = x + size/2;
		this.CENTERY = y + size/2;
		this.id = id;
		this.size = size;
		this.border = border;
		stroke(255);
		strokeWeight(border);
		if(win)
		{
			fill(0,125,0);
		}
		else
		{
			noFill();
		}

		rect(x,y,size,size);
	}



	over(x,y)
	{
		if(x > this.X + this.border && x < this.X + gridSpacing - this.border)
		{
			if(y > this.Y + this.border && y < this.Y + gridSpacing - this.border)
			{
				return true;
			}
		}
		return false;
	}

}