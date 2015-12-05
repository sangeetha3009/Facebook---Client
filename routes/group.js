var ejs = require("ejs");
var mq_client = require('../rpc/client');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Facebook";

exports.getGroups=function(req,res){
	var searchName;
	searchName=req.session.uname;
	var json_responses;
	var msg_payload = { "searchName":searchName};
	
	mq_client.make_request('getGroups',msg_payload, function(err,results){		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
			
				json_responses={"statusCode":200,"groupList":results.groupList};
				res.send(json_responses);
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Error in creating groups");

			}
		}  
	});	
};


exports.createGroup=function(req,res){
	
	var json_responses;
	var gmem;
	var gname=req.param("gname");
	gmem=req.param("gmem");

	var msg_payload = { "gname": gname, "gmem": gmem,"admin":req.session.uname };
	mq_client.make_request('createGroup',msg_payload, function(err,results){		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				
				json_responses={"statusCode":200,"gname":results.gname};
				res.send(json_responses);
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Error in creating groups");

			}
		}  
	});	
};


exports.deleteGroup=function(req,res){
	
	var json_responses;
	var gmem;
	var gname=req.param("gname");
	

	var msg_payload = { "gname": gname,"admin":req.session.uname };
	mq_client.make_request('deleteGroup',msg_payload, function(err,results){		
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
				console.log("Error in deleting groups");

			}
		}  
	});	
};

exports.addToGroup=function(req,res){
	
	var json_responses;
	var gname=req.param("gname");
	var gmem=req.param("gmem");
	var msg_payload = { "gname": gname, "gmem": gmem,"admin":req.session.uname};
	mq_client.make_request('addToGroup',msg_payload, function(err,results){		
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
				console.log("Error in creating groups");

			}
		}  
	});	
};

exports.deleteFromGroup=function(req,res){
	
	var json_responses;
	var gname=req.param("gname");
	var gmem=req.param("gmem");
	var msg_payload = { "gname": gname, "gmem": gmem,"admin":req.session.uname};
	mq_client.make_request('deleteFromGroup',msg_payload, function(err,results){		
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
				console.log("Error in deleteing memeber from group");

			}
		}  
	});	

	
};

exports.getMembers=function(req,res){
	var json_responses;
	var gname=req.param("gname");
	var msg_payload = { "gname": gname};
	mq_client.make_request('getMembers',msg_payload, function(err,results){		
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				
				json_responses={"statusCode":200,"members":results.members};
				res.send(json_responses);
			}
			else {
				
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Error in retreiving memebers from group");

			}
		}  
	});		
	
};
