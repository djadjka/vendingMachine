const express = require('express');
const app = express();


const mongoose = require('mongoose');
require('./models');
mongoose.connect('mongodb://mongo:27017', { useNewUrlParser: true });
mongoose.Promise = global.Promise;


app.use(require('./routes'));


app.listen(3000, () => {
	console.log('3000');
});


module.exports = app;