const mongoose    = require('mongoose')
const { Schema }  = mongoose

const orderSchema = new Schema({
  userReference: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  menuOrdered: [String],
  paySelected: {
    type: String,
    enum: ['Paypal','Efectivo','TDC']
  },
  reservedDate: String
},{
  timestamps:true,
  versionKey:false
})