const mongoose = require("mongoose");
const Joi = require("joi");

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const Users = mongoose.model("Users", new mongoose.Schema({
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
    }
}));

const validateUser = (user) => {
    const validateSchema = Joi.object({
        name: Joi.string().required().trim().min(3).max(100),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    return validateSchema.validate(user);
}

exports.Users = Users;
exports.validate = validateUser;