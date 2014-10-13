var React = require('react');
var _ = require('underscore');
var MessageListTemplate = require('.././templates/message_list');
var Message = require('.././components/message');


var MessageList = React.createClass({
	render: function() {
		// var nowShowing = this.props.state.nowShowing;
		var model = this.props.model;
		var messages = model.getMessages();
		var main = _.map(messages, function(message) {
			return Message({
				content: message.content,
				key: message.id
			});
		});
		this.props.messages = main;
		return MessageListTemplate.call(this);;
	}
});

module.exports = MessageList;