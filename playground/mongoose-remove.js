const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');
 
// Todo.remove({}).then((result) => {
//   console.log(result);
// })

// Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findByIdAndRemove('58a4ada207735318922cd1e1').then((todo) => {
  console.log(todo);
})
