const router = require('express').Router()
const User   = require('User')

router.get('/', (req, res, next) => {
  const { name } = req.user
  res.render('user/dashboard', name)
})

module.exports = router