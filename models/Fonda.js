const mongoose    = require('mongoose')
const { Schema }  = mongoose

const fondaSchema  = new Schema({
  name: String,
  description: String,
  rank: {
    type:Number,
    min: 1,
    max: 5
  },
  location: {
    address:{
    type: String,
    default: 'Point'
  },
    coordinates: [Number]
  },
  rfc: String,
  img: String,
  phoneNumber: String,
},
{
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('Fonda', fondaSchema)