function InputHandler(){
	this.events = {};
	this.UP = 0;
	this.RIGHT = 1;
	this.DOWN = 2;
	this.LEFT = 3;
	this.A = 4;
	this.S = 5;
	this.D = 6;
	this.P = 7;
	this.ESC = 8;

	this.listen();
}

InputHandler.prototype.listen = function(){
	var self = this;
	
	var map = {
   	 	38: this.UP, // up key
    	39: this.RIGHT, // right key
    	40: this.DOWN, // down key
    	37: this.LEFT, // left key
    	68: this.D, // d
    	83: this.S, // s
    	65: this.A, // a
    	80: this.P, // p
    	27: this.ESC
  };
	
	
	
	document.addEventListener('keydown',function(e){
		var modifiers = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
		var mapped = map[e.which];
		
		if(!modifiers){
			
			if(mapped !== undefined){
				e.preventDefault();
				self.emit("keydown", mapped);
			}
		}
	});
	document.addEventListener('keyup',function(e){
		var modifiers = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
		var mapped = map[e.which];
		if(!modifiers){
			
			if(mapped !== undefined){
				e.preventDefault();
				self.emit("keyup", mapped);
			}
		}
	});
	
}

InputHandler.prototype.on = function(event, callback){
	if(!this.events[event]){
		this.events[event] = [];
	}
	this.events[event].push(callback);
};
InputHandler.prototype.emit = function (event, data) {
	var callbacks = this.events[event];
	if (callbacks) {
		callbacks.forEach(function (callback) {
			callback(data);
		});
	}
};