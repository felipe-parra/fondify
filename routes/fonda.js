const router = require('express').Router()
const Menu = require('../models/Menu')
const Fonda = require('../models/Fonda')
const { isLogged, validateTypeLog } = require('../helpers/middlewares')


router.post('/', (req, res, next) => {
  const { main } = req.body
  
  Menu.find({ $or: [
    { mainOne: { $regex: main, $options: 'i' } },
    { mainTwo: { $regex: main, $options: 'i' } },
    { mainThree: { $regex: main , $options: 'i'} }
  ]}).populate('fonda')
    .then(menus => {
      res.send(menus)
    })
    .catch(err => next(err))
})

router.get('/new-menu', isLogged, (req, res, next) => {
  res.render('fondas/new_menu')
})

router.post('/new-menu', isLogged, (req, res , next) => {
  //const { mainOne, mainTwo, mainThree } = req.body
  //const {}(req.user._id)
  Fonda.find({ user: req.user._id })
    .then(fonda => {
      Menu.create({ ...req.body, fonda: fonda[0]._id })
        .then(menu => res.send(menu))
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

module.exports = router

