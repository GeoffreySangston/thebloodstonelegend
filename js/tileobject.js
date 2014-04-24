function TileObject(x,y,tileSheet,spritePos,numSprites,tileType){ // represents the tile version of an object
	this.x = x;
	this.y = y;
	this.width = 32;
	this.height = 32;
	this.tileSheet = tileSheet;
	this.spritePos = spritePos;
	this.numSprites = numSprites;
	this.tileType = tileType;
	this.type = GameObject.TILEOBJECT;
	this.curFrame = 0;
	this.solid = true;
}
TileObject.prototype = Object.create(GameObject.prototype);
TileObject.SWORD = GameObject.SWORD; // tile types