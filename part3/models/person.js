const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: [3, "Name must be at least 3 characters long"],
      required: [true, "Name is required"]
    },
    number: {
      type: String,
      minLength: [8, "Phone number must be at least 8 digits long"],
      required: [true, "Phone number is required"],
      validate: {
        validator: function (v) {
          return /^\d{8,}$/.test(v); 
        },
        message: (props) => `${props.value} is not a valid phone number`
      }
    },
  });
  

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)