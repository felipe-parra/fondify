const express                 = require('express');
const uploadCloud             = require('../helpers/cloudinary')
const router                  = express.Router();
const Fonda                   = require('../models/Fonda')
const Order                   = require('../models/Order')
const { isLogged, checkRole } = require('../helpers/middlewares')
const MenuUser                = require('../models/MenuUser')

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
      console.log(`Elmino ALV la fonda ${fonda.name}`);
      res.redirect('/admin')
    })
    .catch(err => next(err))
})

router.get('/admin/delete/menuUser/:id', (req,res,next) => {
  const { id } = req.params
  MenuUser.findByIdAndDelete(id)
    .then(menu => {
      console.log('Se elimino ALV una orden del pedido');
      res.redirect('/')
    })
})


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

module.exports = router;
