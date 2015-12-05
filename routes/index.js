
/*
 * GET home page.
 */

exports.index = function(req, res){
	if(req.session.uname)
		{
		
		res.render('Newsfeed');
		}
	else
		res.render('index', { title: 'Facebook' });
};

//Rendering div elements for the tempelate URL's
exports.partials=function(req,res){
	var filename = req.params.filename;
	console.log('File name is '+filename);
	if(!filename) return;  
	  res.render("partials/" + filename );
	
};