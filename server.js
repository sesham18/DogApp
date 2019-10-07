"use strict"; 

const express = require('express');
const app = express();
const dogRouter = require('./router'); 
const morgan = require('morgan');

app.use(morgan('common')); 
app.use(express.static('public'));

//app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/views/index.html');
  //});
  

app.use('/doggone', dogRouter);

if (require.main === module) {
    app.listen(process.env.PORT || 8080, function() {
    });
}

module.exports = app;