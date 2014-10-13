var React = require('react');
var hpBarTemplate = require('.././templates/hp_bar');

var HpBar = React.createClass({
  render: function() {
		this.props.style = {
			width: '60%'
		};
    return hpBarTemplate.call(this);;
  }
});

module.exports = HpBar;