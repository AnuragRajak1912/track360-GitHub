// Importing Router
const { Router } = require('express');
const router = Router();

const { loginPage, login } = require('../controllers/Auth');

// Routes
router.get('/',loginPage );

router.post('/', login);

module.exports = router;
