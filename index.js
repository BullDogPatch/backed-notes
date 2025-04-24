import express from 'express';
import cors from 'cors';

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
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const note = notes.find((n) => n.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  notes = notes.filter((note) => note.id !== id);
  res.status(204);
});

app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const noteIndex = notes.findIndex((n) => n.id === id);
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const updatedNote = {
    ...notes[noteIndex],
    content: body.content,
    important: body.important,
  };

  notes[noteIndex] = updatedNote;
  res.json(updatedNote);
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post('/api/notes', (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({ error: 'Content missing' });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(note);
  res.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log(`Running on port ${PORT}`);
