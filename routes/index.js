const express                 = require('express');
const uploadCloud             = require('../helpers/cloudinary')
const router                  = express.Router();
const Fonda                   = require('../models/Fonda')
const Order                   = require('../models/Order')
const { isLogged, checkRole } = require('../helpers/middlewares')
const MenuUser                = require('../models/MenuUser')
const User = require('../models/User')

router.get('/', (req, res, next) => {
  res.render('index');
});

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

router.get('/admin', isLogged,(req, res, next) => {
  Fonda.find().populate('user')
    .then(fondas => {
      console.log(fondas);
      res.render('admin/dashboard', {fondas})
    })
    .catch(err => next(err))
  
})

router.get('/admin/delete/:id', isLogged,(req, res, next) => {
  const { id } = req.params
  Fonda.findByIdAndDelete(id)
    .then(fonda => {
      res.redirect('/admin')
    })
    .catch(err => next(err))
})

router.get('/user/delete/menuUser/:id', (req,res,next) => {
  const { id } = req.params
  MenuUser.findByIdAndDelete(id)
    .then(menu => {
      res.redirect('/user')
    })
  // Order.findOne({menuUser: id})
  //   .then(order => {
  //     res.send(order);
  //     Order.find({menuUser: id} )
  //       .then((ordes) => {
  //         // res.send(ordes)
  //         console.log(ordes + '----IN');
  //       })
  //       .catch(err => next(err))
  //   })
})


router.get('/admin/fonda/new', isLogged, checkRole('admin'), (req, res, next) => {
  User.find({role: 'fonda'})
    .then(users => res.render('admin/new_fonda', { users }))
    .catch(err => next(err))
})

router.post('/admin/fonda/new', isLogged, checkRole('admin'), uploadCloud.single('img'), (req, res, next) => {

  const { name, description, user, img} = req.body
  if(!name || !description || !user || !img) return res.redirect(`/admin/fonda/new`)

  Fonda.create({...req.body, picPath: req.file.secure_url, picName: req.file.originalname })
    .then(fonda => res.redirect('/admin'))
    .catch(err => next(err))
})

module.exports = router;
