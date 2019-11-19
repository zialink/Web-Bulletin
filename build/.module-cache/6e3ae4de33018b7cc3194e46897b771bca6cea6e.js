var Note = React.createClass({displayName: "Note",

  edit: function() {
    alert('editing note');

  },

  remove: function() {
    alert('removing note');
  },

  render: function() {
    return(
      React.createElement("div", {className: "note"}, 
      React.createElement("p", null, this.props.children), 
        React.createElement("span", null, 
          React.createElement("button", {onClick: this.edit, className: "btn btn-primary glyphicon glyphicon-pencil"}), 
          React.createElement("button", {onClick: this.remove, className: "btn btn-danger glyphicon glyphicon-trash"})
        )
      )
    );
  }
});

React.render(React.createElement(Note, null, "Hello World"), document.getElementById('react-container'));
