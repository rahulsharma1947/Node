var userlist=require('../model/user');
exports.renderOwnerpage=(req, res)=>{
	res.render("owner/index",{
		title:'home',
		css:['../assets/css/bootstrap.css','../assets/css/bootstrap.css','../assets/css/custom.css','../assets/css/font-awesome.css']
	});
}
exports.userlist=(req, res)=>{
	res.render("owner/userlist",{
		title:'create user',
		userid:req.params.userid,
		css:['../assets/css/bootstrap.css','../assets/css/bootstrap.css','../assets/css/custom.css','../assets/css/font-awesome.css','../assets/js/dataTables/dataTables.bootstrap.css'],
		js:['../assets/js/jquery-1.10.2.js','../assets/js/bootstrap.min.js','../assets/js/jquery.metisMenu.js','../assets/js/dataTables/jquery.dataTables.js', '../assets/js/dataTables/dataTables.bootstrap.js','../js/userlist.js']
	});
}

exports.getuserlist=(req, res)=>{
	userlist.getuser().then(data=>{
		res.json({"result":data});
	});
	
}

exports.approvedUser=(req, res)=>{
	userlist.approvedUser(req.body.userid).then(data=>{
		res.json({"result":data});
	});
}

exports.cancelapproved=(req, res)=>{
	userlist.cancelapproved(req.body.userid).then(data=>{
		res.json({"result":data});
	});
}