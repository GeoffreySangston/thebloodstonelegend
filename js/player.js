function Player(x,y,w,h,tileSheet,spritePos,numSprites){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.tileSheet = tileSheet;
	this.spritePos = spritePos;
	this.numSprites = numSprites;
	this.curFrame = 0;
	console.log("width : " + this.width);
	this.health = 3;
	this.xSpeed = 3;
	this.ySpeed = 3;
	this.moveTicks = 0;
	this.face = GameObject.LEFT;
	this.doingAction = false;
	this.actionButton;
	this.lastActionGameTicks = -1;
	this.type = GameObject.PLAYER;
	this.solid = true;
	
	this.inventory = [];
	this.aButtonItemIndex;
	this.bButtonItemIndex;
	
	
}

Player.prototype = Object.create(GameObject.prototype);

Player.prototype.addToInventory = function(item){
	if(this.inventory.length < 6){
		this.inventory.push(item);
	}
};

Player.prototype.canAddToInventory = function(){
	return this.inventory.length < 6;
};

Player.prototype.inventoryContainsType = function(type){
	for(var i = 0; i < this.inventory.length; i++){
		if(this.inventory[i].type = type){
			return true;
		}
	}
	return false;
};