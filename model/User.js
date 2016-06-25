var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

// TODO: Implement with hashing etc.
UserSchema.methods.verifyPassword = function(password) {
    return this.password === password;
};

module.exports = mongoose.model('User', UserSchema);
