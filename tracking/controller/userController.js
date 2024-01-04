exports.renderHomepge=(req, res)=>{
	res.render("user/index",{
		title:'home',
		userid:req.params.userid,
		css:['../assets/css/bootstrap.css','../assets/css/bootstrap.css','../assets/css/custom.css','../assets/css/font-awesome.css']
	});
}

