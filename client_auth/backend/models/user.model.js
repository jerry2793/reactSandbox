const mongoose = require('mongoose')
// const { Schema, Model } = require("mongoose");
const bcrypt = require('bcrypt-nodejs')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type:String,
        unique:true,
        lowercase:true,
    },
    password: {
        type:String
    },
})

userSchema.pre('save', function (next) {
    const user = this
    console.log('this statement of pre save: ',this)

    // generate the salt, then run the callback (takes 10 ms to generate)
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { console.log(err); return next(err) }

        // encrypt the pwd with the generated salt, run call back
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { console.log(err); return next(err) }

            // overwrite the old pwd with the new generated hash (ecryption)
            console.log(hash)
            console.log(user.password)
            user.password = hash
            next() // call the save function by mongoose
        })
    })
})

// when create a user ins, its gonna have access to any functions defined on this prop
userSchema.method.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return callback(err) } else {
            callback(null, isMatch);
        }
    })
}

const userModel = mongoose.model('User', userSchema)

module.exports = userModel