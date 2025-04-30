const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://craigclayton:${password}@cluster0.xpxvblq.mongodb.net/noteApp?retryWrites=true&w=majority&appname=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  name: String,
  number: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'HTML is easy',
  important: false,
});

// note.save().then((result) => {
//   console.log('note saved!');
//   mongoose.connection.close();
// });

Note.find({ important: true }).then((result) => {
  console.log(result);
  mongoose.connection.close();
});
