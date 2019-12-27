const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
]

app.get('/', (req, res) =>{
  res.status(200).send('<h1>Hello Namaste</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) =>{
  res.set('Content-Type', 'text/html')
  res.write(String(new Date()))
  res.write('<br />')
  res.write(`Phonebok has ${persons.length} contacts`)
  return res.status(200).send()
})

app.get('/api/persons/:id', (req, res) =>{
  const id = Number(req.params.id)
  const person = persons.find(p=>p.id===id)
  console.log('person',person)
  if(person){
      return res.status(200).json(person)
  }
  else{
    return res.status(404).json({
      error: 'content missing'
    })
  }
})

app.delete('/api/persons/:id', (req, res)=>{
  const id = Number(req.params.id)
  persons = persons.filter(p=>p.id!==id)

  res.status(204).end()
})

// Without a body-parser, the body property would be undefined. The body-parser
// functions so that it takes the JSON data of a request, transforms it into a
// JavaScript object and then attaches it to the body property of the request object
//  before the route handler is called.
app.post('/api/persons', (req, res)=>{
  const body = req.body
  console.log('body',body)
  if(!body.name || !body.number){
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const newPerson = {
    id : generateId(),
    name : body.name,
    number : body.number
  }
  console.log(newPerson)
  persons = persons.concat(newPerson)
  return res.json(newPerson)
})

const generateId = ()=>{
  const MAX_ID = 100000
  const newId = Math.floor(Math.random()*Math.floor(MAX_ID))
  return newId
}

const PORT = 3001
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
