// Importing Router
const { Router } = require('express');
const { govAdminDashboardPage, govAdminAddUser, govAdminAddUserPage ,govAdminAddUserToProjectPage, govAdminAddUserToProject} = require('../controllers/gov');
const router = Router();



// Routes
router.get('/admin',govAdminDashboardPage);


router.get('/admin/addUser', govAdminAddUserPage);
router.post('/admin/adduser', govAdminAddUser);


router.get('/admin/addUser/project/:id', govAdminAddUserToProjectPage);
router.post('/admin/addUser/project/:id', govAdminAddUserToProject);


module.exports = router;