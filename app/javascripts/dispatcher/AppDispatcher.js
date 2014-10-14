var _ = require('underscore');
var Dispatcher = require('flux').Dispatcher;
var AppConstants = require('../constants/AppConstants');
var PayloadSources = AppConstants.PayloadSources;

var AppDispatcher = _.extend(new Dispatcher(), {
	handlerViewAction: function(action) {
		var payload = {
			source: PayloadSources.VIEW_ACTION,
			action: action
		};
		this.dispatch(payload);
	}
});

module.exports = AppDispatcher;