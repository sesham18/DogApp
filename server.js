"use strict"; 

const express = require('express');
const app = express();
const dogRouter = require('./router'); 

app.use(morgan('common')); 
app.use(express.static('public'));


app.use('/doggone', dogRouter);

if (require.main === module) {
    app.listen(process.env.PORT || 8080, function() {
    });
}

module.exports = app;