const express = require("express");
const router = express.Router()

const auth=require('../middleware/auth')

const ownerController=require('../controller/ownerController')

router.get('/', auth.checkSignInforowner, ownerController.renderOwnerpage)
router.get('/userlist', auth.checkSignInforowner, ownerController.userlist)
router.post('/getuserlist', auth.checkSignInforowner, ownerController.getuserlist)
router.post('/approveduser', auth.checkSignInforowner, ownerController.approvedUser)
router.post('/cancelapproved', auth.checkSignInforowner, ownerController.cancelapproved)

module.exports=router;