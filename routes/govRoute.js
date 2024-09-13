// Importing Router
const { Router } = require('express');
const { govAdminDashboardPage, govAdminAddUser, govAdminAddUserPage ,govAdminAddUserPageToProject, govAdminAddUserToProject} = require('../controllers/Gov');
const router = Router();



// Routes
router.get('/admin',govAdminDashboardPage);


router.get('/admin/addUser', govAdminAddUserPage);
router.post('/admin/adduser', govAdminAddUser);


router.get('/admin/addUser/project/:id', govAdminAddUserPageToProject);
router.post('/admin/addUser/project/:id', govAdminAddUserToProject);


module.exports = router;