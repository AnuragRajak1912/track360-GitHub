// Importing Router
const { Router } = require('express');
const router = Router();

// Importing Function Created By track360 Team
const {  adminDashboardPage, adminAddUserPage, adminAddUser, adminAddProjectPage, adminAddProject } = require('../controllers/Company');

// Routes
router.get('/admin',adminDashboardPage);

router.get('/admin/addUser',adminAddUserPage);

router.post('/admin/addUser',adminAddUser );

router.get('/admin/addProject',adminAddProjectPage);

router.post('/admin/addProject', adminAddProject);

module.exports = router;