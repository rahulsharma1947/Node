const express = require("express");
const router = express.Router()

const homecontroller=require('../controller/homeController')
const aboutcontroller=require('../controller/aboutController')
const logincontroller=require('../controller/loginController')
const logoutcontroller=require('../controller/logoutController')
const registrationcontroller=require('../controller/registration')
const auth=require('../middleware/auth')


router.get('/', homecontroller.renderHomepge)
router.post('/', homecontroller.getdata)
router.get('/about', aboutcontroller.renderAboutpage)
router.get('/login', auth.checklogin, logincontroller.renderLoginpage)
router.post('/login', logincontroller.formSubmit)
router.all('/logout', logoutcontroller.logout)
router.get('/registration', auth.checklogin, registrationcontroller.renderRegispage)
router.post('/registration', auth.checklogin, registrationcontroller.submitform)

router.get('/404', (req, res) => {	
   res.render('404/index',{
		title:"404",
		css:['/css/bootstrap.min.css']
	});
})

module.exports=router;