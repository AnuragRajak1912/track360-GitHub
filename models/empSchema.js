const { Schema , model } = require('mongoose')

const empSchema = new Schema({
    
    empName : {
        type : String,
        required : true,
    },

    empEmail : {
        type : String,
        required : true,
    },

    empPassword : {
        type : String,
        required : true,
    },

    companyID : {
        type : Schema.Types.ObjectId,
        ref : 'company',
    },

    govID : {
        type : Schema.Types.ObjectId,
        ref : 'gov',
    }

}, { timestamps : true });

const emp = model('emp',empSchema);
module.exports = emp;