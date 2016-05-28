var React = require('react');
var ReactDOM = require('react-dom');
var { Provider, connect } = require('react-redux');
var Color = require('color');

var Swatch = require('./swatch');

var store = require('./store')();

var App = React.createClass({

  getInitialState: function() {
    return {
      current_color: '',
      group: 0
    }
  },

  // handlers
  addSwatch: function() {
    var color = Color(this.state.current_color);
    this.props.dispatch({
      type: 'ADD_SWATCH',
      swatch: {
        color: color.rgbString(),
        group: this.state.group
      }
    })
  },

  handleTextInput: function(event) {
    this.setState({
      current_color: event.target.value
    });
  },

  // render
  render: function() {
    var swatches = this.props.swatches.map(function(swatch) {
      return <Swatch key={swatch._id} dispatch={this.props.dispatch} swatch={swatch} />
    }.bind(this));
    return (<div>
      <input type="text" value={this.state.current_color} onChange={this.handleTextInput} />
      <button onClick={this.addSwatch}>add swatch</button>
      {swatches}
    </div>);
  }
});

function mapStateToProps(store) {
  return {
    swatches: store.swatches
  };
}

function mapDispatchToProps(dispatch,ownProps) {
  return {
    dispatch: function(data) {
      dispatch(data);
    }
  }
}

var Connected = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(<Provider store={store}><Connected /></Provider>, document.getElementById('container'));
