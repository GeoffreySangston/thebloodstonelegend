window.fakeStorage = {
	_data: {},

	setItem: function (id, val) {
		return this._data[id] = String(val);
	},

	getItem: function (id) {
		return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
	},

	removeItem: function (id) {
		return delete this._data[id];
	},

	clear: function () {
		return this._data = {};
	}
};
	
function LocalStorageManager() {
	this.stateInfoKey		 = "stateInfo";
	this.characterOneKey = "characterOne";
	this.characterTwoKey = "characterTwo";
	this.characterThreeKey = "characterThree";
	var supported = this.localStorageSupported();
	this.storage = supported ? window.localStorage : window.fakeStorage;
	
}

LocalStorageManager.prototype.localStorageSupported = function () {
	var testKey = "test";
	var storage = window.localStorage;

	try {
		storage.setItem(testKey, "1");
		storage.removeItem(testKey);
		return true;
	} catch (error) {
		return false;
	}
};




LocalStorageManager.prototype.getStateInfo = function () {
	var stateJSON = this.storage.getItem(this.stateInfoKey);
	return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setStateInfo = function (stateInfo) {
	this.storage.setItem(this.stateInfoKey, JSON.stringify(stateInfo));
};

LocalStorageManager.prototype.getCharacterOne = function () {
	var stateJSON = this.storage.getItem(this.characterOneKey);
	return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setCharacterOne = function (character) {
	this.storage.setItem(this.characterOneKey, JSON.stringify(character));
};

LocalStorageManager.prototype.getCharacterTwo = function () {
	var stateJSON = this.storage.getItem(this.characterTwoKey);
	return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setCharacterTwo = function (character) {
	this.storage.setItem(this.characterTwoKey, JSON.stringify(character));
};

LocalStorageManager.prototype.getCharacterThree = function () {
	var stateJSON = this.storage.getItem(this.characterThreeKey);
	return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setCharacterThree = function (character) {
	this.storage.setItem(this.characterThreeKey, JSON.stringify(character));
};

