var Note = React.createClass({displayName: "Note",

  getInitialState: function() {
    return {editing: false};
  },

  edit: function() {
    return this.setState({editing: true});

  },
  remove: function() {
    alert('removing note');
  },
  save: function() {
    return this.setState({editing: false});
  },

  renderDisplay: function() {
    return(
      React.createElement("div", {className: "note"}, 
      React.createElement("p", null, this.props.children), 
        React.createElement("span", null, 
          React.createElement("button", {onClick: this.edit, className: "btn btn-primary glyphicon glyphicon-pencil"}), 
          React.createElement("button", {onClick: this.remove, className: "btn btn-danger glyphicon glyphicon-trash"})
        )
      )
    );
  },

  renderForm: function() {
    return(
        React.createElement("div", {className: "note"}, 
          React.createElement("textarea", {defaultValue: this.props.children, className: "form-control"}), 
          React.createElement("button", {onClick: this.save, className: "btn btn-success glyphicon glyphicon-floppy-disk"})
        )
    )
  },

  render: function() {
        if(this.state.editing) {
          return this.renderForm();
        } else{
          return this.renderDisplay();
        }
  }
});

React.render(React.createElement(Note, null, "Hello World"), document.getElementById('react-container'));
