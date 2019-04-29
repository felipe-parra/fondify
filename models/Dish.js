const mongoose    = require('mongoose')
const { Schema }  = mongoose

const dishSchema = new Schema({
  name: String,
  price: Number
})

module.exports = mongoose.model('Dish', dishSchema)