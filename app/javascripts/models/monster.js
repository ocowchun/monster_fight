var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var MONSTER_CHANGE_EVENT = 'monster_change_event';
var Level = require('./level');
// var appState = require('.././constants/TodoConstant');


var uuid = function() {
	/*jshint bitwise:false */
	var i, random;
	var uuid = '';

	for (i = 0; i < 32; i++) {
		random = Math.random() * 16 | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			uuid += '-';
		}
		uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
			.toString(16);
	}

	return uuid;
};

// new EventEmitter()
module.exports = function() {
	var maxHp = 100,
		currentHp = 100,
		level = new Level();

	var dice = function() {
		return _.random(0, 100);
	};
	var monsterApp = _.extend(new EventEmitter(), {

		attack: function(monster) {
			var e = {}
			var d = dice();
			if (d > 50) {

				e.message = "打倒怪獸";
				var levelState = level.addExp(Math.floor(d / 10));
				if (levelState.levelUp) {
					currentHp = 100;
					e.message += ",Level UP!";
				}
			} else {
				currentHp = currentHp - d;
				e.message = "受到攻擊，減少" + d + "hp";
			}
			e.currentState = this.getCurrentState();
			return e;
		},
		getCurrentState: function() {
			return {
				"hp": currentHp,
				"level": level.getLevel(),
				"exp": level.getExp()
			};
		},
		emitChange: function(e) {
			this.emit(MONSTER_CHANGE_EVENT, e);
		},

		/**
		 * @param {function} callback
		 */
		addChangeListener: function(callback) {
			this.on(MONSTER_CHANGE_EVENT, callback);
		},

		/**
		 * @param {function} callback
		 */
		removeChangeListener: function(callback) {
			this.removeListener(MONSTER_CHANGE_EVENT, callback);
		},

	});
	return monsterApp;
}