import express from "express"
import { body, validationResult } from "express-validator"
const app = express()
app.set("view engine", "ejs")
app.use( express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.render("form", {method: "GET", form: null, errorList: null})
})

app.post("/", 
    body("name").trim().notEmpty().withMessage("Enter a valid name"),
    body("department").notEmpty().withMessage("Choose a department"),
    body("gender").exists().withMessage("Choose a gender"),
    body("agree").exists().withMessage("You must agree to proceed"),
    (req, res) => {
        const errors = validationResult(req)
        const errorList = errors.isEmpty() ? null : errors.mapped()
        res.render("form", {method: "POST", form: req.body, errorList})
    })

app.listen(3000, () => console.log("started on 3000"))