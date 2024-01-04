const express = require("express");
const router = express.Router()

const auth=require('../middleware/auth')

const admincontroller=require('../controller/adminController')

router.get('/:userid', auth.checkSignInforadmin, admincontroller.renderAdminpage)

module.exports=router;