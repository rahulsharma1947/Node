const dotenv=require('dotenv')
dotenv.config()
let mysql = require('mysql')
console.log(process.env.HOST);
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

connection.connect(function(err){
	if (err){
		console.log(err);
	}
	console.log("ok");
});
module.exports.connection=connection;            