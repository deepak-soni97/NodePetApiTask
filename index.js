const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PORT = 8080;
const connectDB = require('./db/conn');
const petStore = require('./src/routes/petStore')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

connectDB();

app.use('/v2',petStore);


app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
})

// let petData = [];
// let orderData = [];

// app.post('/petstore/orders',(req,res)=>{
//     const order = req.body;

//     data=orderData.push(order);
//     console.log(data);
// })
// console.log(orderData);