const mongoose    = require('mongoose')
const { Schema }  = mongoose

const dishSchema = new Schema({
  name: String,
  meal: {
    type: String,
    enum: ['Entrada', 'Plato Fuerte', 'Postre','Bebida']
  }
})

module.exports = mongoose.model('Dish', dishSchema)