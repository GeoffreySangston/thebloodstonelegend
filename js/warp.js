function Warp(x,y,w,h,tileSheet,spritePos,numSprites,toLevelNum,toScreenIndex,toX,toY){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.tileSheet = tileSheet;
	this.spritePos = spritePos;
	this.numSprites = numSprites;
	this.toLevelNum = toLevelNum;
	this.toScreenIndex = toScreenIndex;
	this.toX = toX;
	this.toY = toY;
	this.type = GameObject.WARP;
	this.solid = true;
	this.curFrame = 0;
}

Warp.prototype = Object.create(GameObject.prototype);

