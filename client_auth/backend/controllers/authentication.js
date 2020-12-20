const jwt = require('jwt-simple')
const User = require('../models/user.model')

const config = require('../config')


function tokenForUser (user) {
    // user: the user instance of the model

    // id is a good option, bc it is constant throughout (email can change)
    return jwt.encode({ 
        sub/* subject, whose it belongs */: user._id,
        iat /* issued at time*/: new Date().getTime()
    }, config.secret) 
}


exports.signin = (req,res,next) => {
    // user already have email and pwd authed, just a token
    // remember we passed in the user object from passport.js, which is passed in as req.user
    res.json({ token: tokenForUser(req.user) })
}

exports.signup = (req,res,next) => {
    const { email, password } = req.body
        
    if (!email || !password) {
        res.status(422).json({error: 'you must provide an email or password'})
    }

    User.findOne({ email: email }, (err, user) => {
        // if erro in dealing with the db
        if (err) { return next(err) }

        // email already in the db
        if (user) {
            return res.status(422).send({error: 'Email is in use'})
        }

        // if no error, then save the user
        const newUser = new User ({
            email: email,
            password: password
        })
        // console.log(email, password) // working
        newUser.save(err => {
            if (err) {return next(err)} else {
                res.json({ token: tokenForUser(newUser) })
            }
        })
    })
}