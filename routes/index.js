<<<<<<< HEAD
const express       = require('express');
const router        = express.Router();
const Menu = require('../models/Menu')
const Fonda = require('../models/Fonda')
const Order = require('../models/Order')
const MenuUser = require('../models/MenuUser')
const { isLogged, checkRole } = require('../helpers/middlewares')
const moment = require('moment')
=======
const express = require('express');
const router  = express.Router();
const User = require('../models/User')
const Fonda = require('../models/Fonda')
const { isLogged, checkRole } = require('../helpers/middlewares')
const uploadCloud = require('../helpers/cloudinary')
>>>>>>> alberto

router.get('/', (req, res, next) => {
  res.render('index');
});

<<<<<<< HEAD
router.get('/fonda', isLogged , checkRole('fonda'),(req,res,next) => {
  Fonda.findOne({user: req.user._id})
    .then(fonda => {
      Order.find({fonda: fonda._id}).populate('user').populate('menuUser')
        .then(orders => {
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


=======
router.get('/admin/fonda/new', isLogged, checkRole('admin'), (req, res, next) => {
  User.find()
    .then(users => res.render('admin/new_fonda', { users }))
    .catch(err => next(err))
})

router.post('/admin/fonda/new', isLogged, checkRole('admin'), uploadCloud.single('img'), (req, res, next) => {
  Fonda.create({...req.body, picPath: req.file.secure_url, picName: req.file.originalname })
    .then(fonda => res.redirect('/admin/fondas/new'))
    .catch(err => next(err))
})

>>>>>>> alberto
module.exports = router;
