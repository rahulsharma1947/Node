const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mysql=require('../lib/dbconnection');
const dotenv=require('dotenv')
dotenv.config()
exports.renderLoginpage=(req, res)=>{
	res.render("login/index",{
		layout:"layout.hbs",
		title:"login",
		css:['/css/bootstrap.min.css','https://use.fontawesome.com/releases/v5.3.1/css/all.css', '/css/login.css']
	});
}

exports.formSubmit= (req, res)=>{
	let payload = {
		username:req.body.uname,
		role:'user'
	}
	let cipher = crypto.createCipher(process.env.ALGO, process.env.KEY);  
	let encryptedpass = cipher.update(req.body.psw, 'utf8', 'hex') + cipher.final('hex');
	let sql = 'SELECT * FROM user WHERE username = ? AND password=?';
	try{
		console.log(encryptedpass);
		mysql.connection.query(sql, [req.body.uname, encryptedpass], function(err, rows){
			if (err){
				//throw err;
				//console.log(err);
				res.redirect('/404');
			}
			console.log(rows.length);
			if(rows.length>0){
				var string=JSON.stringify(rows);
				var json =  JSON.parse(string);
				if(json[0].approved=='true'){
					payload.userid=json[0].ID;
					payload.role=json[0].role;
					let token = jwt.sign(payload, process.env.KEY, { expiresIn: '1h' });
					let sqlquery="INSERT INTO login (id, token) VALUES (?,?)";
					if(!deleteloginrecord(json[0].ID)){
						res.send("Somethings is wrong");
					}
					mysql.connection.query(sqlquery, [json[0].ID, token], function(err, info){
						if (err){
							//throw err;
							console.log(err);
							res.redirect('/404');
						}
						res.cookie('user_token', token, { expiresIn: '1h', httpOnly: true, sameSite: true });
						if(json[0].role==="owner"){
							res.redirect('/owner');
						}
						else if(json[0].role==="admin"){
							res.redirect('/admin/'+json[0].ID);
						}else if(json[0].role==="user"){
							res.redirect('/user/'+json[0].ID);
						}
					})
				}else{
					res.render("login/index",{
						layout:"layout.hbs",
						title:"login",
						css:['/css/bootstrap.min.css','https://use.fontawesome.com/releases/v5.3.1/css/all.css', '/css/login.css'],
						error:['username and password are not approved by admins']
					});
				}
			}else{
				res.render("login/index",{
					layout:"layout.hbs",
					title:"login",
					css:['/css/bootstrap.min.css','https://use.fontawesome.com/releases/v5.3.1/css/all.css', '/css/login.css'],
					error:['username and password are wrong']
				});
			}
			
		});			
	}catch (error) {
		console.log(error);
		res.redirect('/404')
    }
}

async function deleteloginrecord(id){
	let sql='DELETE FROM login WHERE id=?';
	let returnvalue;
	let promise = new Promise((resolve, reject) => {
    	mysql.connection.query(sql, [id], function(err, rows){
    		if (err) {
	            returnvalue=false;
	            resolve("done!")
	        }else{
	        	//console.log(rows.length);
				if(rows.length>0){
					returnvalue=true;
					resolve("done!")
				}else{
					returnvalue=false;
					resolve("done!")
				}
	        }
    	});
	});

	let result = await promise; // wait until the promise resolves (*)
	//console.log(returnvalue);
	return returnvalue;
}
