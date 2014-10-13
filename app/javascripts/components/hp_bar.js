var React = require('react');
var hpBarTemplate = require('.././templates/hp_bar');

var HpBar = React.createClass({
	render: function() {
		
		var currentHp = this.props.model.getCurrentHp();
		// console.log(currentHp);
		this.props.now = currentHp;
		this.props.style = {
			width: currentHp + '%'
		};
		return hpBarTemplate.call(this);;
	}
});

module.exports = HpBar;