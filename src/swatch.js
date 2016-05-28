var React = require('react');
var Color = require('color');

module.exports = React.createClass({

  displayName: 'Swatch',

  render: function() {
    var style = { backgroundColor: this.props.swatch.color }
    return (<div className="swatch" style={style}>
      <span>{this.props.swatch.color}</span>
    </div>);
  }

});
