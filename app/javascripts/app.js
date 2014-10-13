var React = require('react');

var App = require('./components/app');
var messageModel = require('./models/message')();

function render(argument) {
	React.renderComponent(App({
			messageModel: messageModel
		}),
		document.getElementById('react')
	);
}

messageModel.addChangeListener(render);
render();
messageModel.addMessage("welcome to monster fight");
