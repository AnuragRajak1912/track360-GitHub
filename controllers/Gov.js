// Importing Function Created By track360 Team
const {validateToken} = require('../utility/jwt');

// Importing Schema Model Created By track360 Team
const emp = require('../models/empSchema');
const project = require('../models/projectSchema')

exports.govAdminDashboardPage = async (req,res)=>{

    const token = req.cookies.authToken;
    if(!token) return res.redirect('/login');

    try{
        const decoded = validateToken(token);
        const username = decoded.name;

        const allProjects = await project.find({govID: decoded.ID});
        const projectIds = allProjects.map(projectIds=>projectIds._id);
        const projectNames = allProjects.map(projectName=>projectName.projectName);
        const projectDescriptions = allProjects.map(projectDescription=>projectDescription.projectDescription);

        res.render('govAdminDashboard',{
            name : username,
            projectIds,
            projectNames,
            projectDescriptions
        });
    }catch(error){
        console.log(error);
        res.redirect('/login');
    }

};

exports.govAdminAddUserPage = (req,res)=>{

    const token = req.cookies.authToken;
    if(!token) return res.redirect('/login');

    try{
        const decoded = validateToken(token);
        const username = decoded.name;
        res.render('govAdmin',{
            name : username
        });
    }catch(error){
        console.log(error);
        res.redirect('/login');
    }

};

exports.govAdminAddUser = async (req, res) => {

    const { 
        emp_name,
        emp_email,
        emp_password
    } = req.body;
    
    const token = req.cookies.authToken;
    let username = '';

    if (!token) return res.redirect('/login');

    try {
        const decoded = validateToken(token);
        username = decoded.name;
        
        const newEmpUser = new emp({
            empName : emp_name,
            empEmail : emp_email,
            empPassword : emp_password,
            govID : decoded.ID
        });

        await newEmpUser.save();

        res.render('govAdmin', {
            name: username,
            status: 'SUCCESS',
            message: 'User added successfully!'
        });
    } catch (error) {
        console.log(error)
        res.render('govAdmin', {
            name: username,
            status: 'ERROR',
            message: 'An error occurred while adding user.'
        });
    }
}

exports.govAdminAddUserPageToProject = (req,res)=>{

    const token = req.cookies.authToken;
    if(!token) return res.redirect('/login');
    const projectId = req.params.id;

    try{
        const decoded = validateToken(token);
        const username = decoded.name;
        res.render('govAdminProject',{
            name : username,
            projectId
        });
    }catch(error){
        console.log(error);
        res.redirect('/login');
    }

};

exports.govAdminAddUserToProject = async (req,res)=>{

    const token = req.cookies.authToken;
    if(!token) return res.redirect('/login');
    const decoded = validateToken(token);
    const username = decoded.name;
    const projectId = req.params.id;

    const {govQA_email} = req.body;

    try{
        const gov_QA = await emp.find({ empEmail: { $in: govQA_email } });

        const addUsers = await project.findByIdAndUpdate(
            projectId,
            {
                $addToSet: {
                    'empRoles.govQA': { $each: gov_QA.map(id=>id._id) } 
                }
            },
            { new: true }
        );

        res.render('govAdminProject',{
            name : username,
            projectId,
            status: 'SUCCESS',
            message: 'User added successfully!'
        });
    }catch(error){
        console.log(error);
        res.render('govAdmin', {
            name: username,
            projectId,
            status: 'ERROR',
            message: 'An error occurred while adding user.'
        });
    }

};
