const express = require('express');

const mongoose = require('mongoose');

const app = express();
const port = 8000;

const Contact = require("./models/contact.models")

// connection 
mongoose.connect('mongodb://127.0.0.1:27017/contact-app')
  .then(() => console.log("DataBase Conneted"))


app.set('view engine', 'ejs')
// accepts form data
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home')
})

//////////////////////////////////////////////////////////////////////////
app.get('/insert', (req, res) => {
  res.render('add-contact', { title: "Insert Page" });
})


app.post('/insert', async (req, res) => {
  await Contact.insertOne({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    mobile: req.body.mobile,
    course: req.body.course,
  })
  // res.send(req.body)
  res.redirect("/")
})

///////////////////////////////////////////////////////////////////////////////////

app.get('/view', async (req, res) => {
  const contacts = await Contact.find()
  res.render('show-contact', { contacts })
})


app.get('/view/:id', async (req, res) => {
  const contacts = await Contact.findOne({ _id: req.params.id })
  res.render('single-contact', { contacts })
})





/////////////////////////////////////////////////////////////////////////////////////

app.get('/update', async (req, res) => {
  const contacts = await Contact.find()
  res.render('update-contact', { contacts })
})


////////////////////////////////////////////////////////////////////////////////////////

app.get('/delete', async (req, res) => {
  const contacts = await Contact.find()
  res.render('delete-contact', { contacts })
})

/////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})