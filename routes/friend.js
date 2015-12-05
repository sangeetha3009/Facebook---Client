var ejs = require("ejs");
var mq_client = require('../rpc/client');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Facebook";

var friends_id=[];
var own_id;
var friends_name=[];

exports.isfriend=function(req,res){
	var output=0;
	var frnd_token=req.param("frnd");
	var msg_payload = { "myName": req.session.uname, "searchName": frnd_token };
	var query_value;
	var json_responses;
	mq_client.make_request('isFriend',msg_payload, function(err,results){		
		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				
				json_responses={"statusCode":200,"q":results.query_value};
				res.send(json_responses);
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Invalid Login");

			}
		}  
	});
	
};



exports.add=function(req,res)
{
	var frnd_token=req.param("val");
	var msg_payload = { "myName": req.session.uname, "searchName": frnd_token };
	var query_value;
	var json_responses;
	mq_client.make_request('addFriend',msg_payload, function(err,results){		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				
				json_responses={"statusCode":200,"m":results.query_value};
				res.send(json_responses);
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Invalid Login");

			}
		}  
	});
	
};



exports.accept=function(req,res){
	var query_value;
	var json_responses;
	var frnd_token=req.param("val");
	var msg_payload = { "myName": req.session.uname, "searchName": frnd_token };
	mq_client.make_request('acceptFriend',msg_payload, function(err,results){		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				
				json_responses={"statusCode":200,"m":results.query_value};
				res.send(json_responses);
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Invalid Login");

			}
		}  
	});	
};




exports.getfriends=function(req,res){
	var json_responses;
	var frnd_token=req.param("val");
	var friendof=req.param("friendof");	
	if (friendof==="session" || friendof=="news" || friendof=="personal_details" || friendof=="")
		friendof=req.session.uname;
	else
		friendof=req.param("friendof");
	var msg_payload = { "searchName": friendof};
	mq_client.make_request('getFriendsList',msg_payload, function(err,results){		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				json_responses={"friends_name":results.friends_name};
				res.send(json_responses);				
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Invalid Login");

			}
		}  
	});	

};


