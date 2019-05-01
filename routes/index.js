const express       = require('express');
const { isLogged }  = require('../helpers/middlewares')
const router        = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
