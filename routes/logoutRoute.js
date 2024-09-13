// Importing Router
const { Router } = require('express');
const router = Router();

// Routes
router.get('/',(req,res)=>{
    res.clearCookie('authToken');
    res.redirect('/');
})

module.exports = router;