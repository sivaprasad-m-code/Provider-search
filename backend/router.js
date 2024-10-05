const express = require('express');
const router = express.Router();

const controller=require('./controller')

router.post('/add',controller.addProvider)
router.get('/providers',controller.getProviders)




module.exports = router;