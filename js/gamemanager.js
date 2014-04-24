function GameManager(HTMLHandler,InputHandler,Renderer,AssetManager,LocalStorageManager){

	this.GAMEWIDTH = 640;
	this.GAMEHEIGHT = 480;
	
	this.TILEWIDTH = 32;
	this.TILEHEIGHT = 32;
	
	this.htmlHandler = new HTMLHandler;
	this.inputHandler = new InputHandler;
	this.renderer = new Renderer(this.htmlHandler.gameWindow,this.htmlHandler.gameContext);
	this.assetManager = new AssetManager();
	this.localStorageManager = new LocalStorageManager();
	
	// stateInfo should hold currentCharacter then currentCharacter should hold everything else
	if(this.localStorageManager.getStateInfo()){
		this.stateInfo = this.localStorageManager.getStateInfo();
		console.log("LOL");
		if(this.stateInfo.saveSelect > -1){
			
			switch(this.stateInfo.saveSelect){
			case 0:
				this.character = this.localStorageManager.getCharacterOne();
				break;
			case 1:
				this.character = this.localStorageManager.getCharacterTwo();
				break;
			case 2:
				this.character = this.localStorageManager.getCharacterThree();
				break;
			}
		}
		this.mainStateManager = new StateManager(this.stateInfo.stateNum,this);
	} else {
		this.stateInfo = {};
		this.stateInfo.saveSelect = -1;
		this.character;
		
		this.mainStateManager = new StateManager(StateManager.states.STARTSCREEN,this);
	}

	
	this.inputHandler.on("keydown",this.keyDown.bind(this));
	this.inputHandler.on("keyup",this.keyUp.bind(this));

	this.keyPressed = {
		0 : false,
		1 : false,
		2 : false,
		3 : false,
		4 : false,
		5 : false,
		6 : false,
		7 : false,
		8 : false
	};
	this.keyUpped = {
		0 : false,
		1 : false,
		2 : false,
		3 : false,
		4 : false,
		5 : false,
		6 : false,
		7 : false,
		8 : false
	};
	
	this.htmlHandler.setGameSize(this.GAMEWIDTH,this.GAMEHEIGHT);
	
	this.assetManager.queueDownload('img/startScreenTileSheet.png');
	this.assetManager.queueDownload('img/saveSelectTileSheet.png');
	this.assetManager.queueDownload('img/nameSelectTileSheet.png');
	this.assetManager.queueDownload('img/playerTileSheet.png');
	this.assetManager.queueDownload('img/itemTileSheet.png');
	this.assetManager.queueDownload('img/mainLevelTileSheet.png');
	this.assetManager.queueDownload('img/dungeonOneTileSheet.png');
	this.assetManager.downloadAll(this.mainStateManager.followState.bind(this.mainStateManager)); // this.mainStateManager.followState call back
	

}

GameManager.prototype.keyDown = function(key){
	
	switch(key){
	case this.inputHandler.UP:
		
		this.keyPressed[key] = true;
		break;
	case this.inputHandler.RIGHT:
		this.keyPressed[key] = true;
		break;
	case this.inputHandler.DOWN:
		this.keyPressed[key] = true;
		break;
	case this.inputHandler.LEFT:
		this.keyPressed[key] = true;
		break;
	case this.inputHandler.D:
		this.keyPressed[key] = true;
		break;
	case this.inputHandler.S:
		this.keyPressed[key] = true;
		break;
	case this.inputHandler.A:
		this.keyPressed[key] = true;
		break;
	case this.inputHandler.P:
		this.keyPressed[key] = true;
		break;
	case this.inputHandler.ESC:
		this.keyPressed[key] = true;
		break;
	default:
		break;
	}
}
GameManager.prototype.keyUp = function(key){

	switch(key){
	case this.inputHandler.UP:
		this.keyPressed[key] = false;
		this.keyUpped[key] = true;
		break;
	case this.inputHandler.RIGHT:
		this.keyPressed[key] = false;
		this.keyUpped[key] = true;
		break;
	case this.inputHandler.DOWN:
		this.keyPressed[key] = false;
		this.keyUpped[key] = true;
		break;
	case this.inputHandler.LEFT:
		this.keyPressed[key] = false;
		this.keyUpped[key] = true;
		break;
	case this.inputHandler.D:
		this.keyPressed[key] = false;
		this.keyUpped[key] = true;
		break;
	case this.inputHandler.S:
		this.keyPressed[key] = false;
		this.keyUpped[key] = true;
		break;
	case this.inputHandler.A:
		this.keyPressed[key] = false;
		this.keyUpped[key] = true;
		break;
	case this.inputHandler.P:
		this.keyPressed[key] = false;
		this.keyUpped[key] = true;
		break;
	case this.inputHandler.ESC:
		this.keyPressed[key] = false;
		this.keyUpped[key] = true;
		break;
	default:
		break;
	}
}

