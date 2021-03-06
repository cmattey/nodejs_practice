require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))
// app.use(morgan('tiny'))

morgan.token('body')

app.use(morgan((tokens, req, res)=>{
  return (
    [tokens.method(req,res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.method(req,res)=='POST'?JSON.stringify(req['body']):''].join(' ')

  )
}))

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
  // res.status(200).json(persons)
  Contact.find({}).then(contacts => {
    res.json(contacts.map(contact => contact.toJSON()))
  })
})

app.get('/api/info', (req, res) =>{
  res.set('Content-Type', 'text/html')
  res.write(String(new Date()))
  res.write('<br />')
  res.write(`Phonebok has ${persons.length} contacts`)
  return res.status(200).send()
})

app.get('/api/persons/:id', (req, res, next) =>{
  // const id = Number(req.params.id)

  Contact.findById(req.params.id)
    .then(contact => {
      if (contact) {
        res.status(200).json(contact.toJSON())
      }
      else {
        res.status(404).end()
      }
  })
    .catch(error => next(error))

  // const person = persons.find(p=>p.id===id)
  // // console.log('person',person)
  // if(person){
  //     return res.status(200).json(person)
  // }
  // else{
  //   return res.status(404).json({
  //     error: 'content missing'
  //   })
  // }
})

app.delete('/api/persons/:id', (req, res, next)=>{

  Contact.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))

})

// Without a body-parser, the body property would be undefined. The body-parser
// functions so that it takes the JSON data of a request, transforms it into a
// JavaScript object and then attaches it to the body property of the request object
//  before the route handler is called.
app.post('/api/persons', (req, res, next)=>{
  const body = req.body

  const newContact = new Contact({
    name : body.name,
    number : body.number
  })

newContact.save().then(savedContact => {
  res.json(savedContact.toJSON())
  })
  .catch(error => {
      console.log(error.message)
      next(error)
  })
})

// const generateId = ()=>{
//   const MAX_ID = 100000
//   const newId = Math.floor(Math.random()*Math.floor(MAX_ID))
//   return newId
// }

const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError' && error.kind === 'ObjectId'){
    return response.status(400).send({ error: 'malformatted id'})
  }
  else if( error.name === 'ValidationError' ){
    return response.status(400).json({ error: error.message})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3002
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
