function StateManager(curStateNum,gameManager){
	this.stateNum = curStateNum;
	this.state;
	this.gameManager = gameManager;
		
}

StateManager.states = {
		STARTSCREEN: 0,
		SAVESELECT : 1,
		NAMESELECT : 2,
		GAME : 3,
		GAMECONTINUE : 4
};

StateManager.prototype.followState = function(){
	switch(this.stateNum){
		case StateManager.states.STARTSCREEN:
			this.state = new StartScreenState(this,this.gameManager);
			this.state.setup();
			this.state.loop();
			break;
		case StateManager.states.SAVESELECT:
			this.state = new SaveSelectState(this,this.gameManager);
			this.state.setup();
			this.state.loop();
			break;
		case StateManager.states.NAMESELECT:
			this.state = new NameSelectState(this,this.gameManager);
			this.state.setup();
			this.state.loop();
			break;
		case StateManager.states.GAME:
			this.state = new GameState(this,this.gameManager);
			this.state.setup();
			this.state.loop();
			break;
		case StateManager.states.GAMECONTINUE:
			this.state = new GameContinueState(this,this.gameManager);
			this.state.setup();
			this.state.loop();
			break;
		default:
			console.log("OUT OF STATE");
			break;
	}
};