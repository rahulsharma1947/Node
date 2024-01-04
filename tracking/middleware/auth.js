const jwt = require('jsonwebtoken');
const dotenv=require('dotenv')
const mysql=require('../lib/dbconnection');
dotenv.config()
function checkSignIn(req, res, next){
	if(req.headers.cookie && checktokenindb(req, res)){
		jwt.verify(req.headers.cookie.split("=")[1], process.env.KEY, (err, user) => {
	        if (err) {
	        	res.clearCookie("user_token");
	            res.redirect('/login');
	        }
	        if (user.role=='user' && user.userid==req.params.userid){
		        req.user = user;
		        next()
		    }else{
		    	res.redirect('/logout')
		    }
	    });
	}else{
		res.clearCookie("user_token");
		res.redirect('/login')
	}
}

function checkSignInforadmin(req, res, next){
	if(req.headers.cookie && checktokenindb(req, res)){
		jwt.verify(req.headers.cookie.split("=")[1], process.env.KEY, (err, user) => {
	        if (err) {
	        	res.clearCookie("user_token");
	            res.redirect('/login');
	        }
	        if (user.role=='admin' && user.userid==req.params.userid){
		        req.user = user;
		        next()
		    }else{
		    	res.redirect('/logout')
		    }
	    });
	}else{
		res.clearCookie("user_token");
		res.redirect('/login')
	}
}

function checkSignInforowner(req, res, next){
	if(req.headers.cookie && checktokenindb(req, res)){
		jwt.verify(req.headers.cookie.split("=")[1], process.env.KEY, (err, user) => {
	        if (err) {
	        	res.clearCookie("user_token");
	            res.redirect('/login');
	        }
	        if (user.role=='owner'){
		        req.user = user;
		        next()
		    }else{
		    	res.redirect('/logout')
		    }
	    });
	}else{
		res.clearCookie("user_token");
		res.redirect('/login')
	}
}
function checklogin(req, res, next){
	if(req.headers.cookie && checktokenindb(req, res)){
		jwt.verify(req.headers.cookie.split("=")[1], process.env.KEY, (err, user) => {
			console.log(user);
	        if (err || user == 'undefined') {
	        	res.clearCookie("user_token");
	            req.next();
	        }
	        if(!user){
				console.log("hiuwc wwec wk wc wjk");
				res.clearCookie("user_token");
		    	req.next();
			}else if(user.role=='admin'){
        		res.redirect('/admin/'+user.userid);
        	}else if (user.role == 'user'){
        		res.redirect('/user/'+user.userid);
        	}else if(user.role == 'owner'){
        		res.redirect('/owner');
        	}else{
        		res.clearCookie("user_token");
		    	next();
		    }
	    });
	}else{
		res.clearCookie("user_token");
		next();
	}
}

async function checktokenindb(req, res){
	let sql='SELECT * FROM login WHERE token=?';
	let returnvalue;
	let token=req.headers.cookie.split("=")[1];
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
	console.log(returnvalue);
	return returnvalue;
}


exports.checkSignIn=checkSignIn;
exports.checkSignInforadmin=checkSignInforadmin;
exports.checklogin=checklogin;
exports.checkSignInforowner=checkSignInforowner;