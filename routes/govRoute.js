// Importing Router
const { Router } = require('express');
const { govAdminDashboardPage, govAdminAddUser, govAdminAddUserPage } = require('../controllers/Gov');
const router = Router();



// Routes
router.get('/admin',govAdminDashboardPage);

router.get('/admin/addUser', govAdminAddUserPage);

router.post('/admin/adduser', govAdminAddUser);

module.exports = router;