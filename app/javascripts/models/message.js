var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var MESSAGE_CHANGE_EVENT = 'message_change_event';
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
	var MessageApp = _.extend(new EventEmitter(), {

		addMessage: function(content) {
			messages.push({
				id: uuid(),
				content: content,
			});

			this.emitChange();
		},
		getMessages: function() {
			return messages;
		},
		emitChange: function() {
			this.emit(MESSAGE_CHANGE_EVENT);
		},

		/**
		 * @param {function} callback
		 */
		addChangeListener: function(callback) {
			this.on(MESSAGE_CHANGE_EVENT, callback);
		},

		/**
		 * @param {function} callback
		 */
		removeChangeListener: function(callback) {
			this.removeListener(MESSAGE_CHANGE_EVENT, callback);
		},

	});
	return MessageApp;
}