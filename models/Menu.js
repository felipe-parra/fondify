const mongoose    = require('mongoose')
const { Schema }  = mongoose

const menuSchema  = new Schema ({
  name: String,
  entradas: [String],
  platoFuertes: [String],
  postres: [String],
  bebidas: [String]

})

module.exports = mongoose.model('Menu', menuSchema)