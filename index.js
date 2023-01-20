const express = require("express");
const dotenv = require("dotenv");
const categories = require("./routes/categories");
const customers = require("./routes/customers")
const courses = require("./routes/courses");
const enrollments = require("./routes/enrollments");
const users = require("./routes/users");
const authRouter = require("./routes/auth");
const mongoose = require("mongoose");
dotenv.config()

mongoose.set("strictQuery", true)
mongoose.connect("mongodb://localhost/virtualLesson")
    .then(() => {
        console.log("MongoDB ge uulanysh iygiliktuu boluuda...")
    })
    .catch((err) => {
        console.log("MongoDB ge uulanysh iygiliktuu boluuda...", err)
    })

const app = express();
app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/customers", customers);
app.use("/api/courses", courses);
app.use("/api/enrollments", enrollments);
app.use("/api/users", users);
app.use("/api/auth", authRouter);

const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`${port}tu ugup jatabyz!`)
})