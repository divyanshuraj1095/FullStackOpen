
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.static('dist'))
app.use(express.json());
app.use(cors())

morgan.token('custom-message', (req) => req.body ? JSON.stringify(req.body) : '');
app.use(morgan(':method :url :status :response-time ms - IP:custom-message'));

let persons = [
    { id: 1, name: "Arto Hellas", number: "040-123456" },
    { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
    { id: 3, name: "Dan Abramov", number: "12-43-234345" },
    { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" }
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).json({ error: "Person not found" });
  }
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const personExists = persons.some(person => person.id === id);

  if (!personExists) {
    return response.status(404).json({ error: 'Person not found' });
  }

  persons = persons.filter(person => person.id !== id);
  response.status(204).end();
});

app.get('/info', (request, response) => {
  const count = persons.length;
  const date = new Date().toString();
  response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
  return maxId + 1;
};

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;
  if (!name || !number) {
    return response.status(400).json({ error: 'Name and number are required' });
  }
  if (persons.find(person => person.name === name)) {
    return response.status(400).json({ error: 'Name must be unique' });
  }
  
  const newPerson = { id: generateId(), name, number };
  persons = persons.concat(newPerson);
  response.status(201).json(newPerson);
});

app.put('/api/persons/:id', (request, response) => {
  const ID = Number(request.params.id);
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: 'Name and number are required' });
  }

  const personIndex = persons.findIndex(person => person.id === ID);
  if (personIndex === -1) {
    return response.status(404).json({ error: 'Person not found' });
  }

  persons[personIndex] = { id: ID, name, number };
  response.json(persons[personIndex]);
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
