// Importing Router
const { Router } = require('express');
const router = Router();

const { logout } = require('../controllers/auth');
// Routes
router.get('/',logout);

module.exports = router;