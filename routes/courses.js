const express = require("express");
const routers = express.Router();
const { Course, validate } = require("../models/course");
const {Category} = require("../models/category");
routers.use(express.json());

routers.get("/", async (req,res) => {
    let courses = await Course.find().sort("title");
    res.send(courses)
});

routers.post("/", async  (req, res) => {
    const {error} = validate(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    let category = await Category.findById(req.body.categoryId);
    if (!category)
        return res.status(400).send("Berilgen Idge ylaiyktuu bolgon category jok!")

    let course = await new Course({
        tags: req.body.tags,
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name,
        },
        trainer: req.body.trainer,
        status: req.body.status,
        fee: req.body.fee
    })

    course = await course.save();
    res.send(course);
});

routers.get("/:id", async (req,res) => {
    const course = await Course.findById(req.params.id);
    if (!course)
        res.send("Berilgen Id ge ylaiyktuu klient jok");
        res.send(course)
});

routers.put("/:id", async(req,res) => {
    const {error} = validate(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    let category = await Category.findById(req.body.categoryId);
    if (!category)
        return res.status(400).send("Berilgen Idge ylaiyktuu bolgon category jok!")

    const course = await Course.findByIdAndUpdate(req.params.id,{
        tags: req.body.tags,
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name,
        },
        trainer: req.body.trainer,
        status: req.body.status,
        fee: req.body.fee
    });
    if (!course)
        res.send("Berilgen Id ge ylaiyktuu klient jok");

    res.send(course)
});

routers.delete("/:id", async (req,res) => {
    const course = await Course.findByIdAndRemove(req.params.id);
    if (!course)
        res.send("Berilgen Id ge ylaiyktuu klient jok");
    res.send(course)
})

module.exports = routers;