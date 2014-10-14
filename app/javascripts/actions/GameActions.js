var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;
var GameServer = require('../utils/GameServerUtils');

var GameActions = {
	excuteFight: function() {
		AppDispatcher.handleViewAction({
			type: ActionTypes.EXCUTE_FIGHT,
		});
		GameServer.excuteFight()
	}


}

module.exports = GameActions;
