const mongoose = require("mongoose");
const { categorySchema } = require("./category")
const Joi = require("joi");

const courseSchema = new mongoose.Schema({
    tags: {
        type: Array,
        validate: {
            validator: (val) => {
                return val && val.length > 0;
            },
            message: "Kurstun  aty keminde birge ten bolushu kerek"
        }
    },
    title: {
        type: String,
        trim: true,
        required: true,
        minLength: 3,
        maxLength: 100,
    },
    category: {
        type: categorySchema,
        required: true,
    },
    trainer: {
        type: String,
        trim: true,
        required: true,
        minLength: 3,
        maxLength: 100,
    },
    status: {
        type: String,
        trim: true,
        required: true,
        enum:["Active", "InActive"]
    },
    fee: {
        type: Number,
        required: true
    }
});

const Course = mongoose.model("Course", courseSchema);

const validateCourse = (course) => {
    const validateSchema = Joi.object({
        title: Joi.string().required().min(3).max(50),
        categoryId: Joi.string().required(),
        trainer: Joi.string().required(),
        status: Joi.string().required(),
        tags: Joi.array().items(Joi.string()),
        fee: Joi.number().min(0)
    });

    return validateSchema.validate(course);
}

exports.Course = Course;
exports.courseSchema = courseSchema;
exports.validate = validateCourse;