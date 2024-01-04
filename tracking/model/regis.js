const mysql=require('../lib/dbconnection');
exports.checkuser=async (email)=>{
	let sql='SELECT ID FROM user WHERE email_id="'+email+'"';
	console.log(sql);
	return promise = new Promise((resolve, reject) => {
    	mysql.connection.query(sql, function(err, rows){
    		if (err) {
	            resolve('error')
	        }else{
				if(rows.length>0){
					resolve(false)
				}else{
					resolve(true)
				}
	        }
    	});
	});
}

//SELECT fields FROM table ORDER BY id DESC LIMIT 1;

exports.getlastuserid=async ()=>{
	let sql='SELECT ID FROM user ORDER BY id DESC LIMIT 1';
	console.log(sql);
	return promise = new Promise((resolve, reject) => {
    	mysql.connection.query(sql, function(err, rows){
    		if (err) {
	            resolve('error')
	        }else{
				if(rows.length>0){
					resolve(rows[0].ID)
				}else{
					resolve('norecord')
				}
	        }
    	});
	});
}

exports.insertuser=async (values)=>{
	let insertquery='INSERT INTO user (ID, username, password, role, post, lab_name, email_id, approved, name, mobile_no) VALUES (?,?,?,?,?,?,?,?,?,?)';
	return promise = new Promise((resolve, reject) => {
    	mysql.connection.query(insertquery, values, function(err, rows){
    		if (err) {
    			console.log(err);
	            resolve('error')
	        }else{
				resolve('done')
	        }
    	});
	});
}