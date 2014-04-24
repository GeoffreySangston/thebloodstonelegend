/*
the tile sheet will be 2 dimensional, all GameObjects will have widths/heights each divisible by the tile width/height

0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 ....
the spriteSheet has to be the height of the tallest sprite and a sprite which is 64 pixels wide might take up positions
0 and 1 so the next sprite has position 2
...
*/

function GameObject(x,y,w,h,tileSheet,spritePos,numSprites,text,textX,textY,textSize){ // if no text just leave the text part off
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.tileSheet = tileSheet;
	this.spritePos = spritePos;
	this.numSprites = numSprites;
	this.curFrame = 0;
	this.text = text;
	this.textX = this.x+textX;
	this.textY = this.y+textY;
	this.textSize = textSize;
	
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.face = GameObject.TOP
	this.type = -1;
	this.solid = true;
}
GameObject.LEFT = 0;
GameObject.RIGHT = 1;
GameObject.DOWN = 2;
GameObject.UP = 3;

GameObject.PLAYER = 0;
GameObject.TILEOBJECT = 1;
GameObject.WARP = 2;
GameObject.SWORD = 3;
GameObject.prototype.setText = function(text,textX,textY,textSize){
	this.text = text;
	this.textX = this.x+textX;
	this.textY = this.y+textY;
	this.textSize = textSize;
};

GameObject.prototype.collidesWith = function(oo){
	if(!this.solid){
		return false;
	} else if(!oo.solid){
		return false;
	}
	return !(oo.x > this.x+this.width || oo.x+oo.width < this.x || oo.y > this.y+this.height || oo.y+oo.height < this.y);
};

GameObject.prototype.actCollision = function(oo){
	/* what other variables might be necessary
	
	perhaps none and any other processing will be done in the main file, can just throw a flag or change a variable
	on the object itself and then in the main file check for special flags
	
	perhaps in the level files I could have a function which handles the special flags and then the main file will call the
	function of the current level

	*/
	switch(oo.type){
	default:
		break;
	};
};
