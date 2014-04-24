function Renderer(gameWindow,gameContext){
	this.canvas = gameWindow;
	this.context = gameContext;
	
	
}
var drawn = false;
Renderer.prototype.draw = function(object){
	//console.log(object.tileSheet,(object.spritePos+object.curFrame*object.width/32)*32,0,object.width,object.height,object.x,object.y,object.width,object.height);
	this.context.drawImage(object.tileSheet,(object.spritePos+object.curFrame*object.width/32)*32,0,object.width,object.height,object.x,object.y,object.width,object.height);

};
Renderer.prototype.drawByTile = function(x,y,width,height,tileSheet,sheetPosX,sheetPosY){
	this.context.drawImage(tileSheet,sheetPosX,sheetPosY,width,height,x,y,width,height);
};
Renderer.prototype.drawRect = function(x,y,w,h,color){
	this.context.fillStyle = color;
	this.context.fillRect(x,y,w,h);
};
Renderer.prototype.drawBorderRect = function(x,y,w,h,color){
	this.context.strokeStyle = color;
	this.context.strokeRect(x,y,w,h);
}
Renderer.prototype.drawText = function(x,y,size,text,color){
	this.context.font = size + "px verdana";
	this.context.fillStyle = color;
	this.context.fillText(text,x,y);
};
Renderer.prototype.cls = function(width,height){
	this.context.clearRect(0,0,width,height);
};
