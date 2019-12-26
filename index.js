const express = require('express')
const app = express()

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
      res.status(200).json(person)
  }
  else{
    res.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
