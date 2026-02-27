import express from "express"
const app = express()
app.set("view engine", "ejs")
//Middleware
// it builds req.body <--- parsed urlencoded form data
app.use(express.urlencoded({extended:true}))

//Routing

app.get("/", (req, res) => {
    //res.send("Hello...")
    res.render("form")
})

app.post("/", (req, res) => {
    //console.log(req.body)
    //res.send("POST request sent")

    const n1 = parseFloat(req.body.n1)
    const n2 = Number(req.body.n2)
    const op = req.body.op

    let result
    switch (op) {
        case "add": result = n1 + n2 ; break;
        case "sub": result = n1 - n2 ; break;
        case "mul": result = n1 * n2 ; break;
        case "div": result = n1 / n2 ; break;
    }

    // res.send(`
    //     <p>Result: ${result}</p>
    //     <p><a href="/">Go back to Form</a></p>`)

    res.render("form", {result, ...req.body})
})

app.listen(3000, () => console.log("Started..."))