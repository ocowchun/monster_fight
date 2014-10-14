var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

var GameServerActions = {
	receiveGameStatus: function(status) {
		AppDispatcher.handleServerAction({
			type: ActionTypes.RECEIVE_GAME_STATUS,
			status: status
		});
	},

}

module.exports =GameServerActions;
