var keyMirror = require('react/lib/keyMirror');
module.exports = {
	PayloadSources: keyMirror({
		VIEW_ACTION: null,
		SERVER_ACTION: null
	}),
	ActionTypes: keyMirror({
		RECEIVE_GAME_STATUS: null,
		EXCUTE_FIGHT:null
	})
}