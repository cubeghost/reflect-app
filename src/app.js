// react
var React = require('react');
var ReactDOM = require('react-dom');

// redux
var { Provider, connect } = require('react-redux');
var store = require('./store')();

// external
var Color = require('color');

// components
var Swatch = require('./swatch');

// app
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

// fun redux mappers
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

// render
var Connected = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(<Provider store={store}><Connected /></Provider>, document.getElementById('container'));
