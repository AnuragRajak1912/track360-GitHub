// Importing Schema Model Created By track360 Team
const emp = require('../models/empSchema');
const gov = require('../models/govSchema');
const project = require('../models/projectSchema');

const {validateToken} = require("../utility/jwt");
const {projectDirectory} = require("../utility/storage");

exports.adminDashboardPage = (req,res)=>{

    const token = req.cookies.authToken;
    if(!token) return res.redirect('/login');

    try{
        const decoded = validateToken(token);
        const username = decoded.name;
        res.render('companyAdminDashboard',{
            name : username,
        });
    }catch(error){
        console.log(error);
        res.redirect('/login');
    }

};

exports.adminAddUserPage = (req,res)=>{

    const token = req.cookies.authToken;
    if(!token) return res.redirect('/login');

    try{
        const decoded = validateToken(token);
        const username = decoded.name;
        res.render('companyAdmin',{
            name : username,
            display : 'Add User',
        });
    }catch(error){
        console.log(error);
        res.redirect('/login');
    }

};

exports.adminAddUser = async (req, res) => {

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
            companyID : decoded.ID
        });

        await newEmpUser.save();

        res.render('companyAdmin', {
            name: username,
            status: 'SUCCESS',
            message: 'User added successfully!',
            display : 'Add User',
        });
    } catch (error) {
        console.log(error)
        res.render('companyAdmin', {
            name: username,
            status: 'ERROR',
            message: 'An error occurred while adding user.',
            display : 'Add User',
        });
    }
};

exports.adminAddProjectPage = (req,res)=>{

    const token = req.cookies.authToken;
    if(!token) return res.redirect('/login');

    try{
        const decoded = validateToken(token);
        const username = decoded.name;
        res.render('companyAdmin',{
            name : username,
            display : 'Add Project',
        });
    }catch(error){
        console.log(error);
        res.redirect('/login');
    }

}

exports.adminAddProject = async (req, res) => {

    const{
        project_name,
        project_description,
        gov_ministry,
        project_startDate,
        project_forcasted_endDate,
        budget_allotted,
        isPrivate,
        PM_email,
        QA_email,
        HR_email,
        FO_email,
        SE_email,
    } = req.body;

    const token = req.cookies.authToken;
    let username = '';

    if (!token) return res.redirect('/login');

    try {

        const decoded = validateToken(token);
        username = decoded.name;
        const companyID = decoded.ID;

        const govUser = await gov.findOne({ govMinistry:gov_ministry });
        const gov_ID = govUser._id;

        const dir_path = projectDirectory(govUser.dirPath,project_name);

        const PM = await emp.find({ empEmail: { $in: PM_email } });
        const QA = await emp.find({ empEmail: { $in: QA_email } });
        const HR = await emp.find({ empEmail: { $in: HR_email } });
        const FO = await emp.find({ empEmail: { $in: FO_email } });
        const SE = await emp.find({ empEmail: { $in: SE_email } });

        const newProject = new project({
            projectName : project_name,
            projectDescription : project_description,
            govMinistry : gov_ministry,
            projectStartDate : project_startDate,
            projectForcastedEndDate : project_forcasted_endDate,
            budgetAllotted : {
                amount : budget_allotted,
                time : Date.now()
            },
            isPrivate : isPrivate === 'true',
            companyID : companyID,
            govID : gov_ID,
            empRoles : {
                PM: PM.map(emp => emp._id),
                QA: QA.map(emp => emp._id),
                HR: HR.map(emp => emp._id),
                FO: FO.map(emp => emp._id),
                SE: SE.map(emp => emp._id)
            },
            dirPath : dir_path 
        });

        await newProject.save();

        res.render('companyAdmin', {
            name: username,
            status: 'SUCCESS',
            message: 'Project added successfully!',
            display : 'Add Project',
        });
    } catch (error) {
        console.log(error)
        res.render('companyAdmin', {
            name: username,
            status: 'ERROR',
            message: 'An error occurred while adding project.',
            display : 'Add Project',
        });
    }

}
