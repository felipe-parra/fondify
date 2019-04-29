const mongoose    = require('mongoose')
const { Schema }  = mongoose

const menuSchema  = new Schema ({
  name: String,
  firstTime: String,
  secondTime: String,
  main: [String],
  drink: String,
  fonda: {
    type: Schema.Types.ObjectId,
    ref: 'Fonda'
  }
})

module.exports = mongoose.model('Menu', menuSchema)