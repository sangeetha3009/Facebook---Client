var ejs = require("ejs");
var mq_client = require('../rpc/client');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Facebook";


exports.signin=function(req,res){
	var count=0;
	var email, password;
	email=req.param("email");
	password=req.param("pwd");
	var json_responses;
	var msg_payload = { "email": email, "password": password };		
	mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				var json_responses;
				json_responses={"statusCode":200};
				req.session.uname=results.session;
				res.send(json_responses);
				

			}
			else {
				var json_responses;
				json_responses={"statusCode":401};
				res.redirect("/");
				console.log("Invalid Login");

			}
		}  
	});
	
};


exports.logout = function(req,res)
{
	
	req.session.destroy();
	res.redirect('/');
};


exports.redirectToHomepage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.uname)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("Newsfeed",{username:req.session.uname});
	}
	else
	{
		res.redirect('/');
	}
};


	
	
	
