function Tile(x,y,w,h,tileSheet,spritePos,numSprites){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.tileSheet = tileSheet;
	this.spritePos = spritePos;
	this.numSprites = numSprites;
	this.curFrame = 0;
}