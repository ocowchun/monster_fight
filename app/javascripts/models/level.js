var Level = function() {

	var system = {},
		currentLevel = 1,
		currentExp = 0;
	system.addExp = function(exp) {
		currentExp += exp;
		var levelUp = currentExp > 100;
		if (levelUp) {
			currentExp = currentExp - 100;
			currentLevel = currentLevel + 1;
		}
		return {
			"currentLevel": currentLevel,
			"currentExp": currentExp,
			"levelUp": levelUp
		}
	};

	system.getLevel = function() {
		return currentLevel;
	};

	system.getExp = function() {
		return currentExp;
	};

	return system;
}

module.exports = Level;