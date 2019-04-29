const mongoose    = require('mongoose')
const { Schema }  = mongoose

const restSchema  = new Schema({
  name: String,
  address: String,
  location: {
    type: String,
    default: Point,
  },
  coordinates: [ Number ],
  rfc: String,
  photoURL: String,
  phoneNumber: String,
},
{
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('Restaurant', restSchema)