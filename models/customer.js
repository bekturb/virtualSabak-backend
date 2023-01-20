const mongoose = require("mongoose")
const  Joi = require("joi")

const customersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
        minLength: 3,
    },
    isVip: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    bonusPoints: Number,
});

const Customer = mongoose.model("customer", customersSchema)

const validateCustomer = (val) => {

    const customerSchema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        isVip: Joi.boolean().required(),
        phone: Joi.string().required().min(5).max(50),
        bonusPoints: Joi.number().min(0)
    });

    return customerSchema.validate(val)
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;