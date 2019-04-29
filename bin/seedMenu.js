const mongoose      = require('mongoose')
const Menu    = require('../models/Menu')

const menuSchema = [{
  name: '',
  firstTime:'',
  

}
]

module.exports = mongoose.model('Menu', menuSchema)
