require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/notes');

const app = express();

app.use(express.json());
app.use(cors());

let notes = [
  {
    id: '1',
    content: 'HTML is easy',
    important: true,
  },
  {
    id: '2',
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: '3',
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello, World</h1>');
});

app.get('/api/notes', (req, res) => {
  Note.find({}).then((note) => {
    res.json(note);
  });
});

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      response.json(note);
    })
    .catch((error) => next(error));
});

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  Note.deleteOne({ _id: id }).then((result) => {
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(204).end();
  });
});

app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const { important } = req.body;

  Note.findByIdAndUpdate(
    id,
    { important },
    { new: true, runValidators: true, context: 'query' }
  ).then((updatedNote) => {
    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(updatedNote);
  });
});

app.post('/api/notes', (req, res) => {
  const body = req.body;
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    res.json(savedNote);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log(`Running on port ${PORT}`);
