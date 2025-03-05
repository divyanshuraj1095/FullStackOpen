
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express()
const Person=require("./models/person")

app.use(express.static('dist'))
app.use(express.json());
app.use(cors())

morgan.token('custom-message', (req) => req.body ? JSON.stringify(req.body) : '');
app.use(morgan(':method :url :status :response-time ms - IP:custom-message'));

// let persons = [
//     { id: 1, name: "Arto Hellas", number: "040-123456" },
//     { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
//     { id: 3, name: "Dan Abramov", number: "12-43-234345" },
//     { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" }
// ];

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

// app.get('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id);
//   const person = persons.find(person => person.id === id);
//   if (person) {
//     response.json(person);
//   } else {
//     response.status(404).json({ error: "Person not found" });
//   }
// });

// app.get('/api/persons', (request, response) => {
//   response.json(persons);
// });

// app.delete('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id);
//   const personExists = persons.some(person => person.id === id);

//   if (!personExists) {
//     return response.status(404).json({ error: 'Person not found' });
//   }

//   persons = persons.filter(person => person.id !== id);
//   response.status(204).end();
// });

// app.get('/info', (request, response) => {
//   const count = persons.length;
//   const date = new Date().toString();
//   response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
// });

// const generateId = () => {
//   const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
//   return maxId + 1;
// };

// app.post('/api/persons', (request, response) => {
//   const { name, number } = request.body;
//   if (!name || !number) {
//     return response.status(400).json({ error: 'Name and number are required' });
//   }
//   if (persons.find(person => person.name === name)) {
//     return response.status(400).json({ error: 'Name must be unique' });
//   }
  
//   const newPerson = { id: generateId(), name, number };
//   persons = persons.concat(newPerson);
//   response.status(201).json(newPerson);
// });

// app.put('/api/persons/:id', (request, response) => {
//   const ID = Number(request.params.id);
//   const { name, number } = request.body;

//   if (!name || !number) {
//     return response.status(400).json({ error: 'Name and number are required' });
//   }

//   const personIndex = persons.findIndex(person => person.id === ID);
//   if (personIndex === -1) {
//     return response.status(404).json({ error: 'Person not found' });
//   }

//   persons[personIndex] = { id: ID, name, number };
//   response.json(persons[personIndex]);
// });

app.get("/api/persons",(req,res)=>{
  Person.find({}).then((persons)=>{
    if(persons){
      res.json(persons)
    }
    else{
      res.status(404).end()
    }
    
  }).catch(error=>next(error))
})
app.post("/api/persons", (req, res,next)=>{
  const body= req.body
  if(body.name===undefined){
    return response.status(400).json({error: 'name missing'})
  }
  const person=new Person({
    name:body.name,
    number:body.number
  })
  person.save().then((savedPerson)=>{
    res.json(savedPerson)
  }).catch(error=>next(error)
  )
})
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      if (!result) {
        return response.status(404).json({ error: 'Note not found' });
      }
      response.status(204).end();
    })
    .catch(error => next(error)); // Pass errors to error-handling middleware
});

app.put('/api/persons/:id',(req, res, next)=>{
  const {id}=req.params
  const {number}=req.body

  Person.findByIdAndUpdate(id,{number},{new:true }).then((updatedPerson)=>{
    if(updatedPerson){
      res.json(updatedPerson)
    }else{
      res.status(404).end()
    }
  }).catch((error)=>next(error))
})
app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  
  Person.findById(id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch(error => next(error));
});


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name==="CastError"){
    return response.status(400).json({error: error.message})

  }

  next(error)
}

app.get("/info",(req, res)=>{
  Person.find()
  .then((personInfo)=>{
    res.send(`Phonebook has info for ${personInfo.length} people.
      ${Date()}`)
  }).catch(error => next(error));
})
app.use(errorHandler)

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
