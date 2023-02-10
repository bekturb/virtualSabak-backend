const express = require("express");
const mongoose = require("mongoose");
const config = require("config")
const categories = require("./routes/categories");
const customers = require("./routes/customers")
const courses = require("./routes/courses");
const enrollments = require("./routes/enrollments");
const users = require("./routes/users");
const authRouter = require("./routes/auth");
const errorMiddleWare = require("./middleware/error");
const winston = require("winston");
require ("winston-mongodb");

winston.add(new winston.transports.Console());
winston.add(new winston.transports.File({filename: "logs/vs-logs.log", level: "error"}));
winston.add(new winston.transports.MongoDB({ db: "mongodb://localhost/virtualLesson-logs", level: "info"}));

process.on("uncaughtException", ex => {
    winston.error(ex.message, ex)
});

process.on("unhandledRejection", ex => {
    winston.error("unhandledRejection katasy" + " " + ex.message, ex)
})

const myPromise = Promise.reject("Dagy bir kutulbogon kata!").then("Buttu")

throw new Error("Kutulbogon kata")

if (!config.get("jwtPrivateKey")){
    winston.error("Oluttuu kata: virtualsabak_jwtPrivateKey achkychy anyk emes");
    process.exit();
}

mongoose.set("strictQuery", true)
mongoose.connect("mongodb://localhost/virtualLesson")
    .then(() => {
        winston.debug("MongoDB ge uulanysh iygiliktuu boluuda...")
    })
    .catch((err) => {
        winston.error("MongoDB ge uulanysh iygiliktuu boluuda...", err)
    })

const app = express();
app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/customers", customers);
app.use("/api/courses", courses);
app.use("/api/enrollments", enrollments);
app.use("/api/users", users);
app.use("/api/auth", authRouter);
app.use(errorMiddleWare);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    winston.info(`${port}tu ugup jatabyz!`)
});