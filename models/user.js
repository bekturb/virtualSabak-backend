const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");


const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required:true,
        minLength: 3,
        maxLength:100
    },
    email:{
        type: String,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get("jwtPrivateKey"));
    return token;
}

const Users = mongoose.model("Users", userSchema);

const validateUser = (user) => {
    const validateSchema = Joi.object({
        name: Joi.string().required().trim().min(3).max(100),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        isAdmin: Joi.boolean().required()
    });

    return validateSchema.validate(user);
}

exports.Users = Users;
exports.validate = validateUser;