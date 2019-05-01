const express       = require('express');
const router        = express.Router();
const Menu = require('../models/Menu')
const Fonda = require('../models/Fonda')
const Order = require('../models/Order')
const MenuUser = require('../models/MenuUser')
const { isLogged, checkRole } = require('../helpers/middlewares')
const moment = require('moment')

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/fonda', isLogged , checkRole('fonda'),(req,res,next) => {
  Fonda.findOne({user: req.user._id})
    .then(fonda => {
      console.log(fonda+'-- fonda');
      Order.find({fonda: fonda._id}).populate('user').populate('menuUser')
        .then(orders => {
          console.log(orders + '-- orders');
          res.render('fondas/dashboard', {orders, userName: req.user.name})
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

router.get('/admin', (req, res, next) => {
  Fonda.find().populate('user')
    .then(fondas => {
      console.log(fondas);
      res.render('admin/dashboard', {fondas})
    })
    .catch(err => next(err))
  
})

router.get('/admin/delete/:id', (req, res, next) => {
  const { id } = req.params
  Fonda.findByIdAndDelete(id)
    .then(fonda => {
      console.log(`Elmino ALV la fonda ${fonda.name}`);
      res.redirect('/admin')
    })
    .catch(err => next(err))
})


module.exports = router;
