const express = require("express");
const { Customer, validateCustomer } = require("../models/customer")
const routers = express.Router();
routers.use(express.json())

routers.get("/", async (req, res) => {
    const customers = await Customer.find().sort("name");
    res.send(customers)
});

routers.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
        res.send("Berilgen Id ge ylaiyktuu klient jok")
    res.send(customer)
});

routers.post("/", async (req, res) => {

    const {error} = validateCustomer(req.body)

    if (error)
        return res.status(400).send(error.details[0].message)

    const customer = new Customer({
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone,
        bonusPoints: 0
    })
    const newCostumer = await customer.save();
    res.status(201).send(newCostumer)
});

routers.put("/:id", async (req, res) => {

    const {error} = validateCustomer(req.body)

    if (error)
        return res.status(400).send(error.details[0].message)
    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
        },
        {
            new: true
        }
    );
    if (!customer)
        res.send("Berilgen Id ge ylaiyktuu klient jok")

    res.send(customer)
});

routers.delete("/:id", async (req,res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer)
        res.send("Berilgen Id ge ylaiyktuu klient jok")

    res.send(customer)
})

module.exports = routers;