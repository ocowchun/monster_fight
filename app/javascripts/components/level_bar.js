var React = require('react');
var levelBarTemplate = require('.././templates/level_bar');
var ActorStore = require('../stores/ActorStore');


function getStateFromStores() {
	return ActorStore.get()

}

var LevelBar = React.createClass({


	getInitialState: function() {
		return getStateFromStores();
	},
	componentDidMount: function() {
		ActorStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ActorStore.removeChangeListener(this._onChange);
	},
	/**
	 * Event handler for 'change' events coming from the stores
	 */
	_onChange: function() {
		this.setState(getStateFromStores());
	},
	render: function() {
		var currentLevel = this.state.level;
		// var currentHp = 10;//this.props.model.getCurrentHp();
		// console.log(currentHp);
		this.props.currentLevel = currentLevel;

		return levelBarTemplate.call(this);;
	}
});

module.exports = LevelBar;