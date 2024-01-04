exports.renderRegispage=(req, res)=>{
	res.render("registration/index",{
		layout:"layout.hbs",
		title:"registration",
		css:['/css/bootstrap.min.css','https://use.fontawesome.com/releases/v5.3.1/css/all.css', '/css/registration.css'],
		js:['../assets/js/jquery-1.10.2.js','/js/registration.js']
	});
}

let regisuser=require('../model/regis')
const crypto = require('crypto');
const dotenv=require('dotenv')
dotenv.config()
exports.submitform=(req, res)=>{
	
	let onlyalfaregEx=new RegExp("^[A-Za-z ]{0,}$");
    let onlyalphanum=new RegExp("^[A-Za-z0-9 ]{0,}$");
    var mobileregEx=new RegExp("^[0-9 ]{10,}$");
    let emailregEx= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let regis_auth=require('../auth/regis_auth');
	let regisAuth =new regis_auth();
	let name=req.body.name;
	let email=req.body.email;
	let postname=req.body.postname;
	let labAdress=req.body.labAdress;
	let mobile_no=req.body.mobile_no;
	let password=req.body.password;
	let confirm_password=req.body.confirm_password;
	regisAuth.checkval('checkempty', 'name', name);
	regisAuth.checkval('checkexpression', 'name', name, onlyalfaregEx);
	regisAuth.checkval('checkMaxlength', 'name', name, 50);
	regisAuth.checkval('checkMinlength', 'name', name, 3);
	regisAuth.checkval('checkempty', 'email', email);
	regisAuth.checkval('checkexpression', 'email', email, emailregEx);
	regisAuth.checkval('checkempty', 'postname', postname);
	regisAuth.checkval('checkexpression', 'postname', postname, onlyalphanum);
	regisAuth.checkval('checkMaxlength', 'postname', postname, 100);
	regisAuth.checkval('checkMinlength', 'postname', postname, 2);
	regisAuth.checkval('checkempty', 'labAdress', labAdress);
	regisAuth.checkval('checkexpression', 'labAdress', labAdress, onlyalphanum);
	regisAuth.checkval('checkMaxlength', 'labAdress', labAdress, 450);
	regisAuth.checkval('checkMinlength', 'labAdress', labAdress, 2);
	regisAuth.checkval('checkempty', 'mobile_no', mobile_no);
	regisAuth.checkval('checkexpression', 'mobile_no', mobile_no, mobileregEx);
	regisAuth.checkval('mobilelenght', 'mobile_no', mobile_no);
	regisAuth.checkval('checkempty', 'password', password);
	regisAuth.checkval('checkMinlength', 'password', password, 8);
	regisAuth.checkval('checkMaxlength', 'password', password, 16);
	regisAuth.checkval('checkempty', 'confirm_password', confirm_password);
	regisAuth.checkval('checkMinlength', 'confirm_password', confirm_password, 8);
	regisAuth.checkval('checkMaxlength', 'confirm_password', confirm_password, 16);
	regisAuth.checkval('passmatch', 'confirm_password', password, confirm_password);
	if(regisAuth.geterror().length>0){
		res.render("registration/index",{
			layout:"layout.hbs",
			title:"registration",
			css:['/css/bootstrap.min.css','https://use.fontawesome.com/releases/v5.3.1/css/all.css', '/css/registration.css'],
			js:['../assets/js/jquery-1.10.2.js','/js/registration.js'],
			inputerror:regisAuth.geterror()
		});
	}else{
		regisuser.checkuser(email).then(function(status){
			if(status==='error'){
				res.render("registration/index",{
					layout:"layout.hbs",
					title:"registration",
					css:['/css/bootstrap.min.css','https://use.fontawesome.com/releases/v5.3.1/css/all.css', '/css/registration.css'],
					js:['../assets/js/jquery-1.10.2.js','/js/registration.js'],
					msg:'Something has error Please Try again'
				});

			}else if(status===false){
				res.render("registration/index",{
					layout:"layout.hbs",
					title:"registration",
					css:['/css/bootstrap.min.css','https://use.fontawesome.com/releases/v5.3.1/css/all.css', '/css/registration.css'],
					js:['../assets/js/jquery-1.10.2.js','/js/registration.js'],
					error:'Email id or Moblie No is already register'
				});

			}else if(status===true){
				regisuser.getlastuserid().then(function(id){
					let userid="";
					if(id=='error'){
						res.render("registration/index",{
							layout:"layout.hbs",
							title:"registration",
							css:['/css/bootstrap.min.css','https://use.fontawesome.com/releases/v5.3.1/css/all.css', '/css/registration.css'],
							js:['../assets/js/jquery-1.10.2.js','/js/registration.js'],
							msg:'Something has error Please Try again'
						});
					}else if(id=='norecord'){
						userid=1;
						createuser(userid, req, res);
					}else{
						userid=id;
						createuser(userid, req, res);
					}

				});
			}
		});
	}
	
}


function createuser(userid, req, res){
	let values=[];
	let cipher = crypto.createCipher(process.env.ALGO, process.env.KEY);  
	let encryptedpass = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');
	values.push(userid+1)
	values.push(req.body.email)
	values.push(encryptedpass)
	values.push('user')
	values.push(req.body.postname)
	values.push(req.body.labAdress)
	values.push(req.body.email)
	values.push('false')
	values.push(req.body.name)
	values.push(req.body.mobile_no)
	regisuser.insertuser(values).then(function(status){
		if(status==='error'){
			console.log('jhufjdvnbyubgkjfbui');
			res.render("registration/index",{
				layout:"layout.hbs",
				title:"registration",
				css:['/css/bootstrap.min.css','https://use.fontawesome.com/releases/v5.3.1/css/all.css', '/css/registration.css'],
				js:['../assets/js/jquery-1.10.2.js','/js/registration.js'],
				msg:'Something has error Please Try again'
			});
		}else if(status=='done'){
			res.render("registration/success",{
				layout:"layout.hbs",
				title:"registration successfull",
				css:['/css/bootstrap.min.css','https://use.fontawesome.com/releases/v5.3.1/css/all.css', '/css/registration.css'],
				js:['../assets/js/jquery-1.10.2.js','/js/registration.js'],
				msg:'Yous are successfully registered and Your username is '+req.body.email
			});
		}
	})
}