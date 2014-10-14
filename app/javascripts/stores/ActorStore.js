var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';
var currentHp = 100;
var currentLevel = 1;
var currentExp = 0;

function updateState(currentState) {
  console.log(currentState);
  currentHp = currentState.hp;
  currentLevel = currentState.level;
  currentExp = currentState.exp;
}

var ActorStore = _.extend(new EventEmitter(), {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  get: function() {
    return {
      "hp": currentHp,
      "level": currentLevel,
      "currentExp": currentExp
    };
  }


});

ActorStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  var handles = {};
  handles[ActionTypes.RECEIVE_GAME_STATUS] = function() {
    var currentState = action.status.currentState;
    updateState(currentState);

    ActorStore.emitChange();
  };

  if (handles[action.type]) {

    handles[action.type]();
  }
  // This often goes in each case that should trigger a UI change. This store
  // needs to trigger a UI change after every view action, so we can make the
  // code less repetitive by putting it here.  We need the default case,
  // however, to make sure this only gets called after one of the cases above.

  return true; // No errors.  Needed by promise in Dispatcher.

});

module.exports = ActorStore;