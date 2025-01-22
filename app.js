require('dotenv').config();

// imported modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// imported modules created by track360 team
const superUser = require("./models/superUserSchema");
const loginRoute = require("./routes/loginRoute");
const superUserRoute = require("./routes/superUserRoute");
const logoutRoute = require("./routes/logoutRoute");
const govRoute = require("./routes/govRoute");
const companyRoute = require("./routes/companyRoute");
const homePageRoute = require("./routes/homePageRoute");
const userRoute = require("./routes/userRoute.js");

const app = express();
const port = process.env.PORT||8000;

// middleware 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));
app.use(cookieParser());

// setting view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname, './views'));

// connecting DB
mongoose.connect(process.env.MONGODB_URI).
        then( (e)=> {console.log(`MongoDB Connected`);
        // Entering data to superUser schema
        // const newUser = new superUser({
        //     name: 'superuser',
        //     email: 'superuser@gmail.com',
        //     password : "superuser",
        // });
        // return newUser.save();
        });

// Routes
app.use('/',homePageRoute);
app.use('/login',loginRoute);
app.use('/superuser',superUserRoute);
app.use('/logout',logoutRoute);
app.use('/gov',govRoute);
app.use('/company',companyRoute);
app.use('/user',userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});