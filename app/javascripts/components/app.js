var React = require('react');
var appTemplate = require('.././templates/app');
var GameActions = require('./../actions/GameActions');


var App = React.createClass({
	btnFightClick: function() {
		GameActions.excuteFight();
	},
	render: function() {
		return appTemplate.call(this);;
	}
});

module.exports = App;
