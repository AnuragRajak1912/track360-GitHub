const { Schema , model } = require('mongoose');

const companySchema = new Schema({

    companyName : {
        type : String,
        required : true,
    },

    companyAddress : {
        type : String,
        required : true,
    },

    companyContactNumber : {
        type : Number,
        required : true,
    },

    companyAdminName : {
        type : String,
        required : true,
    },

    companyAdminEmail : {
        type : String,
        required : true,
        unique : true,
    },

    companyAdminPassword : {
        type : String,
        required : true,
    },

    dirPath: {
        type: String,
        required: true
    },

}, { timestamps : true });

const company = model('company',companySchema);
module.exports = company;