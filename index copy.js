const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const methodOverride = require('method-override')
const app = express();
app.use(express.static('public'));
mongoose.connect('mongodb://localhost:27017/EmployeeDB');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

const port = 2000;
const employee = require("./model/employee");
const employeeRoutes = require("./routes/employee");

app.use (employeeRoutes);

app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));



app.listen(port, () =>{
    console.log(`App listening on port ${port}`)
})














