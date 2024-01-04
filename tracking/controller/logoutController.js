const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
const mysql=require('../lib/dbconnection');
dotenv.config()
exports.logout=(req, res)=>{
	if(req.headers.cookie){
		let token=req.headers.cookie.split("=")[1];
		if(deleteloginrecord(token)){
			res.clearCookie("user_token");
			res.redirect(`/login`);
		}
	}	
}

async function deleteloginrecord(token){
	let sql='DELETE FROM login WHERE token=?';
	let returnvalue;
	let promise = new Promise((resolve, reject) => {
    	mysql.connection.query(sql, [token], function(err, rows){
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
