var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var GAME_STATUS_CHANGE_EVENT = 'game_status_change_event';
var monster = require('./monster');
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
	var messages = [];
	var actor = monster();
	var GameApp = _.extend(new EventEmitter(), {

		walk: function() {
			// var place = ["平原", "沙漠", "森林"]
			// var message = "走在" + _.shuffle(place)[0];
			// var fate = _.random(0, 100);
			// if (fate > 80) {
			// 	message = "遇到怪物";
			// }
			// GameApp.addMessage(message);
			this.fight();
		},
		fight: function() {
			// body...
			actor.attack();
		},
		getCurrentHp: function() {
			return actor.getCurrentHp();
		},
		addMessage: function(content) {
			messages.push({
				id: uuid(),
				content: content,
			});
			var e = {
				message: content
			};
			this.emitChange(e);
		},
		getMessages: function() {
			return messages;
		},
		emitChange: function(e) {
			this.emit(GAME_STATUS_CHANGE_EVENT, e);
		},

		/**
		 * @param {function} callback
		 */
		addChangeListener: function(callback) {
			this.on(GAME_STATUS_CHANGE_EVENT, callback);
		},

		/**
		 * @param {function} callback
		 */
		removeChangeListener: function(callback) {
			this.removeListener(GAME_STATUS_CHANGE_EVENT, callback);
		},

	});

	actor.addChangeListener(function(e) {
		GameApp.addMessage(e.message);
	})
	return GameApp;
}