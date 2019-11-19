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
