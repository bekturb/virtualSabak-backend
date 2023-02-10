const express = require("express");
const routers = express.Router();
const { Enrollments, validate } = require("../models/enrollment")
const { Course } = require("../models/course")
const { Customer } = require("../models/customer");
const auth = require("../middleware/auth");
routers.use(express.json());

routers.get("/",  auth, async (req,res) => {
    let enrollments = await Enrollments.find().sort("-dateStart");
    res.send(enrollments)
});
routers.post("/",  auth,async (req,res) => {
    const {error} = validate(req.body)

    if (error)
        return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId);
    if (!customer){
        res.send("Berilgen idge ylaiyk kelgen customer jok");
    }

    const course = await Course.findById(req.body.courseId);
    if (!course){
        res.send("Berilgen idge ylaiyk kelgen course jok");
    }

    let enrollment = await new Enrollments({
        customer: {
            _id: customer._id,
            name: customer.name
        },
        course: {
            _id: course._id,
            title: course.title
        },
        courseFee: course.fee
    });

    if (customer.isVip){
        enrollment.coursefee = course.fee - (0.2 * course.fee)
    }

    enrollment = await enrollment.save();

    customer.bonusPoints++;
    customer.save();

    res.send(enrollment);
});

routers.get("/:id",  auth, async (req, res) => {

    const enrollment = await Enrollments.findById(req.params.id);

    if (!enrollment)
        return res.status(400).send("Berilgen idge ten bolgon enrollment jok")

    res.send(enrollment)

});

module.exports = routers;