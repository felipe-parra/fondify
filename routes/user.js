const router        = require('express').Router()
const User          = require('../models/User')
const { validateTypeLog, isLogged }  = require('../helpers/middlewares')

router.get('/',(req, res, next) => {
  req.app.locals.loggedUser = req.user
  
  res.render('user/dashboard',req.user)
})

router.get('/user/dashboard', (req,res,next) => {
  res.render('user/dashboard')
})


module.exports = router