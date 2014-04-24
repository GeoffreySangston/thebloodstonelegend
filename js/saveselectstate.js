function SaveSelectState(stateManager,gameManager){
	this.stateManager = stateManager;
	this.gameManager = gameManager;
	
	this.currentSaveSelect = 0;
	this.numSaveSelects = 3;
	
}
SaveSelectState.prototype = Object.create(State.prototype);

SaveSelectState.prototype.setup = function(){
	this.spriteSheet = this.gameManager.assetManager.cache['img/saveSelectTileSheet.png'];
	
	var tilesBottomMap = [
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];
	
	var tilesTopMap = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	];

	this.tilesBottom = this.getTilesFromMap(tilesBottomMap,this.spriteSheet);
	this.tilesTop = this.getTilesFromMap(tilesTopMap,this.spriteSheet);
	this.objects = [];
	
	var menusX = this.gameManager.GAMEWIDTH/2 - 5*32/2;
	var menusY = 130;
	
	this.objects.push(new GameObject(menusX,menusY,5*32,32,this.spriteSheet,2,2,"Character 1",20,24,20));
	this.objects.push(new GameObject(menusX,menusY+75,5*32,32,this.spriteSheet,2,2,"Character 2",20,24,20));
	this.objects.push(new GameObject(menusX,menusY+150,5*32,32,this.spriteSheet,2,2,"Character 3",20,24,20));
	
	
	

};

SaveSelectState.prototype.loop = function(){
	this.cls();
	this.render();
	this.handleInput();
	this.handleSaveSelect();
	
	if(this.stateManager.stateNum == StateManager.states.SAVESELECT){
		window.requestAnimationFrame(this.loop.bind(this));
	} else {
		this.stateManager.followState();
	}
};
SaveSelectState.prototype.handleSaveSelect = function(){
	switch(this.currentSaveSelect){
	case 0:
		this.objects[0].curFrame = 1;
		this.objects[1].curFrame = 0;
		this.objects[2].curFrame = 0;
		break;
	case 1:
		this.objects[0].curFrame = 0;
		this.objects[1].curFrame = 1;
		this.objects[2].curFrame = 0;
		break;
	case 2:
		this.objects[0].curFrame = 0;
		this.objects[1].curFrame = 0;
		this.objects[2].curFrame = 1;
		break;
	}
};
SaveSelectState.prototype.handleInput = function(){
	if(this.gameManager.keyPressed[this.gameManager.inputHandler.UP]){
		if(this.currentSaveSelect <= 0){
			this.currentSaveSelect = 2;
		} else {
			this.currentSaveSelect = (this.currentSaveSelect-1)%this.numSaveSelects;
		}
		this.gameManager.keyPressed[this.gameManager.inputHandler.UP] = false;
	}
	if(this.gameManager.keyPressed[this.gameManager.inputHandler.DOWN]){
		this.currentSaveSelect = (this.currentSaveSelect+1)%this.numSaveSelects;
		this.gameManager.keyPressed[this.gameManager.inputHandler.DOWN] = false;
	}
	if(this.gameManager.keyUpped[this.gameManager.inputHandler.A]){
		this.gameManager.stateInfo.saveSelect = this.currentSaveSelect;
		if(this.getCharacter(this.gameManager.stateInfo.saveSelect) && this.getCharacter(this.gameManager.stateInfo.saveSelect).name){
			this.gameManager.stateInfo.stateNum = StateManager.states.GAME;
			this.recordStateInfo();
			this.gameManager.character = this.getCharacter(this.gameManager.stateInfo.saveSelect);
			this.stateManager.stateNum = StateManager.states.GAME;
		} else {
			this.gameManager.stateInfo.stateNum = StateManager.states.NAMESELECT;
			this.recordStateInfo();
			this.gameManager.character = {};
			this.recordCharacter();
			this.stateManager.stateNum = StateManager.states.NAMESELECT;
		}
		this.gameManager.keyUpped[this.gameManager.inputHandler.A] = false;
	}
	if(this.gameManager.keyUpped[this.gameManager.inputHandler.ESC]){
		this.gameManager.stateInfo.saveSelect = -1;
		this.gameManager.stateInfo.stateNum = StateManager.states.STARTSCREEN;
		this.recordStateInfo();
		this.stateManager.stateNum = StateManager.states.STARTSCREEN;
		this.gameManager.keyUpped[this.gameManager.inputHandler.ESC] = false;
	}
};
