function GameContinueState(stateManager,gameManager){
	this.stateManager = stateManager;
	this.gameManager = gameManager;
	
}
GameContinueState.prototype = Object.create(State.prototype);

GameContinueState.prototype.setup = function(){
	this.tilesBottom = [];
	this.tilesTop = [];
	this.objects = [];
};

GameContinueState.prototype.loop = function(){
	this.cls();
	this.render();
	
	this.recordStateInfo();
	if(this.stateManager.stateNum == StateManager.states.GAMECONTINUE){
		window.requestAnimationFrame(this.loop.bind(this));
	} else {
		this.stateManager.followState();
	}
};

