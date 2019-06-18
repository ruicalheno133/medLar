var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken')
var router = express.Router();


/* POST  - Processar registo. */
router.post('/registo', (req, res, next) => {
    passport.authenticate('registo', (err, user, info) => { 
            if(err) return next(err)
            else res.jsonp(user)
    })(req, res, next);
  });

/* GET - Processar logout. */
router.get('/logout', function(req, res) {
    req.logout()
    res.clearCookie('token')
    res.end()
  });


/* POST - Processar login. */
router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => { 
            if(!user){
              console.log(info)
              return res.status(500).json(info)
            } 
            else if (err) { return next(err); }
            else {
            req.login(user, { session : false }, (error) => {
                if (error) return next(error)
                var myUser = {
                  idFuncionario: user[0].idFuncionario, 
                  email: user[0].email }
                var token = jwt.sign({ user : myUser}, 'lei2018');
                res.cookie('token', token);
                return res.json({token});
            });
          }
    })(req, res, next);
  });

module.exports = router;