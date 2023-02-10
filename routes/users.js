const express = require("express");
const _ = require("lodash")
const {Users, validate} = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const routers = express.Router()
routers.use(express.json());

routers.get("/me",  auth,  async(req, res) => {
    const users = await Users.findById(req.user._id).select("-password");
    res.send(users)
});

routers.post("/",  async(req, res) => {
    const {error} = validate(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    let user =  await Users.findOne({email: req.body.email})
    if (user)
        return res.status(400).send("Myndai email koldongon koldonuuchu bar")

     user = new Users(_.pick(req.body, ["name", "email", "password", "isAdmin"]))

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await  user.save();
    res.send(_.pick(user, ["_id", "name", "email", "isAdmin"]))
});

routers.get("/:id",  auth, async(req, res) => {
    const user = await Users.findById(req.params.id);
     if (!user)
         return res.send("Berilgen idge ylaiyk kelgen koldonuuchu jok!")

    res.send(user)
});

routers.put("/:id",  auth, async(req, res) => {

    const {error} = validate(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const user = await Users.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    });
    if (!user)
        return res.send("Berilgen idge ylaiyk kelgen koldonuuchu jok!")

    res.send(user)
});

routers.delete("/:id",  auth, async(req, res) => {
    const user = await Users.findByIdAndRemove(req.params.id);

    if (!user)
        return res.send("Berilgen idge ylaiyk kelgen koldonuuchu jok!");

    res.send(user)
});

module.exports = routers;