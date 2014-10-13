var React = require('react');
var appTemplate = require('.././templates/app');

var App = React.createClass({
	btnFightClick: function() {
console.log(123);
	},
	render: function() {
		return appTemplate.call(this);;
	}
});

module.exports = App;