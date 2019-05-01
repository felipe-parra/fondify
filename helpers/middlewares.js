exports.isLogged = (req, res, next) => {
  if(req.isAuthenticated()) next()
  else res.redirect('/login')
}

exports.checkRole = role => (req, res, next) => {
  role !== req.user.role ? res.redirect('/') : next()
}

exports.validateTypeLog = (req,res,next) => {
  if(req.isAuthenticated()) {
    (req.user.role == 'fonda') ? res.redirect('/fondas/dashboard') : res.redirect('/user/dashboard')
    next()
  }
  else res.redirect('/login')
}