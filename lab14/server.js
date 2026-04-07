import express from "express"
const app = express()

app.get("/", async(req, res) => {
    try {
        const response = await fetch("https://dummyjson.com/users")
        const data = await response.json()
        const users = data.users.map(user => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email
        }))
        //console.log(users)

        res.send(`
            <h1>Users</h1>    
            <ul>
                ${
                    users.map( u => `
                        <li>
                            <a href="/users/${u.id}/posts">${u.name}</a>
                            {${u.email}}
                        </li>`).join("")
                }
            </ul>
        `)
    } catch (error) {
        res.status(500).send("Error fetching users")
    }
    
})

app.get("/users/:id/posts", async(req, res) => {
    const id = req.params.id
    const response = await fetch("https://dummyjson.com/users/" + id + "/posts")
    const data = await response.json()
    res.send(`
        <h1>Posts for userID: ${id}</h1>    
        <ul>
            ${
                data.posts.map( p => `<li>${p.title} (${p.views})</li>`).join("")
            }
        </ul>
        <a href="/"> Back to Users </a>
    `)
})

app.listen(3000)