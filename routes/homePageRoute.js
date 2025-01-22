const { Router } = require('express');
const router = Router();

const { homePage } = require('../controllers/homePage');

router.get('/',homePage);

module.exports = router;