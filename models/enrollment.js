const mongoose = require("mongoose");
const Joi = require("joi");

const enrollmentSchema = new mongoose.Schema({
    customer:  {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            }
        }),
        required: true
    },
    course: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            }
        }),
        required: true
    },
    dateStart:  {
        type: Date,
        required: true,
        default: Date.now
    },
    courseFee:{
        type: Number,
        min: 0
    }
});

const Enrollments = mongoose.model("Enrollments", enrollmentSchema)

const validateEnrollment = (enrollment) => {
    const validateSchema = Joi.object({
            customerId: Joi.string().required(),
            courseId: Joi.string().required()
        }
      );

    return validateSchema.validate(enrollment);
}

exports.Enrollments = Enrollments;
exports.validate = validateEnrollment;