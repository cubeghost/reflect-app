var React = require('react');
var ReactDOM = require('react-dom');

var db = new PouchDB('swatches');

window.db = db;

var App = React.createClass({
  getInitialState: function() {
    return {
      swatches: []
    }
  },
  addSwatch: function(color) {
    
  },
  render: function() {
    return (<div>asdfgh</div>);
  }
});

ReactDOM.render(<App />, document.getElementById('container'));
