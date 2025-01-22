// Importing Router
const { Router } = require('express');
const { superUserDashboard, superUserAddUserCompanyPage, superUserAddUserGovPage, superUserAddUserCompany, superUserAddUserGov } = require('../controllers/superUser');
const router = Router();


// Routes
router.get('/', superUserDashboard);

router.get('/addUserCompany', superUserAddUserCompanyPage);

router.post('/addUserCompany', superUserAddUserCompany);

router.get('/addUserGov', superUserAddUserGovPage);

router.post('/addUserGov', superUserAddUserGov);

module.exports = router;