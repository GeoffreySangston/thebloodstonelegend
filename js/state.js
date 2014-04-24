function State(stateManager,gameManager){ // will hold player object too I think
	this.stateManager = stateManager;
	this.gameManager = gameManager;
}
State.prototype.objects;
State.prototype.tilesBottom;
State.prototype.tilesTop;
State.prototype.spriteSheet;
State.prototype.startTime;
State.prototype.ticks;

State.prototype.setup = function(){

};

State.prototype.loop = function(){

};

State.prototype.renderTiles = function(){
	for(var i = 0; i < this.tilesBottom.length; i++){
		this.gameManager.renderer.draw(this.tilesBottom[i]);
	}
	for(var i = 0; i < this.tilesTop.length; i++){
		this.gameManager.renderer.draw(this.tilesTop[i]);
	}
};
State.prototype.renderObjects = function(){
	for(var i = this.objects.length-1; i >= 0; i--){
		this.gameManager.renderer.draw(this.objects[i]);
		if(typeof this.objects[i].text != 'undefined'){
			this.gameManager.renderer.drawText(this.objects[i].textX,this.objects[i].textY,this.objects[i].textSize,this.objects[i].text);
		}
	}

};
State.prototype.render = function(){
	this.renderTiles();
	this.renderObjects();
};

State.prototype.cls = function(){
	this.gameManager.renderer.cls(this.gameManager.GAMEWIDTH,this.gameManager.GAMEHEIGHT);
};
State.prototype.handleInput = function(){

};
State.prototype.getTilesFromMap = function(map,spriteSheet){
	var tilesWide = this.gameManager.GAMEWIDTH/this.gameManager.TILEWIDTH;
	var tilesHeight = this.gameManager.GAMEHEIGHT/this.gameManager.TILEHEIGHT;
	var tiles = [];
	for(var i = 0; i < map.length; i++){
		var x = this.gameManager.TILEWIDTH*(i%tilesWide);
		var y = Math.floor(i/tilesWide)*this.gameManager.TILEHEIGHT;
		tiles.push(new Tile(x,y,this.gameManager.TILEWIDTH,this.gameManager.TILEHEIGHT,spriteSheet,map[i],1));
	}
	return tiles;
};
State.prototype.recordStateInfo = function(){
	this.gameManager.localStorageManager.setStateInfo(this.gameManager.stateInfo);
};
State.prototype.recordCharacter = function(){
	switch(this.gameManager.stateInfo.saveSelect){
	case 0:
		this.gameManager.localStorageManager.setCharacterOne(this.gameManager.character);
		break;
	case 1:
		this.gameManager.localStorageManager.setCharacterTwo(this.gameManager.character);
		break;
	case 2:
		this.gameManager.localStorageManager.setCharacterThree(this.gameManager.character);
		break;
	}
};
State.prototype.getCharacter = function(num){
	switch(num){
	case 0:
		return this.gameManager.localStorageManager.getCharacterOne();
		break;
	case 1:
		return this.gameManager.localStorageManager.getCharacterTwo();
		break;
	case 2:
		return this.gameManager.localStorageManager.getCharacterThree();
		break;
	}
};