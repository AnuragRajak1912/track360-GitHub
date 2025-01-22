// Importing Router
const { Router } = require('express');
const router = Router();

const { loginPage, login } = require('../controllers/auth');

// Routes
router.get('/',loginPage );

router.post('/', login);

module.exports = router;
