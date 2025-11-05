```
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8000;
const Users = require("./models/users_model")


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }))

mongoose.connect('mongodb://127.0.0.1:27017/contact-app')
    .then(() => console.log("database Connected"));

app.get('/', (req, res) => {
    let ducat = "Home"
    res.render('home', { ducat })
})
app.get('/insert', (req, res) => {
    let ducat = req.path
    res.render('insert', { ducat })
})

// insert

app.post('/insert', async (req, res) => {
    await Users.insertOne({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userMobile: req.body.userMobile,
    })
    res.redirect("/view")
})


//  view
app.get('/view', async (req, res) => {
    const users = await Users.find()
    res.render('view', { users })
})

//  single data

app.get('/view/:id', async (req, res) => {
    const users = await Users.findOne({ _id: req.params.id })
    res.render('profile', { users })
})

app.get('/edit/:id', async (req, res) => {
    const users = await Users.findOne({ _id: req.params.id })
    res.render('edit', { users })
})

app.post('/edit/:id', async (req, res) => {
    await Users.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/view")

})

app.get('/delete/:id', async (req, res) => {
    await Users.findByIdAndDelete(req.params.id)
    res.redirect("/view")
})

app.listen(port, () => {
    console.log(`server Start : http://localhost:${port}`)
})


```
