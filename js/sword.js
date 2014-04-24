function Sword(tileSheet){
	this.x;
	this.y;
	this.tileSheet = tileSheet;
	console.log(this.tileSheet);
	this.numSprites;
	this.spritePos = -1;
	this.spritePosX;
	this.face;
	this.width;
	this.height;
	this.solid = false;
	this.type = GameObject.SWORD;
	
	this.actionLength = 10;
	this.recoveryLength = 5;
}

Sword.prototype = Object.create(GameObject.prototype);
Sword.prototype.setFace = function(dir){
	this.face = dir;
	switch(this.face){
	case GameObject.LEFT:
		this.width = 28;
		this.height = 6;
		
		break;
	case GameObject.RIGHT:
		this.width = 28;
		this.height = 6;
		break;
	case GameObject.DOWN:
		this.width = 6;
		this.height = 28;
		break;
	case GameObject.UP:
		this.width = 6;
		this.height = 28;
		break;
	}
};