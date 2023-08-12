const express = require('express')
const app = express()
const UserController = require('./controllers/Users')


app.use(express.json())
app.use('/users', UserController)

app.get('/', (req, res) => {
    res.send("<h1>Hello all ye nations of planet EARF</h1>")
})


app.listen(4000, function() {
    console.log("We're gonna put pics on port 4000")
})