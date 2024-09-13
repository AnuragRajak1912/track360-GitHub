// Importing Router
const { Router } = require('express');
const router = Router();

// Importing Function Created By track360 Team
const {validateToken} = require('../controllers/jwt')
const {createDirectory} = require('../controllers/storage')

// Importing Schema Model Created By track360 Team
const company = require('../models/companySchema')
const gov = require('../models/govSchema')

// Routes
router.get('/',(req,res)=>{

    const token = req.cookies.authToken;
    
    if(!token) return res.redirect('/login');

    try{
        const decoded = validateToken(token);
        const username = decoded.name;
        res.render('superuserDashboard',{
            name : username
        });
    }
    catch(error){
        console.log(error);
        return res.redirect('/login')
    }

});

router.get('/addUser',(req,res)=>{

    const token = req.cookies.authToken;
    
    if(!token) return res.redirect('/login');

    try{
        const decoded = validateToken(token);
        const username = decoded.name;
        res.render('superuser',{
            name : username
        });
    }
    catch(error){
        console.log(error);
        return res.redirect('/login')
    }

});

router.post('/addUser', async (req, res) => {

    const { 
        company_name, 
        company_address, 
        company_contact_info, 
        company_admin_name, 
        company_admin_email, 
        company_admin_password,
        gov_name,
        gov_contact_info,
        gov_admin_name,
        gov_admin_email,
        gov_admin_password
    } = req.body;
    
    const token = req.cookies.authToken;
    let username = '';

    if (!token) return res.redirect('/login');

    try {
        const decoded = validateToken(token);
        username = decoded.name;
        
        const dirPath = createDirectory(company_name, gov_name);

        const newCompanyUser = new company({
            companyName: company_name,
            companyAddress: company_address,
            companyContactNumber: company_contact_info,
            companyAdminName: company_admin_name,
            companyAdminEmail: company_admin_email,
            companyAdminPassword: company_admin_password,
            dirPath : dirPath
        });

        const newGovUser = new gov({
            govMinistry: gov_name,
            govContactNumber: gov_contact_info,
            govAdminName: gov_admin_name,
            govAdminEmail: gov_admin_email,
            govAdminPassword: gov_admin_password,
            dirPath : dirPath
        });

        await newCompanyUser.save();
        await newGovUser.save();

        res.render('superuser', {
            name: username,
            status: 'SUCCESS',
            message: 'Organizations added successfully!'
        });
    } catch (error) {
        console.log(error)
        res.render('superuser', {
            name: username,
            status: 'ERROR',
            message: 'An error occurred while adding organizations.'
        });
    }
});

module.exports = router;