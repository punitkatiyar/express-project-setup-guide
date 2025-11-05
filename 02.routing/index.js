const express = require('express')
const app = express()
const port = 8000

app.set('view engine','ejs')

// accepts form data
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home')
})

//////////////////////////////////////////////////////////////////////////
app.get('/insert', (req, res) => {
    res.render('add-contact', { title: "Insert Page" });
})

app.post('/insert', async (req, res) => {
    await students.insertOne({
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

app.get('/view', (req, res) => {
  res.render('show-contact')
})

app.get('/update', (req, res) => {
  res.render('update-contact')
})

app.get('/delete', (req, res) => {
  res.render('delete-contact')
})






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})