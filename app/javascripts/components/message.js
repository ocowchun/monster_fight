var React = require('react');
var messageTemplate = require('.././templates/message');

var Message = React.createClass({
  render: function() {
    return messageTemplate.call(this);;
  }
});

module.exports = Message;