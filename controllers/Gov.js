// Importing Function Created By track360 Team
const {validateToken} = require('../utility/jwt');

// Importing Schema Model Created By track360 Team
const emp = require('../models/empSchema');

exports.govAdminDashboardPage = (req,res)=>{

    const token = req.cookies.authToken;
    if(!token) return res.redirect('/login');

    try{
        const decoded = validateToken(token);
        const username = decoded.name;
        res.render('govAdminDashboard',{
            name : username
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