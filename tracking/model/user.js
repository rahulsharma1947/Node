const mysql=require('../lib/dbconnection');
exports.getuser=async ()=>{
	let sql='SELECT ID, name, username, mobile_no, post, lab_name, role, created_date, approved FROM user WHERE role="admin" OR role="user"';
	return promise = new Promise((resolve, reject) => {
    	mysql.connection.query(sql, function(err, rows){
    		if (err) {
	            resolve([])
	        }else{
				if(rows.length>0){
					resolve(rows)
				}else{
					resolve([])
				}
	        }
    	});
	});
}

exports.approvedUser=async (userid)=>{
	let sql='UPDATE user SET approved="true" WHERE ID='+userid;
	return promise = new Promise((resolve, reject) => {
    	mysql.connection.query(sql, function(err, rows){
    		if (err) {
	            resolve("notdone")
	        }else{
				resolve("done")
	        }
    	});
	});
}

exports.cancelapproved=async (userid)=>{
	console.log(userid);
	let sql='UPDATE user SET approved="false" WHERE ID='+userid;
	return promise = new Promise((resolve, reject) => {
    	mysql.connection.query(sql, function(err, rows){
    		if (err) {
	            resolve("notdone")
	        }else{
				resolve("done")
	        }
    	});
	});
}