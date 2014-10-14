var React = require('react');
var hpBarTemplate = require('.././templates/hp_bar');
var ActorStore = require('../stores/ActorStore');


function getStateFromStores() {
	return {
		hp: ActorStore.get().hp
	};
}

var HpBar = React.createClass({


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
		var currentHp = this.state.hp;
		// var currentHp = 10;//this.props.model.getCurrentHp();
		// console.log(currentHp);
		this.props.now = currentHp;
		this.props.style = {
			width: currentHp + '%'
		};
		return hpBarTemplate.call(this);;
	}
});

module.exports = HpBar;