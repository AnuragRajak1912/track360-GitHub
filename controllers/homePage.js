const project = require('../models/projectSchema');

exports.homePage = async (req,res)=>{

    const projects = await project.find({isPrivate:false});

    res.render('homepage',{
        projects
    });

}