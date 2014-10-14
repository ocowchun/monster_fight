var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var uuid = require('../utils/uuid');
var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';
var messages = [];

var MessageStore = _.extend(new EventEmitter(), {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  get: function(id) {
    return _.find(messages, function(message) {
      message.id === id;
    });
  },

  getAll: function() {
    return messages;
  },
  createMessage: function(text) {
    messages.push({
      id: uuid(),
      content: text,
    });
  }

});

MessageStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  var handles = {};
  handles[ActionTypes.RECEIVE_GAME_STATUS] = function() {
    var message = action.status.message;
    MessageStore.createMessage(message);
    MessageStore.emitChange();
  };

  // switch (action.type) {

  //   case ActionTypes.CLICK_THREAD:
  //     AppDispatcher.waitFor([ThreadStore.dispatchToken]);
  //     _markAllInThreadRead(ThreadStore.getCurrentID());
  //     MessageStore.emitChange();
  //     break;

  //   case ActionTypes.CREATE_MESSAGE:
  //     var message = MessageStore.getCreatedMessageData(action.text);
  //     _messages[message.id] = message;
  //     MessageStore.emitChange();
  //     break;

  //   case ActionTypes.RECEIVE_RAW_MESSAGES:
  //     _addMessages(action.rawMessages);
  //     AppDispatcher.waitFor([ThreadStore.dispatchToken]);
  //     _markAllInThreadRead(ThreadStore.getCurrentID());
  //     MessageStore.emitChange();
  //     break;

  //   default:
  //     // do nothing
  // }
  if (handles[action.type]) {

    handles[action.type]();
  }
  // This often goes in each case that should trigger a UI change. This store
  // needs to trigger a UI change after every view action, so we can make the
  // code less repetitive by putting it here.  We need the default case,
  // however, to make sure this only gets called after one of the cases above.

  return true; // No errors.  Needed by promise in Dispatcher.

});

module.exports = MessageStore;