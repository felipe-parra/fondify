const mongoose    = require('mongoose')
const { Schema }  = mongoose

const menuUserSchema = new Schema({
  firstTime: String,
  secondTime: String,
  main: String
},
{
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('MenuUser', menuUserSchema)