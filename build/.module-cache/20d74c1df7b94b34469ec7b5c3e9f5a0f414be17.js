var Note = React.createClass({displayName: "Note",
  render: function() {
    return(
      React.createElement("div", {className: "note"}, 
        React.createElement("span", null, 
          React.createElement("button", {className: "btn btn-primary glyphicon glyphicon-pencil"}), 
          React.createElement("button", {className: "btn btn-danger glyphicon glyphicon-trash"})
        )
      )
    );
  }
});

React.render(React.createElement(Note, null, "Hello World"), document.getElementById('react-container'));
