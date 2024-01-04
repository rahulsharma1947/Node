exports.renderHomepge=(req, res)=>{
	res.render("index/index",{
		title:'home',
		css:['/css/bootstrap.min.css','/css/cover.css']
	});
}

exports.getdata=(req, res)=>{
	console.log(req);
	//res.send("Your form is submited")
	res.send(`send data ${req.body.name}`)
}