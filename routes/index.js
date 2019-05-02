const express = require('express');
const router  = express.Router();
const User = require('../models/User')
const Fonda = require('../models/Fonda')
const { isLogged, checkRole } = require('../helpers/middlewares')
const uploadCloud = require('../helpers/cloudinary')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/admin/fonda/new', isLogged, checkRole('admin'), (req, res, next) => {
  User.find()
    .then(users => res.render('admin/new_fonda', { users }))
    .catch(err => next(err))
})

router.post('/admin/fonda/new', isLogged, checkRole('admin'), uploadCloud.single('img'), (req, res, next) => {
  Fonda.create({...req.body, picPath: req.file.secure_url, picName: req.file.originalname })
    .then(fonda => res.redirect('/admin'))
    .catch(err => next(err))
})

module.exports = router;
