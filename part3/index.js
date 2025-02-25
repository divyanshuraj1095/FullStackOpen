const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()



app.use(express.json());
morgan.token('custom-message', (req) => {
  return req.body ? JSON.stringify(req.body) : ''
});
app.use(morgan(':method :url :status :response-time ms - IP:custom-message'))
app.use(cors())



let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
app.get('/api/persons', (request,response)=> {
  response.json(persons)
})
// app.delete('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   persons = persons.filter(person => person.id !== id)

//   response.status(204).end()
// })
// app.delete('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id);
//   let deletedPerson = persons.filter((person) => person.id !== id);
//   response.json(deletedPerson);
// });
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const personExists = persons.some(person => person.id === id);

  if (!personExists) {
    return response.status(404).json({ error: 'Person not found' });
  }

  
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});



app.get('/info', (request, response) =>{
  const count = persons.length;
  const date = new Date().toString()
  response.send(`<p>Phone has info of ${count} people</p>
    <p>${date}</p>`
  )
})

// app.post('/api/persons', (request, response) => {
//   const person = request.body
//   console.log(person)
//   response.json(person)
// })

const generateId = () => {
  const newID=persons.length>0 ? Math.floor(Math.random()*500):0;
  return newID+1
}

app.post('/api/persons', (request, response) => {
  const {name, number} = request.body
  if(!name || !number){
    return response.status(404).json({error : 'name and number are required'})
  }
  if(persons.find(person=> person.name === name)){
    return response.status(404).json({error: 'name must be unique'})
  }
  const newPerson ={
    id : generateId(),
    name,
    number
  }

  persons = persons.concat(newPerson);

  response.status(201).send(newPerson);
})


const PORT = process.env.PORT||3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})