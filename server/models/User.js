var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// TODO: Implement with hashing etc.
UserSchema.methods.verifyPassword = function(password) {
    return this.password === password;
};

module.exports = mongoose.model('User', UserSchema);
