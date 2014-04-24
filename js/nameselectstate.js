function NameSelectState(stateManager,gameManager){
	this.stateManager = stateManager;
	this.gameManager = gameManager;
	
	
	this.currentKeyboardLetter = 0;
	this.letterArray = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M","<-","END"];
	this.name = "";
	this.currentNameLetter = 0;
}
NameSelectState.prototype = Object.create(State.prototype);

NameSelectState.prototype.setup = function(){
	this.spriteSheet = this.gameManager.assetManager.cache['img/nameSelectTileSheet.png'];

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
	var boardX = this.gameManager.GAMEWIDTH/2 - 10*32/2;
	var boardY = 250;
	
	this.objects.push(new GameObject(boardX+32*0,boardY+32*0,32,32,this.spriteSheet,2,2,"Q",9,22,16));
	this.objects.push(new GameObject(boardX+32*1,boardY+32*0,32,32,this.spriteSheet,2,2,"W",9,22,16));
	this.objects.push(new GameObject(boardX+32*2,boardY+32*0,32,32,this.spriteSheet,2,2,"E",9,22,16));
	this.objects.push(new GameObject(boardX+32*3,boardY+32*0,32,32,this.spriteSheet,2,2,"R",9,22,16));
	this.objects.push(new GameObject(boardX+32*4,boardY+32*0,32,32,this.spriteSheet,2,2,"T",9,22,16));
	this.objects.push(new GameObject(boardX+32*5,boardY+32*0,32,32,this.spriteSheet,2,2,"Y",9,22,16));
	this.objects.push(new GameObject(boardX+32*6,boardY+32*0,32,32,this.spriteSheet,2,2,"U",9,22,16));
	this.objects.push(new GameObject(boardX+32*7,boardY+32*0,32,32,this.spriteSheet,2,2,"I",9,22,16));
	this.objects.push(new GameObject(boardX+32*8,boardY+32*0,32,32,this.spriteSheet,2,2,"O",9,22,16));
	this.objects.push(new GameObject(boardX+32*9,boardY+32*0,32,32,this.spriteSheet,2,2,"P",9,22,16));
	
	this.objects.push(new GameObject(boardX+32*0+32/2,boardY+32*1,32,32,this.spriteSheet,2,2,"A",9,22,16));
	this.objects.push(new GameObject(boardX+32*1+32/2,boardY+32*1,32,32,this.spriteSheet,2,2,"S",9,22,16));
	this.objects.push(new GameObject(boardX+32*2+32/2,boardY+32*1,32,32,this.spriteSheet,2,2,"D",9,22,16));
	this.objects.push(new GameObject(boardX+32*3+32/2,boardY+32*1,32,32,this.spriteSheet,2,2,"F",9,22,16));
	this.objects.push(new GameObject(boardX+32*4+32/2,boardY+32*1,32,32,this.spriteSheet,2,2,"G",9,22,16));
	this.objects.push(new GameObject(boardX+32*5+32/2,boardY+32*1,32,32,this.spriteSheet,2,2,"H",9,22,16));
	this.objects.push(new GameObject(boardX+32*6+32/2,boardY+32*1,32,32,this.spriteSheet,2,2,"J",9,22,16));
	this.objects.push(new GameObject(boardX+32*7+32/2,boardY+32*1,32,32,this.spriteSheet,2,2,"K",9,22,16));
	this.objects.push(new GameObject(boardX+32*8+32/2,boardY+32*1,32,32,this.spriteSheet,2,2,"L",9,22,16));
	
	this.objects.push(new GameObject(boardX+32*0+32/2,boardY+32*2,32,32,this.spriteSheet,2,2,"Z",9,22,16));
	this.objects.push(new GameObject(boardX+32*1+32/2,boardY+32*2,32,32,this.spriteSheet,2,2,"X",9,22,16));
	this.objects.push(new GameObject(boardX+32*2+32/2,boardY+32*2,32,32,this.spriteSheet,2,2,"C",9,22,16));
	this.objects.push(new GameObject(boardX+32*3+32/2,boardY+32*2,32,32,this.spriteSheet,2,2,"V",9,22,16));
	this.objects.push(new GameObject(boardX+32*4+32/2,boardY+32*2,32,32,this.spriteSheet,2,2,"B",9,22,16));
	this.objects.push(new GameObject(boardX+32*5+32/2,boardY+32*2,32,32,this.spriteSheet,2,2,"N",9,22,16));
	this.objects.push(new GameObject(boardX+32*6+32/2,boardY+32*2,32,32,this.spriteSheet,2,2,"M",9,22,16));
	this.objects.push(new GameObject(boardX+32*7+32/2,boardY+32*2,32,32,this.spriteSheet,2,2,"<-",3,22,16));
	this.objects.push(new GameObject(boardX+32*8+32/2,boardY+32*2,32,32,this.spriteSheet,2,2,"END",3,22,12));
	
	// KEYBOARD DONE
	
	var nameX = this.gameManager.GAMEWIDTH/2 - 5*32/2;
	var nameY = 50;
	
	this.objects.push(new GameObject(nameX+32*0,nameY,32,32,this.spriteSheet,2,1));
	this.objects.push(new GameObject(nameX+32*1,nameY,32,32,this.spriteSheet,2,1));
	this.objects.push(new GameObject(nameX+32*2,nameY,32,32,this.spriteSheet,2,1));
	this.objects.push(new GameObject(nameX+32*3,nameY,32,32,this.spriteSheet,2,1));
	this.objects.push(new GameObject(nameX+32*4,nameY,32,32,this.spriteSheet,2,1));
	
};

NameSelectState.prototype.loop = function(){
	this.cls();
	this.render();
	this.handleCurrentKeyboardLetter();
	this.handleInput();
	
	this.recordStateInfo();
	if(this.stateManager.stateNum == StateManager.states.NAMESELECT){
		window.requestAnimationFrame(this.loop.bind(this));
	} else {
		this.stateManager.followState();
	}
};

NameSelectState.prototype.handleCurrentKeyboardLetter = function(){
	for(var i = 0; i < this.letterArray.length; i++){
		if(this.currentKeyboardLetter == i){
			this.objects[i].curFrame = 1;
		} else {
			this.objects[i].curFrame = 0;
		}
	}
};

NameSelectState.prototype.handleInput = function(){
	if(this.gameManager.keyUpped[this.gameManager.inputHandler.A]){
		if(this.letterArray[this.currentKeyboardLetter] == "END"){
			this.gameManager.stateInfo.stateNum = StateManager.states.GAME;
			this.recordStateInfo();
			this.gameManager.character.name = this.name;
			this.recordCharacter();
			this.stateManager.stateNum = StateManager.states.GAME;
		} else if(this.letterArray[this.currentKeyboardLetter] == "<-"){
			if(this.name.length > 0){
				this.name = this.name.substr(0,this.name.length-1);
				this.currentNameLetter--;
				this.objects[this.letterArray.length + this.currentNameLetter].setText(this.name.substr(this.currentNameLetter,this.currentNameLetter+1),9,22,16);
				
			}
		} else {
			if(this.name.length < 5){
				this.name += this.letterArray[this.currentKeyboardLetter];
				this.objects[this.letterArray.length + this.currentNameLetter].setText(this.name.substr(this.currentNameLetter,this.currentNameLetter+1),9,22,16);
				this.currentNameLetter++;
			}
		}
		console.log(this.name);
		this.gameManager.keyUpped[this.gameManager.inputHandler.A] = false;
	}
	if(this.gameManager.keyPressed[this.gameManager.inputHandler.LEFT]){
		if(this.currentKeyboardLetter > 0){
			this.currentKeyboardLetter--;
		}
		this.gameManager.keyPressed[this.gameManager.inputHandler.LEFT] = false;
	}
	if(this.gameManager.keyPressed[this.gameManager.inputHandler.RIGHT]){
		if(this.currentKeyboardLetter < 27){
			this.currentKeyboardLetter++;
		}
		this.gameManager.keyPressed[this.gameManager.inputHandler.RIGHT] = false;
	}
	if(this.gameManager.keyPressed[this.gameManager.inputHandler.DOWN]){
		if(this.currentKeyboardLetter < 9){
			this.currentKeyboardLetter += 10;
		} else if(this.currentKeyboardLetter == 9){
			this.currentKeyboardLetter += 9;
		} else if(this.currentKeyboardLetter < 18){
			this.currentKeyboardLetter += 9;
		} else if(this.currentKeyboardLetter == 18){
			this.currentKeyboardLetter += 9;
		}
	
		this.gameManager.keyPressed[this.gameManager.inputHandler.DOWN] = false;
	}
	if(this.gameManager.keyPressed[this.gameManager.inputHandler.UP]){
		if(this.currentKeyboardLetter > 18){
			this.currentKeyboardLetter -= 9;
		} else if(this.currentKeyboardLetter > 9){
			this.currentKeyboardLetter -= 10;
		} 
		this.gameManager.keyPressed[this.gameManager.inputHandler.UP] = false;
	}
	
	if(this.gameManager.keyUpped[this.gameManager.inputHandler.ESC]){
		this.gameManager.stateInfo.saveSelect = -1;
		this.gameManager.stateInfo.stateNum = StateManager.states.SAVESELECT;
		this.recordStateInfo();
		this.stateManager.stateNum = StateManager.states.SAVESELECT;
		this.gameManager.keyUpped[this.gameManager.inputHandler.ESC] = false;
	}
};

