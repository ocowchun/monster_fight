var React = require('react');

var App = require('./components/app');
var messageModel = require('./models/message')();
var gameModel = require('./models/game')();


function addGameStatusMessage(e) {
	messageModel.addMessage(e.message);
}

function render(argument) {
	React.renderComponent(App({
			messageModel: messageModel,
			gameModel: gameModel
		}),
		document.getElementById('react')
	);
}

messageModel.addChangeListener(render);
gameModel.addChangeListener(addGameStatusMessage);
render();
messageModel.addMessage("welcome to monster fight");
gameModel.addMessage("fight start");
