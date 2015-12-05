var ejs = require("ejs");
var mq_client = require('../rpc/client');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Facebook";

exports.getusers=function(req,res){
	// Get all users from db
	
	var count=0;
	console.log();
	var msg_payload = { "firstname": req.session.uname};		
	mq_client.make_request('userList',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				var json_responses;
				json_responses={"statusCode":200,"list":results.list};
				res.send(json_responses);

			}
			else {
				var json_responses;
				json_responses={"statusCode":401};
				res.send(json_responses);
				console.log("Could Not obtain the user list");

			}
		}  
	});
	
	
};



	
