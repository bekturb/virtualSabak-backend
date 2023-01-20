const express = require("express");
const _ = require("lodash")
const { Users } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Joi = require("joi");
const routers = express.Router()
routers.use(express.json());

routers.get("/", async (req, res) => {
   const { error } = validate(req.body);

   if (error)
       return res.status(400).send(error.details[0].message);

   let user = await Users.findOne({ email: req.body.email });

   if (!user)
       return res.status(400).send("Email je parol tuura emes");

   const isValidPassword = await bcrypt.compare(req.body.password, user.password);
   if (!isValidPassword)
       return  res.status(400).send("Email je parol tuura emes");

   const token = jwt.sign({_id: user._id}, "8bMen1nOzDukAchkiychYm@.");
   res.header("x-auth-token", token).send(true)
})

const validate = (user) => {
    const validateSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    return validateSchema.validate(user);
}

module.exports = routers;