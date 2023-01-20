const mongoose = require("mongoose")
const  Joi = require("joi")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
    },
})

const Category = mongoose.model("Category", categorySchema)

const validate = (category) => {
    const categorySchema = Joi.object({
        name: Joi.string().required().min(3),
    });

    return categorySchema.validate(category);
}

exports.Category = Category;
exports.categorySchema = categorySchema;
exports.validateCategory = validate;