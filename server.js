const express = require('express')

const path = require('path')

const app = express()

const port = 3001

app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.sendFile(path.join(_dirname), 'public', 'index.html')
})

app.listen(port, ()=> {console.log(`Server is running on port ${port}`)})