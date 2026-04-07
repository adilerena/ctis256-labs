import express from "express"
const app = express()

app.get("/", (req, res) => {
    const time = new Date().toLocaleTimeString("tr-TR", 
        { hour: "2-digit", minute: "2-digit", second: "2-digit"}
    )
    res.send(`
        <h2>Welcome to the page</h2>
        <h3>${time}</h3>    
    `)
})

app.get("/task", (req, res) => {
    task(10000)
    res.send(`<p>Task is completed in 10 seconds</p>`)
})

function task(ms) {
    const start = Date.now()
    while (Date.now() - start < ms) { }
}
app.listen(3000)