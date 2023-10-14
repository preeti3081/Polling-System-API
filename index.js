const express = require('express');
const port = 8000;
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/mongoose');
const question = require('./model/polling');


app.use(express.urlencoded({ extended: true }));
app.use('/',require('./routes/index'));
app.use(express.json());


app.listen(port,function(err){
    if(err){console.log('Error in running server',err);}
    console.log('Yup!My express server is running on port:',port);
});