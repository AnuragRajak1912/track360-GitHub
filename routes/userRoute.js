const { Router } = require('express');
const router = Router();

const { HRpage,HRpageAddUserToProject } = require('../controllers/user')

router.get('/HR',HRpage);

router.post('/HR/:id',HRpageAddUserToProject);

module.exports = router;