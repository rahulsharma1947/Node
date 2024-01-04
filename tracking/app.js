const path =require('path')
const express = require('express')
const hbs =require('express-handlebars')
const router =require('./routers/router')
const userRouter =require('./routers/userRouter')
const adminRouter =require('./routers/adminRouter')
const ownerRouter =require('./routers/ownerRouter')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const port = 8083

const app = express()

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.engine('hbs', hbs({extename: 'hbs', defaultLayout:'layout.hbs', layoutsDis:__dirname+'/nodejs/view/layouts/'}))

app.set("views","views")

app.set("view engine", "hbs")

app.use("/", router)

app.use("/user", userRouter)

app.use("/admin", adminRouter)

app.use("/owner", ownerRouter)


app.use(function(req, res, next){
  	res.status(404).redirect("/404?url="+req.originalUrl);
  	next();
});

// app.get('/about', (req, res, next) => {
//    res.sendFile('about.html',{
//    		root:path.join(__dirname, "../nodejs/public")
//    })
//  })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})