const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PORT = 8080;
const connectDB = require('./db/conn');
const pet = require('./src/routes/pet');
const petStore = require('./src/routes/petStore')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

connectDB();

app.use('/v2',pet);
app.use('/v2',petStore);

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
})

