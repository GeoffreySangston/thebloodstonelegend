function GameState(stateManager,gameManager){
	this.stateManager = stateManager;
	this.gameManager = gameManager;
	
}
GameState.prototype = Object.create(State.prototype);

GameState.prototype.setup = function(){
	this.playerSpriteSheet = this.gameManager.assetManager.cache['img/playerTileSheet.png'];
	this.itemSpriteSheet = this.gameManager.assetManager.cache['img/itemTileSheet.png'];
	this.startTime = Date.now()
	this.ticks = 0;

	// read from memory or restart
	
	this.tilesBottom = [];
	this.tilesTop = [];
	this.objects = [];
	this.collisions = [];
	
	var player;
	if(this.getCharacter(this.gameManager.stateInfo.saveSelect) && !isNaN(this.getCharacter(this.gameManager.stateInfo.saveSelect).playerX)){
		var character = this.getCharacter(this.gameManager.stateInfo.saveSelect);
		player = new Player(character.playerX,character.playerY,28,28,this.playerSpriteSheet,1,2);

		this.curLevelNum = character.curLevelNum;
		this.curLevel = this.chooseLevel(this.curLevelNum);
		this.curScreenIndex = character.curScreenIndex;
	} else {
		player = new Player(this.gameManager.GAMEWIDTH/2,this.gameManager.GAMEHEIGHT-180,32,32,this.playerSpriteSheet,1,2);
		
		this.curLevelNum = Level.MAINLEVEL;
		this.curLevel = new MainLevel(this.gameManager);
		this.curScreenIndex = 45;
		
		this.gameManager.character.curLevelNum = Level.MAINLEVEL;
		this.gameManager.character.curScreenIndex = this.curScreenIndex;
		this.gameManager.character.playerX = player.x;
		this.gameManager.character.playerY = player.y;
	}
	this.tilesBottom = this.getTilesFromMap(this.curLevel.screen[this.curScreenIndex].tilesBottomMap,this.curLevel.tileSheet);
	this.tilesTop = this.getTilesFromMap(this.curLevel.screen[this.curScreenIndex].tilesTopMap,this.curLevel.tileSheet);
	this.objects = this.getCurScreenObjects(player,this.curLevel.screen[this.curScreenIndex].objects);

	
	this.topWall = {x:0,y:4*this.gameManager.TILEHEIGHT,width:this.gameManager.GAMEWIDTH,height:0};
	this.leftWall = {x:0,y:0,width:0,height:this.gameManager.GAMEHEIGHT};
	this.bottomWall = {x:0,y:this.gameManager.GAMEHEIGHT,width:this.gameManager.GAMEWIDTH,height:0};
	this.rightWall = {x:this.gameManager.GAMEWIDTH,y:0,width:0,height:this.gameManager.GAMEHEIGHT};
	
	
	this.LEFTMOVE = 0;
	this.UPMOVE = 1;
	this.RIGHTMOVE = 2;
	this.DOWNMOVE = 3;
	this.A = 4; // A key
	this.B = 5;  // S key
	
	this.command = {
		0 : false, // left
		1 : false, // up
		2 : false, // right 
		3 : false, // down
		4 : false // attack
	}
	
};

GameState.prototype.loop = function(){
	
	this.handleInput();
	if((Date.now() - this.startTime)/32 >= 1 + this.ticks){ // I think it naturally runs at 60 fps anyways due to requestAnimationFrame
		this.cls();
		this.render();
		this.ticks++;
	}
	
	this.gameLogic();
	this.updateAnims();
	this.gameManager.character.curLevelNum = this.curLevelNum;
	this.gameManager.character.curScreenIndex = this.curScreenIndex;
	this.gameManager.character.playerX = this.objects[0].x;
	this.gameManager.character.playerY = this.objects[0].y;
	this.recordCharacter();
	if(this.stateManager.stateNum == StateManager.states.GAME){
		window.requestAnimationFrame(this.loop.bind(this));
	} else {
		this.stateManager.followState();
	}

};



GameState.prototype.updatePositions = function(){
		if(this.command[this.A] && !isNaN(this.objects[0].aButtonItemIndex) && !this.objects[0].doingAction && (this.ticks - this.objects[0].lastActionGameTicks > (this.objects[0].inventory[this.objects[0].aButtonItemIndex].actionLength + this.objects[0].inventory[this.objects[0].aButtonItemIndex].recoveryLength))){
			this.objects[0].doingAction = true;
			this.objects[0].actionButton = "A"
			this.objects[0].lastActionGameTicks = this.ticks;
		} else if(this.command[this.LEFTMOVE] && !this.objects[0].doingAction){
			if(!(this.objects[0].x - this.objects[0].xSpeed < 0 && this.curScreenIndex % this.curLevel.NUMSCREENSWIDE == 0)){ // if not off the map
				if(!this.willCollideTiles(this.objects[0].x,this.objects[0].y,this.objects[0].width,this.objects[0].height, -this.objects[0].xSpeed,0)){
					this.objects[0].x -= this.objects[0].xSpeed;
				}
				this.objects[0].moveTicks++;
				this.objects[0].face = GameObject.LEFT;
				
			}
		} else if(this.command[this.RIGHTMOVE] && !this.objects[0].doingAction){
			if(!(this.objects[0].x + this.objects[0].width + this.objects[0].xSpeed > this.gameManager.GAMEWIDTH && (this.curScreenIndex % this.curLevel.NUMSCREENSWIDE == this.curLevel.NUMSCREENSWIDE-1))){
				if(!this.willCollideTiles(this.objects[0].x,this.objects[0].y,this.objects[0].width,this.objects[0].height,this.objects[0].xSpeed,0)){
					this.objects[0].x += this.objects[0].xSpeed;
				}
				this.objects[0].moveTicks++;
				this.objects[0].face = GameObject.RIGHT;
			}
		} else if(this.command[this.UPMOVE] && !this.objects[0].doingAction){
			if(!(this.objects[0].y - this.objects[0].ySpeed < 4*this.gameManager.TILEHEIGHT && this.curScreenIndex < this.curLevel.NUMSCREENSWIDE)){
				if(!this.willCollideTiles(this.objects[0].x,this.objects[0].y,this.objects[0].width,this.objects[0].height,0,-this.objects[0].ySpeed)){
					this.objects[0].y -= this.objects[0].ySpeed;
				}
				this.objects[0].moveTicks++;
				this.objects[0].face = GameObject.UP;
			}
		} else if(this.command[this.DOWNMOVE] && !this.objects[0].doingAction){
			if(!(this.objects[0].y + this.objects[0].height + this.objects[0].ySpeed > this.gameManager.GAMEHEIGHT && (this.curScreenIndex >= this.curLevel.NUMSCREENSWIDE*(this.curLevel.NUMSCREENSHIGH-1)))){
				if(!this.willCollideTiles(this.objects[0].x,this.objects[0].y,this.objects[0].width,this.objects[0].height,0,this.objects[0].ySpeed)){
					this.objects[0].y += this.objects[0].ySpeed;
				}
				this.objects[0].moveTicks++;
				this.objects[0].face = GameObject.DOWN;
			}
		}


};
GameState.prototype.updateControllingStates = function(){ // states which take control of the object like player attacking prevents user from interacting
	if(this.objects[0].doingAction){
		var time;
		if(this.objects[0].actionButton == "A"){
			time = this.objects[0].inventory[this.objects[0].aButtonItemIndex].actionLength;
		} else if(this.objects[0].actionButton == "B"){
			time = this.objects[0].inventory[this.objects[0].bButtonItemIndex].actionLength;
		} else {
			throw("Wrong action button");
		}
		if(this.ticks - this.objects[0].lastActionGameTicks < time){
			// swing sword, not animation
			
		} else {
			// hide sword
			this.objects[0].doingAction = false;
		}
	}
}
GameState.prototype.updateAnims = function(){
	if(this.objects[0].doingAction){
		var time;
		if(this.objects[0].actionButton == "A"){
			time = this.objects[0].inventory[this.objects[0].aButtonItemIndex].actionLength;
		} else if(this.objects[0].actionButton == "B"){
			time = this.objects[0].inventory[this.objects[0].bButtonItemIndex].actionLength;
		} else {
			throw("Wrong action button");
		}
		if(this.ticks - this.objects[0].lastActionGameTicks < time){
			// swing sword
			this.objects[0].curFrame = this.objects[0].face + 8;
		} 
	} else if(this.objects[0].moveTicks % 16 <= 7){
		this.objects[0].curFrame = 0 + this.objects[0].face*this.objects[0].numSprites;
	}  else {
		this.objects[0].curFrame = 1 + this.objects[0].face*this.objects[0].numSprites;
	}
};

GameState.prototype.checkCollisions = function(){
	for(var i = 0; i < this.objects.length-1; i++){ // object collisions with objects
		for(var j = i+1; j < this.objects.length; j++){
			if(this.objects[i].collidesWith(this.objects[j])){
				this.collisions.push(new Collision(this.objects[i],this.objects[j]));
			}
		}
	}
	// can also add collisions with tiles if necessary, but might be prudent just to add whatever 
	// tile needing colliding with as a transparent object over the tile
	
	// wall collisions :
	for(var i = 0; i < this.objects.length; i++){
		if(this.objects[i].x  < 0){ // left wall collision
			this.collisions.push(new Collision(this.objects[i],this.leftWall));
		} else if(this.objects[i].x + this.objects[i].width > this.gameManager.GAMEWIDTH){ // right wall collision
			this.collisions.push(new Collision(this.objects[i],this.rightWall));
		} else if(this.objects[i].y < 4*this.gameManager.TILEHEIGHT){ // top wall collision
			this.collisions.push(new Collision(this.objects[i],this.topWall));
		} else if(this.objects[i].y + this.objects[i].height> this.gameManager.GAMEHEIGHT){
			this.collisions.push(new Collision(this.objects[i],this.bottomWall));
		}
	}

};
GameState.prototype.actCollisions = function(){
	for(var i = this.collisions.length-1; i >= 0; i--){
		if(this.collisions[i].equals(new Collision(this.objects[0],this.topWall))){ // player and top wall
			if(this.curScreenIndex >= this.curLevel.NUMSCREENSWIDE){
				this.curScreenIndex -= this.curLevel.NUMSCREENSWIDE;
				this.tilesBottom = this.getTilesFromMap(this.curLevel.screen[this.curScreenIndex].tilesBottomMap,this.curLevel.tileSheet);
				this.tilesTop = this.getTilesFromMap(this.curLevel.screen[this.curScreenIndex].tilesTopMap,this.curLevel.tileSheet);
				this.objects[0].y = this.gameManager.GAMEHEIGHT-this.objects[0].height;
				this.objects = this.getCurScreenObjects(this.objects[0],this.curLevel.screen[this.curScreenIndex].objects);
			}
		} else if(this.collisions[i].equals(new Collision(this.objects[0],this.leftWall))){
			if(this.curScreenIndex % this.curLevel.NUMSCREENSWIDE > 0){
				this.curScreenIndex--;
				this.tilesBottom = this.getTilesFromMap(this.curLevel.screen[this.curScreenIndex].tilesBottomMap,this.curLevel.tileSheet);
				this.tilesTop = this.getTilesFromMap(this.curLevel.screen[this.curScreenIndex].tilesTopMap,this.curLevel.tileSheet);
				this.objects[0].x = this.gameManager.GAMEWIDTH-this.objects[0].width;
				this.objects = this.getCurScreenObjects(this.objects[0],this.curLevel.screen[this.curScreenIndex].objects);

			}
		} else if(this.collisions[i].equals(new Collision(this.objects[0],this.bottomWall))){
			if(this.curScreenIndex < this.curLevel.NUMSCREENSWIDE*(this.curLevel.NUMSCREENSHIGH-1)){
				this.curScreenIndex += this.curLevel.NUMSCREENSWIDE;
				this.tilesBottom = this.getTilesFromMap(this.curLevel.screen[this.curScreenIndex].tilesBottomMap,this.curLevel.tileSheet);
				this.tilesTop = this.getTilesFromMap(this.curLevel.screen[this.curScreenIndex].tilesTopMap,this.curLevel.tileSheet);
				this.objects[0].y = 4*this.gameManager.TILEHEIGHT;
				this.objects = this.getCurScreenObjects(this.objects[0],this.curLevel.screen[this.curScreenIndex].objects);

			}
		} else if(this.collisions[i].equals(new Collision(this.objects[0],this.rightWall))){
			if(this.curScreenIndex % this.curLevel.NUMSCREENSWIDE < this.curLevel.NUMSCREENSWIDE-1){
				this.curScreenIndex++;
				this.tilesBottom = this.getTilesFromMap(this.curLevel.screen[this.curScreenIndex].tilesBottomMap,this.curLevel.tileSheet);
				this.tilesTop = this.getTilesFromMap(this.curLevel.screen[this.curScreenIndex].tilesTopMap,this.curLevel.tileSheet);
				this.objects[0].x = 0;
				this.objects = this.getCurScreenObjects(this.objects[0],this.curLevel.screen[this.curScreenIndex].objects);

			}
			
		} 
		
		/*  would it be possible to do 
		var objectA = getObjectByType(typeA);
		var objectB = getObjectByType(typeB);
		objectA.actCollision(objectB);
		objectB.actCollision(objectA);
		
		that way all of the collision reactions wouldn't have to be coded into the gamestate file and the code would be better
		organized and distributed
		*/
		else if(this.collisions[i].typeEquals(GameObject.PLAYER,GameObject.WARP)){
			var warp = this.collisions[i].getByType(GameObject.WARP);
			this.curLevelNum = warp.toLevelNum;
			this.curLevel = this.chooseLevel(this.curLevelNum);
			this.curScreenIndex = warp.toScreenIndex;
			this.tilesBottom = this.getTilesFromMap(this.curLevel.screen[this.curScreenIndex].tilesBottomMap,this.curLevel.tileSheet);
			this.tilesTop = this.getTilesFromMap(this.curLevel.screen[this.curScreenIndex].tilesTopMap,this.curLevel.tileSheet);
			this.objects[0].x = warp.toX;
			this.objects[0].y = warp.toY;
			this.objects = this.getCurScreenObjects(this.objects[0],this.curLevel.screen[this.curScreenIndex].objects);
		} else if(this.collisions[i].typeEquals(GameObject.PLAYER,GameObject.TILEOBJECT)){
			
			var tileObject = this.collisions[i].getByType(GameObject.TILEOBJECT);
			switch(tileObject.tileType){
			case TileObject.SWORD: // can later change to wood sword
				if(!this.objects[0].inventoryContainsType(TileObject.SWORD)){
					tileObject.solid = false;
					if(this.objects[0].canAddToInventory()){
						var sword = new Sword(this.itemSpriteSheet);
						this.objects[0].addToInventory(sword);
						if(isNaN(this.objects[0].aButtonItemIndex)){
							this.objects[0].aButtonItemIndex = this.objects[0].inventory.length-1;
						} else if(isNaN(this.objects[0].bButtonItemIndex)){
							this.objects[0].bButtonItemIndex = this.objects[0].inventory.length-1;
						}
					}
				}
			break;
			}
			
		}
		
		
		
	}
	
	this.collisions.length = 0;
};

GameState.prototype.touchingTiles = function(object){
	
	/*
	 ----- ----- -----
	|  -  |    -|-    |
	|_|_|_|___|_|_|___|
	|     |    -|-    |
	|_____|_____|_____|
	
	
	Math.floor(object.y/32) can equal n
	Math.floor((object.y+object.height)/32) can equal n+1 or n
	
	^^ if the object dimensions are smaller than the tile dimensions
	*/
	var xCoords = [];

	xCoords.push(Math.floor(object.x/32));
	if(Math.floor(object.x/32) != Math.floor((object.x+object.width)/32)){
		xCoords.push(Math.floor((object.x+object.width)/32));
	}
	
	
	var yCoords = [];

	yCoords.push(Math.floor(object.y/32)-4);
	if(Math.floor(object.y/32)-4 != Math.floor((object.y+object.height)/32)-4){
		yCoords.push(Math.floor((object.y+object.height)/32)-4);
	}

	var tileNums = []; // indices of tiles
	for(var i = 0; i < xCoords.length; i++){
		for(var j = 0; j < yCoords.length; j++){
			tileNums.push(xCoords[i]+Level.SCREENWIDTH*yCoords[j]);
		}
	}
	
	return(tileNums);
	
	
};

GameState.prototype.willCollideTiles = function(x,y,w,h,dx,dy){
	if(x+w >= this.gameManager.GAMEWIDTH || x+w+dx >= this.gameManager.GAMEWIDTH){
		return false;
	}
	if(x <= 0 || x+dx <= 0){
		return false;
	}
	var touchingTiles = this.touchingTiles({x:x+dx,y:y+dy,width:w,height:h});
	for(var i = 0; i < touchingTiles.length; i++){
		
		if(this.curLevel.screen[this.curScreenIndex].collisionMap[touchingTiles[i]] == 1){
			
			return true;
		}
	}
	return false;
};


GameState.prototype.gameLogic = function(){
	this.checkCollisions();
	this.actCollisions();
	this.updatePositions()
	this.updateControllingStates();
	this.actObjectFlags();
};
GameState.prototype.actObjectFlags = function(){
	this.curLevel.actObjectFlags();
};
GameState.prototype.handleInput = function(){
	if(this.gameManager.keyUpped[this.gameManager.inputHandler.ESC]){
		this.gameManager.stateInfo.saveSelect = -1;
		this.gameManager.stateInfo.stateNum = StateManager.states.SAVESELECT;
		this.recordStateInfo();
		this.character = {};
		this.stateManager.stateNum = StateManager.states.SAVESELECT;
		this.gameManager.keyUpped[this.gameManager.inputHandler.ESC] = false;
	}
	if(this.gameManager.keyPressed[this.gameManager.inputHandler.A]){
		this.command[this.A] = true;
	}
	if(this.gameManager.keyUpped[this.gameManager.inputHandler.A]){
		this.command[this.A] = false;
		this.gameManager.keyUpped[this.gameManager.inputHandler.A] = false;
	}
	
	if(this.gameManager.keyPressed[this.gameManager.inputHandler.UP]){
		this.command[this.UPMOVE] = true;
	}
	if(this.gameManager.keyUpped[this.gameManager.inputHandler.UP]){
		this.command[this.UPMOVE] = false;
		this.gameManager.keyUpped[this.gameManager.inputHandler.UP] = false;
	}
	if(this.gameManager.keyPressed[this.gameManager.inputHandler.DOWN]){
		this.command[this.DOWNMOVE] = true;
	}
	if(this.gameManager.keyUpped[this.gameManager.inputHandler.DOWN]){
		this.command[this.DOWNMOVE] = false;
		this.gameManager.keyUpped[this.gameManager.inputHandler.DOWN] = false;
	}
	if(this.gameManager.keyPressed[this.gameManager.inputHandler.LEFT]){
		this.command[this.LEFTMOVE] = true;
	}
	if(this.gameManager.keyUpped[this.gameManager.inputHandler.LEFT]){
		this.command[this.LEFTMOVE] = false;
		this.gameManager.keyUpped[this.gameManager.inputHandler.LEFT] = false;
	}
	if(this.gameManager.keyPressed[this.gameManager.inputHandler.RIGHT]){
		this.command[this.RIGHTMOVE] = true;
	}
	if(this.gameManager.keyUpped[this.gameManager.inputHandler.RIGHT]){
		this.command[this.RIGHTMOVE] = false;
		this.gameManager.keyUpped[this.gameManager.inputHandler.RIGHT] = false;
	}
	
};
GameState.prototype.renderHUD = function(){
	this.gameManager.renderer.drawRect(0,0,this.gameManager.GAMEWIDTH,4*this.gameManager.TILEHEIGHT,"#000000");
	for(var i = 0; i < this.curLevel.NUMSCREENSWIDE*(this.curLevel.NUMSCREENSHIGH);i++){
		if(i == this.curScreenIndex){
			this.gameManager.renderer.drawRect(12*(i%this.curLevel.NUMSCREENSWIDE)+30,12*Math.floor(i/this.curLevel.NUMSCREENSWIDE)+35,12,12,"#FF0000");
		} else {
			if(this.curLevel.screens[this.curScreenIndex] > -1){
				this.gameManager.renderer.drawRect(12*(i%this.curLevel.NUMSCREENSWIDE)+30,12*Math.floor(i/this.curLevel.NUMSCREENSWIDE)+35,12,12,"#777777");
			}
		}
	}
	
	var ABItemsX = 300;
	var ABItemsY = 30;
	this.gameManager.renderer.drawBorderRect(ABItemsX,ABItemsY,32,64,"#FFFFFF");
	this.gameManager.renderer.drawText(ABItemsX+8,ABItemsY-3,24,"A","#FF0000");
	this.gameManager.renderer.drawBorderRect(ABItemsX+60,ABItemsY,32,64,"#FFFFFF");
	this.gameManager.renderer.drawText(ABItemsX+68,ABItemsY-3,24,"B","#FF0000");
	
	
	if(!isNaN(this.objects[0].aButtonItemIndex)){
		var aButtonItem = this.objects[0].inventory[this.objects[0].aButtonItemIndex];
		this.gameManager.renderer.drawByTile(ABItemsX,ABItemsY+16,32,32,aButtonItem.tileSheet,0,0);
	}
};

GameState.prototype.render = function(){
	this.renderTiles();
	this.renderObjects();
	this.renderHUD();
};
GameState.prototype.getTilesFromMap = function(map,spriteSheet){
	var tilesWide = this.gameManager.GAMEWIDTH/this.gameManager.TILEWIDTH;
	var tilesHeight = this.gameManager.GAMEHEIGHT/this.gameManager.TILEHEIGHT;
	var tiles = [];
	for(var i = 0; i < map.length; i++){
		var x = this.gameManager.TILEWIDTH*(i%tilesWide);
		var y = Math.floor(i/tilesWide)*this.gameManager.TILEHEIGHT + 4*this.gameManager.TILEHEIGHT;
		tiles.push(new Tile(x,y,this.gameManager.TILEWIDTH,this.gameManager.TILEHEIGHT,spriteSheet,map[i],1));
	}
	return tiles;
};
GameState.prototype.getCurScreenObjects = function(player,screenNum){
	var objects = [];
	objects.push(player);
	var screenObjects = this.curLevel.screen[this.curScreenIndex].objects
	for(var i = 0; i < screenObjects.length; i++){
		objects.push(screenObjects[i]);
	}
	return objects;
};
GameState.prototype.chooseLevel = function(levelNum){
	switch(levelNum){
	case Level.MAINLEVEL:
		return new MainLevel(this.gameManager);
		break;
	case Level.DUNGEONONE:
		return new DungeonOne(this.gameManager);
		break;
		
	}
};