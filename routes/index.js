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
  Fonda.find({user: req.user._id})
    .then(fonda => {
      Order.find({fonda: fonda._id}).populate('user').populate('menuUser')
        .then(order => {
          res.render('fondas/dashboard', {order,userName: req.user})
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

module.exports = router;
