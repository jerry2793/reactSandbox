const Auth = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

// create the middleware to authenticate the user before passing on to the request handler
const requireAuth = passport.authenticate('jwt', { session: false }) // false session to not use cookie based auth
const requireSignin = passport.authenticate('local', { session: false });


module.exports = function (app) {
    app.get('/', requireAuth, (req,res) => { res.send('you are authenticated and the req handler is ran') }); // testing if auth is working
    app.post('/signin', requireSignin, Auth.signin);
    app.post('/signup', Auth.signup);
}