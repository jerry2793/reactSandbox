// answer whether user is logged in before they hit the controllers
// centralize cause it is cleaner code (logic is the same)

// passport is an ecosystem, rather than a lib (larger) (two strategies: method for auth user)

const passport = require('passport')
// create local strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

const User = require('../models/user.model')
const config = require('../config')


// use only emails and pwd to auth a user and then issue a token (login)
// notice usernameField which means by defaults it looks for username, but we need it to use email as the username
const localLogin = new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err) }
        if (!user) { return done(null, false) }

        // compare pwd
        user.comparePassword(password, function (err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }

            return done(null, user)
        })
    })
})


// set up stragegies for jwt
const jwtOptions = {
    // tell where to look (header?, get param?, post body?)
    jwtFromRequest: ExtractJwt.fromHeader('authorization'), // authorization value of the header
    secretOrKey: config.secret // a secret for jwt to decode the userid
}

// create strategies
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // payload: decoded token (data associated with the sign)
    // done: callback to call if it is successfully auth
    
    // goal: if userId and payload exist in db (true: call done, call done w\ user ins)
    User.findById(payload.sub, function (err, user) {
        if (err) { return done(err, false/* did not find */); }

        if (user) {
            done(null, user)
        } else {
            // no err in searching for user, but did not find it anyways
            done(null, false)
        }
    })
})

// tell passport to use this strategy in different situations
passport.use(localLogin)
passport.use(jwtLogin)