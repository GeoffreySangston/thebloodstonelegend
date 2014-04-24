function Collision(A,B){
	this.objectA = A;
	this.objectB = B;
}

Collision.prototype.equals = function(oc){
	return (this.objectA == oc.objectA && this.objectB == oc.objectB) || (this.objectA == oc.objectB && this.objectB == oc.objectA);
}

Collision.prototype.typeEquals = function (typeOne,typeTwo){
	return ((this.objectA.type == typeOne && this.objectB.type == typeTwo) || (this.objectA.type == typeTwo && this.objectB.type == typeOne));
};

Collision.prototype.getByType = function(type){
	if(this.objectA.type == type){
		return this.objectA;
	} else if(this.objectB.type == type){
		return this.objectB;
	} else {
		return null;
	}
};