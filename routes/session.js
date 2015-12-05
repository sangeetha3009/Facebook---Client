exports.getSessionData = function(req, res) {

	var json_response;

	if (typeof req.session.uname !== 'undefined') {

		json_response = {
			"statusCode" : 200,
			"name":req.session.uname
		};
		
		
	} else {
		json_response = {
			"statusCode" : 401
		};
		
	}
	console.log("In getsession data"+json_response);
	
	res.send(json_response);
};

