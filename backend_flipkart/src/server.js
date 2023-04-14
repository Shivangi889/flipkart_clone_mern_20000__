const express = require('express');
const env = require('dotenv');
const app =express();
const bodyParser = require('body-parser');
const mongoose =require('mongoose');


//routes
const userRoutes =require('./routes/userAuth');


//environment variable or we can sat constants 
env.config();

//mongodb connection

mongoose.connect('mongodb+srv://root:shivflip09@cluster0.houot6k.mongodb.net/?retryWrites=true&w=majority'
, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
  

}).then(() => { console.log("Connected to database"); })
  .catch((e) => { console.log(e) });



 app.use(bodyParser());
// app.use(express());


app.use('/api',userRoutes);


app.listen(2000, () => {
    console.log(`Server Started at ${2000}`)
});




