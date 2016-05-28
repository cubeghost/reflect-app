var React = require('react');
var Color = require('color');

module.exports = React.createClass({

  displayName: 'Swatch',

  getInitialState: function() {
    return {
      confirm_delete: false
    }
  },

  // handlers
  toggleDelete: function() {
    this.setState({
      confirm_delete: !this.state.confirm_delete
    });
  },

  copy: function(event) {
    var range = document.createRange();
    range.selectNode(event.target);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges()
  },

  deleteSwatch: function() {
    this.props.dispatch({
      type: 'DELETE_SWATCH',
      id: this.props.swatch._id
    });
  },

  // render

  render: function() {
    var color = Color(this.props.swatch.color);
    var style = { backgroundColor: color.rgbString() };
    var classes = ['swatch', (color.dark() ? 'text-light' : 'text-dark')].join(' ');
    var confirm = (<div className="confirm">Delete? <button onClick={this.deleteSwatch}>👍</button></div>)

    return (<div className={classes} style={style}>
      <div className="color" aria-role="button" onClick={this.copy}>{this.props.swatch.color}</div>
      {this.state.confirm_delete ? confirm : null}
      <button className="delete" aria-label={'Delete swatch '+this.props.swatch.color} onClick={this.toggleDelete}>×</button>
    </div>);
  }

});
