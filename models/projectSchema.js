const { Schema , model } = require('mongoose');

const projectSchema = new Schema({
    
    projectName : {
        type : String,
        required : true,
    },

    projectDescription : {
        type : String,
    },

    govMinistry : {
        type : String,
    },

    projectStartDate : {
        type : Date,
        required : true,
    },

    projectForcastedEndDate : {
        type : Date,
        required : true,
    },

    budgetAllotted : {
        amount : [{
            type : Number,
        }],
        time : [{
            type : Date,
            default : Date.now
        }]
    },

    projectStatus : {
        type : String,
        enum : ['Pending','In Progress','Completed'],
        default : 'Pending',
    },

    isPrivate : {
        type : Boolean,
        default : false,
    },

    companyID : {
        type : Schema.Types.ObjectId,
        ref : 'company',
    },

    govID : {
        type : Schema.Types.ObjectId,
        ref : 'gov',
    },

    empRoles : {
        PM : [{
            type : Schema.Types.ObjectId,
            ref : 'emp',
        }],

        QA : [{
            type : Schema.Types.ObjectId,
            ref : 'emp',
        }],

        HR : [{
            type : Schema.Types.ObjectId,
            ref : 'emp',
        }],

        FO : [{
            type : Schema.Types.ObjectId,
            ref : 'emp',
        }],

        SE : [{
            type : Schema.Types.ObjectId,
            ref : 'emp',
        }],

        govQA : [{
            type : Schema.Types.ObjectId,
            ref : 'gov',
        }],

        govHR : [{
            type : Schema.Types.ObjectId,
            ref : 'gov',
        }],
    },

    dirPath: {
        type: String,
    },
        
});

const project = model('project',projectSchema);
module.exports = project;