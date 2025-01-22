// Importing Schema Model Created By track360 Team
const superUser = require('../models/superUserSchema');
const company = require('../models/companySchema');
const gov = require('../models/govSchema');
const emps = require('../models/empSchema');

// Importing Function Created By track360 Team
const { generateToken } = require('../utility/jwt');
const { empRole } = require('../utility/empRole')

exports.loginPage = (req, res) => {
    res.render('login');
};

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Check for SuperUser
        const user = await superUser.findOne({ email: email });
        if (user) {
            if (user.password === password) {
                const token = generateToken(user.name, 
                                            user.email, 
                                            user._id,
                                            "SuperUser" );
                res.cookie('authToken', token, { httpOnly: true, secure: true });
                return res.json({
                    status: 'Success',
                    redirect: '/superuser',
                    message: 'Login successful'
                });
            } else {
                return res.json({
                    status: 'Error',
                    message: 'Invalid password'
                });
            }
        }

        // Check for Company User
        const companyUser = await company.findOne({ companyAdminEmail: email });
        if (companyUser) {
            if (companyUser.companyAdminPassword === password) {
                const token = generateToken(companyUser.companyAdminName, 
                                            companyUser.companyAdminEmail,
                                            companyUser._id,
                                            "companyAdmin" );
                res.cookie('authToken', token, { httpOnly: true, secure: true });
                return res.json({
                    status: 'Success',
                    redirect: '/company/admin',
                    message: 'Login successful'
                });
            } else {
                return res.json({
                    status: 'Error',
                    message: 'Invalid password'
                });
            }
        }

        // Check for Government User
        const govUser = await gov.findOne({ govAdminEmail: email });
        if (govUser) {
            if (govUser.govAdminPassword === password) {
                const token = generateToken(govUser.govAdminName, 
                                            govUser.govAdminEmail, 
                                            govUser._id,
                                            "GovAdmin" );
                res.cookie('authToken', token, { httpOnly: true, secure: true });
                return res.json({
                    status: 'Success',
                    redirect: '/gov/admin',
                    message: 'Login successful'
                });
            } else {
                return res.json({
                    status: 'Error',
                    message: 'Invalid password'
                });
            }
        }

        // Check for Emp
        const emp = await emps.findOne({empEmail:email});
        if (emp) {
            if (emp.empPassword === password) {
                const ID = emp._id;
                const role = await empRole(ID);
                if(role.status === 'Success'){
                    // console.log(role);
                    const token = generateToken(emp.empName, 
                                                emp.empEmail,
                                                emp._id,
                                                role.role);
                    res.cookie('authToken', token, { httpOnly: true, secure: true });
                    let redirect = '/';
                    // if(role.role==='HR') {
                    //     redirect = `/user/${'HR'}`
                    // }
                    switch (role.role) {
                        case "HR":
                            redirect = `/user/${'HR'}`
                            break;
                    
                        default:
                            break;
                    }
                    return res.json({
                        status: 'Success',
                        redirect: redirect,
                        message: 'Login successful'
                    });
                } else{
                    return res.json({
                        status: 'Error 403',
                        message: 'User found, but lacks the necessary role or authorization to access this resource.',
                    });
                }
                
            } else {
                return res.json({
                    status: 'Error',
                    message: 'Invalid password'
                });
            }
        }
        

        // No user found
        return res.json({
            status: 'Error',
            message: 'No such user exists'
        });

    } catch (error) {
        console.error(error);
        return res.json({
            status: 'Error',
            message: 'An error occurred'
        });
    }
};

exports.logout = (req,res)=>{
    res.clearCookie('authToken');
    res.redirect('/');
}