var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var JWTstrategy = require('passport-jwt').Strategy
var ExtractJWT = require('passport-jwt').ExtractJwt
var bcrypt = require('bcrypt')
var funcionarioController = require('../controllers/funcionario')

/* Registo de utilizadores */
passport.use('registo', new LocalStrategy({
    passReqToCallback: true,
    usernameField : 'email',
    passwordField : 'password',
}, (req, email, password, done) => {
      /* Adds user to Database */
      funcionarioController.listarEmail(email)
                    .then(user => {
                      if(!user[0]) {
                        bcrypt.hash(req.body["password"], 10, function(err, hash) {
                          if (!err) {
                              req.body["password"] = hash;
                              
                              funcionarioController.inserir(req.body)
                              return done(null, req.body);
                          } else {
                          }
                      })} else {
                        return done(user, null);
                      }
                    })
                    .catch(erro => {
                      return done(erro, null);
                    })
  })
)

/* Autenticação de Login */
passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    (email, password, done) => {
      funcionarioController.listarEmail(email)
                    .then(async user => {
                      if (!user) {
                        return done(null, null, {message: 'Utilizador inexistente!'})
                      }
                      var validate = await bcrypt.compare(password, user[0].password)

                      if (!validate) {
                        return done(null, null, {message: 'Password inválida!'})
                      }
                      return done(null, user, {message: "erro"})
                    })
                    .catch(erro => done(erro, null, {message: "Outro erro"}))
  }))

  var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['token'];
    return token;
  };

  passport.use('jwt', new JWTstrategy({
    secretOrKey: 'lei2018',
    jwtFromRequest: ExtractJWT.fromExtractors([ExtractJWT.fromAuthHeaderAsBearerToken()])
}, (token, done) => {
    try{
      return done(null, token.user)
    }
    catch(erro){
        return done(erro)
    }
}))