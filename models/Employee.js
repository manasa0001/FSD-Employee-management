const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    designation: String,
    salary: Number
});

module.exports = mongoose.model('Employee', employeeSchema);
