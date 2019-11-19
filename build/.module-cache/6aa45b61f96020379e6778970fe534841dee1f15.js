var Note = React.createClass({displayName: "Note",

  getInitialState: function() {
    return {editing: false};
  },
  componentWillMount: function() {
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 150) + 'px',
      top: this.randomBetween(0, window.innerHeight - 150) + 'px',
      transform: 'rotate('+ this.randomBetween(-15, 15) +'deg)'
    };
  },
  componentDidMount: function() {
    $(this.getDOMNode()).draggable();
  },
  randomBetween: function(min, max) {
    return (min + Math.ceil(Math.random() * max));
  },

  edit: function() {
    return this.setState({editing: true});

  },
  remove: function() {
    this.props.onRemove(this.props.index)
  },
  save: function() {
    this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index)
    this.setState({editing: false});
  },

  renderDisplay: function() {
    return(
      React.createElement("div", {className: "note", style: this.style}, 
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
        React.createElement("div", {className: "note", style: this.style}, 
          React.createElement("textarea", {ref: "newText", defaultValue: this.props.children, className: "form-control"}), 
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

var Board = React.createClass({displayName: "Board",
  getInitialState: function() {
    return {
      notes: []
    };
  },
  nextId: function() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  },
  componentWillMount: function() {
    var self = this;
    if(this.props.count) {
      $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
      this.props.count + "&start-with-lorem=1&callback=?", function(results) {
          results[0].split('. ').forEach(function(sentence){
            self.add(sentence.substring(0,40));
          });
      });
    }
  },
  add: function(note) {
    var arr = this.state.notes;
    arr.push({
      id: this.nextId(),
      note: note
    });
    this.setState({notes:arr});
  },
  update: function(newText, i) {
    var arr = this.state.notes;
    arr[i].note = newText;
    this.setState({notes:arr});
  },
  remove: function(i) {
    var arr = this.state.notes;
    arr.splice(i,1);
    this.setState({notes:arr});
  },
  eachNote: function(note, i) {
    return (React.createElement(Note, {key: note.id, index: i, 
              onChange: this.update, 
              onRemove: this.remove}, 
              note.note
            ));
  },
  render: function() {
    return (React.createElement("div", {className: "board"}, 
        this.state.notes.map(this.eachNote), 
        React.createElement("button", {onClick: this.add.bind(null, "New Note"), className: "btn btn-success glyphicon glyphicon-plus"})
      ));
  }
});

React.render(React.createElement(Board, {count: 25}), document.getElementById('react-container'));
