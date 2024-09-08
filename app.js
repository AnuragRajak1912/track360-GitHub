require('dotenv').config();

// imported modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// imported modules created by track360 team
const User = require("./models/userSchema")

const port = process.env.PORT||8000;

// required 
const app = express();
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, './public')))
app.set('view engine','ejs');
app.set('views',path.join(__dirname, './views'));

// connecting DB
mongoose.connect(process.env.MONGODB_URI).
        then( (e)=> {console.log(`MongoDB Connected`);

        // const newUser = new User({
        //     name: 'Anurag Rajak',
        //     email: 'anurag.rajak.cs21@ggits.net',
        //     contactNumber: 1234567890,
        //     role: 'SuperUser'
        // });
        // return newUser.save();

    });


app.get('/', (req, res) => {
  res.render("index");
})

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})