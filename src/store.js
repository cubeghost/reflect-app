var PouchMiddleware = require('pouch-redux-middleware');
var { createStore, applyMiddleware } = require('redux');
var uuid = require('node-uuid');

var db = new PouchDB('swatches');
window.db = db;

function reducer(state,action) {
  console.log(action)
  if (!state) {
    state = {
      swatches: []
    };
  }

  switch (action.type) {
    case 'ADD_SWATCH':
      // expecting { swatch: {} }
      var swatch = {
        _id: action.swatch._id || generate_id(),
        color: action.swatch.color,
        group: action.swatch.group
      };
      if (action.swatch._rev) swatch._rev = action.swatch._rev;
      var new_swatches = state.swatches.concat([swatch]);
      return Object.assign({}, state, { swatches: new_swatches });

    case 'DELETE_SWATCH':
      // expecting { id }
      var new_swatches = state.swatches.filter(function(swatch){
        return swatch._id !== action.id;
      });
      return Object.assign({}, state, { swatches: new_swatches });

    case 'UPDATE_SWATCH':
      // expecting { swatch: { _id } }
      var new_swatches = state.swatches.map(function(swatch){
        return swatch._id == action.swatch._id ? action.swatch : swatch;
      });
      return Object.assign({}, state, { swatches: new_swatches });

    default:
      return state;
  }

}

function generate_id() {
  var id = uuid.v4();
  return id;
}

module.exports = function() {
  var pouchMiddleware = PouchMiddleware({
    path: '/swatches',
    db,
    actions: {
      remove: doc => store.dispatch({type: 'DELETE_SWATCH', id: doc._id}),
      insert: doc => store.dispatch({type: 'ADD_SWATCH', swatch: doc}),
      update: doc => store.dispatch({type: 'UPDATE_SWATCH', swatch: doc}),
    }
  });
  var createStoreWithMiddleware = applyMiddleware(pouchMiddleware)(createStore);
  var store = createStoreWithMiddleware(reducer);
  return store;
}
