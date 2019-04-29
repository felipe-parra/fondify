const mongoose    = require('mongoose')
const { Schema }  = mongoose

const menuSchema  = new Schema ({
  name: String,
  firstTime: String,
  secondTime: String,
  mainOne: String,
  mainTwo: String,
  mainThree: String,
  drink: String,
  fonda: {
    type: Schema.Types.ObjectId,
    ref: 'Fonda'
  }
},
{
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('Menu', menuSchema)