const { Schema , model } = require('mongoose');

const govSchema = new Schema({

    govMinistry : {
        type : String,
        required : true,
    },
    
    govContactNumber : {
        type : Number,
        required : true,
    },

    govAdminName : {
        type : String,
        required : true,
    },

    govAdminEmail : {
        type : String,
        required : true,
        unique : true,
    },

    govAdminPassword : {
        type : String,
        required : true,
    },

    dirPath: {
        type: String,
        required: true
    },

}, { timestamps : true });

const gov = model('gov',govSchema);
module.exports = gov;