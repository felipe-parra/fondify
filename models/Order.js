const mongoose    = require('mongoose')
const { Schema }  = mongoose

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  menuUser: [{
    type: Schema.Types.ObjectId,
    ref: "menuUser"
  }],
  arrive: String,
  fonda: {
    type: Schema.Types.ObjectId,
    ref: "Fonda"
  },
  paySelected: {
    type: String,
    enum: ['Paypal','Efectivo','TDC']
  },
  howMany: Number,
  arrive: String
},
{
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('Order', orderSchema)