const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

if ( process.argv.length<3 ){
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://1ndie94:${password}@cluster0-uzk1c.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true })

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, uniqueCaseInsensitive: true},
  number: { type: String, required: true, unqiue: true}
})

contactSchema.plugin(uniqueValidator)

const Contact =mongoose.model('Contact', contactSchema)

if ( process.argv.length==3 ){
  Contact.find({}).then(res =>{
    console.log("phonebook:")
    res.forEach(contact => {
      console.log(contact.name, contact.number)
    })
    mongoose.connection.close()
  })
}

else {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4] || None,
  })

  contact.save().then(res =>{
    console.log('contact saved!')
    mongoose.connection.close()
  })
}
