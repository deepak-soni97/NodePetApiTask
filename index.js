const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PORT = 8080;
const connectDB = require('./db/conn');
const pet = require('./src/routes/pet.routes');
const order = require('./src/routes/order.routes');
const user = require('./src/routes/user.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

connectDB();

// Middleware to set the required response headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,api_key,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });


app.use('/v2',pet);
app.use('/v2',order);
app.use('/v2',user);

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
})

