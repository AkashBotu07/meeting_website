const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    image: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    reset_token: {
        type: String,
        default: ''
    },
    uploaded: {
        type: Array,
        default: []
    },
    sharedWithMe: {
        type: Array,
        default: []
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verification_token: {
        type: String,
        default: ''
    },
    phone: {
        type: String, // Assuming phone number is stored as string
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    }
});


userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', { virtuals: true });


exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
