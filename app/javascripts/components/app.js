var React = require('react');
var appTemplate = require('.././templates/app');

var App = React.createClass({
	btnFightClick: function() {
		this.props.gameModel.walk();
	},
	render: function() {
		return appTemplate.call(this);;
	}
});

module.exports = App;