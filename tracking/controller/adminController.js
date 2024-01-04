exports.renderAdminpage=(req, res)=>{
	res.render("admin/index",{
		title:'home',
		userid:req.params.userid,
		css:['../assets/css/bootstrap.css','../assets/css/bootstrap.css','../assets/css/custom.css','../assets/css/font-awesome.css']
	});
}