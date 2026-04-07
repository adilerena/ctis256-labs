import express from "express"
import multer from "multer"
import db from "./db.js"
import path from "path"
import { error } from "console"

const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/uploads"),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const name = path.basename(file.originalname, ext)
        cb(null, `${Date.now()}-${name}${ext}`)
    }
})

const upload = multer({storage})

const errMsg = {
    "1": "Invalid file type"
}

app.get("/", async (req, res) => {
    const [photos] = await db.query("select * from album")

    res.render("index", {photos, error: errMsg[req.query.error]})
})

app.post("/", upload.single("photo"), async (req, res) => {
    
    const ext = path.extname(req.file.originalname).toLocaleLowerCase()

    if (![".jpg", ".png", ".gif"].includes(ext)) {
        return res.redirect("/?error=1")
    }

    await db.query("INSERT INTO album (filename, original, tags) VALUES (?,?,?)", 
        [req.file.filename, req.file.originalname, req.body.tags]
    )

    res.redirect("/")
})

app.listen(3000, () => {
    console.log("Application started on port 3000")
})