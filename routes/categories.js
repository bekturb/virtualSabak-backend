require("express-async-errors");
const express = require("express");
const routers = express.Router();
const { Category, validateCategory } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
routers.use(express.json());

routers.get("/", auth, async (req,res) => {
    throw new Error("Kategoriyani alyshta kutulbogon kata berdi!")
        const resultBooks =  await Category.find().sort("name")
        res.send(resultBooks);
})

routers.get("/:id", auth,async (req,res) => {
    const category = await Category.findById(req.params.id);
    if (!category){
        res.send("Berilgen idge ylaiyk kelgen categoriya jok");
    }
    res.send(category);
});

routers.post("/", auth, async (req,res) => {

    const {error} = validateCategory(req.body);

    if (error)
        return res.status(400).send(error.details[0].message)

    let category = new Category({
        name: req.body.name
    })
    try{
         category = await category.save();
        res.status(201).send(category);
    }catch (ex){
        console.log(ex)
    }
})

routers.put("/:id", auth, async (req,res) => {
    const {error} = validateCategory(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const category = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
    if (!category){
        res.send("Berilgen idge ylaiyk kelgen categoriya jok");
    }
    res.send(category);

});

routers.delete("/:id", [auth, admin], async (req,res) => {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category){
        res.send("Berilgen idge ylaiyk kelgen categoriya jok");
    }
    res.send(category)
})

module.exports = routers;