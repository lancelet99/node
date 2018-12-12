
const express = require("express");

const fs = require("fs");

const hbs = require("hbs");

var app = express();


app.set("view engine","hbs")
// server logger with express middleware
app.use((req,res,next)=>{

	let now = new Date();

	let log=`${now}::${req.method},${req.url} \n`;

	fs.appendFile('server.log',log);

	next();


});

// maintainence mode exploration
app.use((req,res,next)=>{
	res.render('maintainance.hbs');
});


hbs.registerPartials(__dirname+'/views/partials')

hbs.registerHelper("year",()=>{

	return new Date().getFullYear();

});


app.use(express.static(__dirname+'/public'));


// main driver code.
app.get('/',(req,res)=>{

	res.send({

		name :"robert",

		role : "admin",

		uid : "rob12376",

		email : "robertkiyosaki@gmail.com" 

	});

});

app.get("/info",(req,res)=>{

	res.render("info.hbs",{

		username : "robert kiyosaki"
	});
});


app.listen(3000,()=>{
	console.log("server is running on port 3000. Please enjoy the session.");
});