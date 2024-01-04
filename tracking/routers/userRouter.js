const express = require("express");
const router = express.Router()

const auth=require('../middleware/auth')

const usercontroller=require('../controller/userController')

router.get('/:userid', auth.checkSignIn, usercontroller.renderHomepge)

module.exports=router;