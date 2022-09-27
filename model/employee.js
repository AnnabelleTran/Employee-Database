const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    gender:{
        type: String
    },
    department:{
        type: String
    },
    salary:{
        type: Number
    }
})

const employees = mongoose.model('Employee', employeeSchema)
module.exports = employees