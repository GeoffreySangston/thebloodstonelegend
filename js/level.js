function Level(gameManager){
	this.gameManager = gameManager;
	this.tileSheet;
	this.screens;
	this.screen;
}

Level.prototype.initScreenArray = function(){
	this.screen = [];
	for(var i = 0; i < this.screens.length; i++){
		if(!this.screen[this.screens[i]] && this.screens[i] > -1){
			this.screen[this.screens[i]] = {};
		}
	}
};
Level.SCREENWIDTH = 20;
Level.SCREENHEIGHT = 15;

Level.MAINLEVEL = 0;
Level.DUNGEONONE = 1;

// collisionMap: 0 for no collision, 1 for collision

Level.prototype.actObjectFlags = function(){
	var state = this.gameManager.mainStateManager.state;
	for(var i = state.objects.length-1; i>=0; i--){
		switch(state.objects[i].type){
		default:
			break;
		}
	}
};