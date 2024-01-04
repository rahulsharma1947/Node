exports.renderAboutpage=(req, res)=>{
	res.render("about/index",{
		layout:"adminLayout.hbs",
		title:"about",
		Name:"Rahul",
		age:"24"
	});
}
