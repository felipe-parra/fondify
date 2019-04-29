exports.isLogged = (req, res, next) => {
  if(req.isAuthenticated()) next()
  else res.redirect('/login')
}

exports.checkRole = role => (req, res, next) => {
  role !== req.user.role ? res.send('Unauthorized') : next()
  
}