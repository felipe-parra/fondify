const router = require('express').Router()
const Menu = require('../models/Menu')
const Fonda = require('../models/Fonda')
const Order = require('../models/Order')
const { isLogged } = require('../helpers/middlewares')

router.get('/', (req, res, next) => {
  // console.log('log');
  // Fonda.find({ user: req.user._id })
  //   .then(fonda => {
  //     const {name} = fonda[0].name
  //     console.log(fonda[0].name);
  //     res.render('fondas/dashboard', fonda[0].name)
  //   })
  //   .catch(err => res.send(err))
})
//order.find({user:})
router.post('/', (req, res, next) => {
  const { main } = req.body
  
  Menu.find({ $or: [
    { mainOne: { $regex: main, $options: 'i' } },
    { mainTwo: { $regex: main, $options: 'i' } },
    { mainThree: { $regex: main , $options: 'i'} }
  ]}).populate('fonda')
    .then(menus => {
      res.render('fondas/list', { menus, main })
    })
    .catch(err => next(err))
})

router.get('/new-menu', isLogged, (req, res, next) => {
  res.render('fondas/new_menu')
})

router.post('/new-menu', isLogged, (req, res , next) => {
  Fonda.find({ user: req.user._id })
    .then(fonda => {
      Menu.create({ ...req.body, fonda: fonda[0]._id })
        .then(menu => res.send(menu))
        .catch(err => next(err))
    })
    .catch(err => next(err))
})


router.post('/new-order', isLogged, (req, res, next) => {
  const { fonda, howMany } = req.body
  Order.create({ fonda, howMany, user: req.user._id })
    .then(order => {
      res.redirect(`/fondas/${fonda}`)})
    .catch(err => next(err))
})

router.get('/:id', isLogged, async (req, res, next) => {
  const { id } = req.params

  // Order.findOne({ user: req.user.id, fonda: id })
  //   .then(order => {})
  //   .catch(err = next(err))

  // Menu.findOne({ fonda: id }).populate('fonda')
  //   .then(menu => res.render('fondas/detail', menu))
  //   .catch(err => res.send(err))

  const [{ _id }, { _doc: menu }] = await Promise.all([
    Order.findOne({ user: req.user.id, fonda: id }),
    Menu.findOne({ fonda: id }).populate('fonda')
  ])

  res.render('fondas/detail', { ...menu, order: _id })
  console.log({ ...menu, order: _id })

  /*Order.findOne({ user: req.user.id, fonda: id })
    .then(({_id}) => {
      
        .then(menu => {
        res.render('fondas/detail', menu)
        const something = { ...menu, order: _id }
        console.log(something)
        //res.send(something)
        })
        .catch(err => res.send(err))
      })
    .catch(err => res.send(err))*/
})

module.exports = router

