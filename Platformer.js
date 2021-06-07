const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 512;

var up = 0;
var down = 0;
var left = 0;
var right = 0;
var pushed = false;

const player = {
	x: 16,
	y: 432,
	w: 16,
	h: 16,
	spd: 4,
	grav: 1,
	jspd: 0,
	jh:8,
	cx: 0,
	cy: 0,
	timer: 48
	};

var tiles = [];



var boxes = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 4, 0, 1, 1, 0, 4, 4, 4, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, ],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, ],
	[1, 3, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
	[1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, ],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
]

function pushTiles(){
	for(var i = 0;i<32;i++){
		for(var j = 0;j<32;j++){
			if(boxes[i][j] == 1){
				tiles.push({x: j*16, y: i*16, w: player.w, h: player.h, type: "wall"});
			}
			if(boxes[i][j] == 2){
				tiles.push({x: j*16, y: (i*16)+2, w: player.w, h: player.h-2, type: "danger"});
			}
			if(boxes[i][j] == 3){
				tiles.push({x: j*16, y: i*16, w: player.w, h: player.h, type: "checkPoint"});
			}
			if(boxes[i][j] == 4){
				tiles.push({x: j*16, y: i*16, w: player.w, h: player.h, type: "disappear"});
			}

		}
	}
	pushed = true;
}


window.addEventListener("keydown",function(e) {
											   if (e.keyCode === 87) {
											 	 up = 1;
											   }
											   if (e.keyCode === 83) {
											 	 down = 1;
											   }
											   if (e.keyCode === 65) {
											 	 left = 1;
											   }
											   if (e.keyCode === 68) {
											 	 right = 1;
											   }
												if (e.keyCode === 16) {
											 	 player.spd = 2;
												 player.jh = 4;
											   }
											 });
window.addEventListener("keyup", function(e) {
											  if (e.keyCode === 87) {
												 up = 0;
											  }
											  if (e.keyCode === 83) {
												 down = 0;
											  }
											  if (e.keyCode === 65) {
												 left = 0;
											  }
											  if (e.keyCode === 68) {
												 right = 0;
											  }
											  if (e.keyCode === 16) {
											 	 player.spd = 4;
												 player.jh = 8;
											  }
											});





function collision(r1, r2) {
  if (r1.x + r1.w > r2.x &&
      r1.x < r2.x + r2.w &&
      r2.y + r2.h > r1.y &&
      r2.y < r1.y + r1.h) {
        return true;
  }
  else {
    return false;
  }
}


function checkPoint(){
	player.x = player.cx;
	player.y = player.cy;
	player.grav = 1;
	player.jspd = 0
}

function placeFree(newx, newy){
	if((newx == player.x)&&(newy == player.y)){return true;}
	var temp = { x: newx, y: newy, w: player.w, h: player.h};
	for(var i = 0;i<tiles.length;i++){
		
		if(collision(temp, tiles[i])){
			
			if((tiles[i].type == "wall")){
			player.timer = 48;
			return false;

			}
			if((tiles[i].type == "danger")){
				checkPoint();
				player.timer = 48;
				return true;
			}
			if((tiles[i].type == "checkPoint")){
				player.cx = tiles[i].x;
				player.cy = tiles[i].y-16;
				player.timer = 48;
			}
			if((tiles[i].type == "disappear")){

				player.timer--;
				if(player.timer>0){
					return false;
				}
				return true;
			}
		}
		
	}
	
	player.timer = 48;
	//console.log(newx, " ", newy);
	return true;
}

function movePlayer(){
	var dir = right - left;
	for(var s = player.spd;s>0;s--){
		if (placeFree(player.x + s * dir, player.y)) {
			player.x += s * dir;
			break;
		}
	}
 if (player.jspd > 0) {
	playerJump();
 }
 else {
    playerFall();
 }
	if (up == 1 && !(placeFree(player.x, player.y + 1))){
   player.jspd = player.jh;

	}
}

function playerFall(){
	  for (var i = player.grav; i > 0; i--) {
       if (placeFree(player.x, player.y + i)){
          player.y += i;
			 player.grav++;
          break;
		 }
		 else{player.grav = 1;}
	  }


}

function playerJump(){
	for(var i = player.jspd;i>0;i--){
		if(placeFree(player.x, player.y-player.jspd)){
			player.y-=player.jspd;
			player.jspd--;
			break;
		}
		playerFall();
		player.jspd = 0;
	}
}

function drawPlayer(){
	ctx.beginPath();
	ctx.rect(player.x, player.y, player.w, player.h);
	ctx.fillStyle = "#00f";
	ctx.fill();
	ctx.closePath;
}

function drawtiles(){
	
	for(var i = 0;i<tiles.length;i++){
		if(tiles[i].type == "wall"){
			ctx.beginPath();
			ctx.rect(tiles[i].x, tiles[i].y, tiles[i].w, tiles[i].h);
			ctx.fillStyle = "#000";
			ctx.fill();
			ctx.closePath;
		}
		if(tiles[i].type == "danger"){
			ctx.beginPath();
			ctx.rect(tiles[i].x, tiles[i].y, tiles[i].w, tiles[i].h);
			ctx.fillStyle = "#f00";
			ctx.fill();
			ctx.closePath;
		}
		if(tiles[i].type == "checkPoint"){
			ctx.beginPath();
			ctx.rect(tiles[i].x, tiles[i].y, tiles[i].w, tiles[i].h);
			ctx.fillStyle = "#0f0";
			ctx.fill();
			ctx.closePath;
		}
		if(tiles[i].type == "disappear"){
			ctx.beginPath();
			ctx.rect(tiles[i].x, tiles[i].y, tiles[i].w, tiles[i].h);
			ctx.fillStyle = "#888";
			ctx.fill();
			ctx.closePath;
		}
	}
}

function render(){
	if(!(pushed)){
		pushTiles();
	}
	ctx.clearRect(0,0,canvas.width, canvas.height);
	movePlayer();
	drawtiles();
	drawPlayer();
	requestAnimationFrame(render);
}
render();
