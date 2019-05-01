const router = require('express').Router()
const User   = require('../models/User')
const Order  = require('../models/Order')

router.get('/', (req, res, next) => {
  const { _id } = req.user
  Order.find({user: _id}).populate('user').populate('fonda').populate('menuUser')
    .then(orders => {
      console.log(orders)
      res.render('user/dashboard', {orders})
    })
    .catch(err => next(err))
})

router.get('/delete/:id', (req,res,next) => {
  const { id } = req.params
  Order.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/')
    })
    .catch(err => next(err))
})


module.exports = router