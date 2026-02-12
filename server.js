const express = require('express')

const path = require('path')

const app = express()

const port = 3001

const users = {}
//Structure: { username: {notes: [ id, content, createdAt}]}}

app.use(express.json())
app.use(express.static('public'))

const validateUserName = (req, res, next)=>{
    const username = req.body.username || req.params.username || req.query.username

    if (!username || username.trim() === '')
    {
        return res.status(400).json({ error: 'Username is required'})
    }
}

app.post('/api/login', (req, res)=>{
    const username = req.body?.username
    var isNewUser = false
    if (!users[username])
    {
        users[username] = {notes:[]}
        isNewUser = true
        console.log(`New user created ${username}`)
    }

    res.json({
        success:true,
        username,
        message: isNewUser ? "New user created" : "Welcome Back!!"
    })
})

app.post('api/users/:username/notes', (req, res)=>{
    const username = req.params.username
    const noteContent = req.body.content

    if(!user[username]){
        return res.status(404).json({error: 'User is not logged in'})
    }

    const newNote = {
        id: Date.now(),
        content: noteContent.trm(),
        createdAt: new Date().toISOString()
    }

    users[username].notes.push(newNote)

    res.status(201).json({
        success: true,
        note: newNote
    })
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, ()=> {console.log(`Server is running on port ${port}`)})