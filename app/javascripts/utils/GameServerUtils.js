'use strict';
var monster = require('./../models/monster');
var GameServerActions = require('./../actions/GameServerActions');

function simCb(f) {
	setTimeout(f, 0);
}

function createServer() {
	var actor = monster();
	var server = {};
	server.excuteWalk = function() {
	}
	server.excuteFight = function() {
		var status = actor.attack();
		simCb(function() {
			GameServerActions.receiveGameStatus(status);
		});
	}

	return server;
}

module.exports = createServer();

// var s = createServer();
// s.excuteFight();