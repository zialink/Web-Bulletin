var Note = React.createClass({displayName: "Note",
  render: function() {
    return(
      React.createElement("div", {className: "note"})
    );
  }
});

React.render(React.createElement(Note, null, "Hello World"), document.getElementById('react-container'));
