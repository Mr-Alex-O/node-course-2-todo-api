const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
      text: req.body.text
    });

    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todo) => {
    console.log(JSON.stringify(todo, undefined, 2));
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/123432
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      console.log('Valid ID BUT ITS NOT FOUND DIPSHIP!');
      return res.status(404).send();
    }

    res.send({todo});

  }, (e) => {
    return res.status(400).send();
  });

});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
