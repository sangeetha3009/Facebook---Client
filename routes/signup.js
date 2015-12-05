var ejs = require("ejs");
var mq_client = require('../rpc/client');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/login";

exports.signup=function(req,res){
	
	var count=0;
	var firstname,lastname,email, passowrd;
	firstname=req.param("firstname");
	lastname=req.param("lastname");
	email=req.param("semail");
	password=req.param("newpassword");
	var msg_payload={firstname:req.param("firstname"),lastname:req.param("lastname"),
			email:req.param("semail"),password:req.param("newpassword")};
	
	mq_client.make_request('signup_queue',msg_payload, function(err,results){
		
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

			}
		}  
	});
	
}

exports.add_overview=function(req,res)
{
	var json_responses;
	var msg_payload = { "overview": req.param("overview"),"gname":req.session.uname};
	mq_client.make_request('addOverview',msg_payload, function(err,results){		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				
				json_responses={"statusCode":200};
				res.send(json_responses);
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Error in adding overview details");

			}
		}  
	});
	
	
};

exports.add_work=function(req,res)
{
	
	var json_responses;
	var msg_payload = { "work": req.param("work"),"gname":req.session.uname};
	mq_client.make_request('addWork',msg_payload, function(err,results){		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				
				json_responses={"statusCode":200};
				res.send(json_responses);
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Error in adding work details");

			}
		}  
	});
};

exports.add_interests=function(req,res)
{
	var json_responses;
	var msg_payload = { "interests": req.param("interests"),"gname":req.session.uname};
	mq_client.make_request('addInterests',msg_payload, function(err,results){		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				
				json_responses={"statusCode":200};
				res.send(json_responses);
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Error in adding interests details");

			}
		}  
	});

	
};

exports.add_lives_in=function(req,res)
{
	var json_responses;
	var msg_payload = { "lives_in": req.param("lives_in"),"gname":req.session.uname};
	mq_client.make_request('addLivesIn',msg_payload, function(err,results){		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				
				json_responses={"statusCode":200};
				res.send(json_responses);
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Error in adding lives in details");

			}
		}  
	});
	
};


exports.add_from_place=function(req,res)
{
	var json_responses;
	var msg_payload = { "from_place": req.param("from_place"),"gname":req.session.uname};
	mq_client.make_request('addFromPlace',msg_payload, function(err,results){		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				
				json_responses={"statusCode":200};
				res.send(json_responses);
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Error in adding from_place details");

			}
		}  
	});
	
};

exports.add_contact=function(req,res)
{
	var json_responses;
	var msg_payload = { "contact": req.param("contact"),"gname":req.session.uname};
	mq_client.make_request('addContact',msg_payload, function(err,results){		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				
				json_responses={"statusCode":200};
				res.send(json_responses);
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Error in adding contact details");

			}
		}  
	});
	
};

exports.add_life=function(req,res)
{
	var json_responses;
	var msg_payload = { "life": req.param("life"),"gname":req.session.uname};
	mq_client.make_request('addLife',msg_payload, function(err,results){		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				
				json_responses={"statusCode":200};
				res.send(json_responses);
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Error in adding life details");

			}
		}  
	});
	
};





//To populate values into text fields
exports.fillvalues=function(req,res){
	var json_responses;
	var msg_payload = { "gname": req.session.uname};
	mq_client.make_request('fillValues',msg_payload, function(err,results){		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				
				json_responses={"statusCode":200,"overview":results.overview,
						"work":results.work,"interests":results.interests,
						"lives_in":results.lives_in,"from_place":results.from_place,"contact":results.contact,
						"life":results.life};
				res.send(json_responses);
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Error in retreiving details for personal page");

			}
		}  
	});	
	
};
	
exports.fill_abt_page=function(req,res){
	var user_name=req.param("abt_name");
	if(user_name=="1" || user_name=="news" || user_name=="personal_details" || user_name=="")
		user_name=req.session.uname;	
	else
		user_name=req.param("abt_name");
	var json_responses;
	var msg_payload = { "userName": user_name};
	mq_client.make_request('fillAboutValues',msg_payload, function(err,results){		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				
				json_responses={"statusCode":200,"overview":results.overview,
						"work":results.work,"interests":results.interests,
						"lives_in":results.lives_in,"from_place":results.from_place,"contact":results.contact,
						"life":results.life};
				res.send(json_responses);
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Error in retreiving details for About page");

			}
		}  
	});	
	
};

	
	
	
