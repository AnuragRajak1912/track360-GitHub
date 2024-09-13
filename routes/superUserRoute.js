// Importing Router
const { Router } = require('express');
const { superUserDashboard, superUserAddUserPage, superUserAddUser } = require('../controllers/SuperUser');
const router = Router();


// Routes
router.get('/', superUserDashboard);

router.get('/addUser', superUserAddUserPage);

router.post('/addUser', superUserAddUser);

module.exports = router;