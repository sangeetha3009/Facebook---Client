/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var bodyParser=require('body-parser');
var session=require('client-sessions');
var signin=require('./routes/signin');
var signup=require('./routes/signup');
var mysql = require('mysql');
var getusers=require('./routes/getusers');
var sessions=require('./routes/session');
var friend=require('./routes/friend');
var group=require('./routes/group');
var app = express();

/*var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Sairam30#",
	database:"test"
	});

	con.connect(function(err){
	if(err){
	 console.log('Error connecting to Db');
	 return;
	}
	console.log('Connection established');
	});

	con.end(function(err) {
	// The connection is terminated gracefully
	// Ensures all previously enqueued queries are still
	// before sending a COM_QUIT packet to the MySQL server.
	});

*/

//URL for the sessions collections in mongoDB
var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");

//app.use(express.cookieParser());
app.use(expressSession({
	secret: 'cmpe273_teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.use(express.favicon());

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/',routes.index);
app.get('/partials/:filename',routes.partials);
app.get('/partials/about/:srch',routes.partials);
app.get('/partials/group/:gr',routes.partials);
app.post('/signin',signin.signin);
app.post('/signup',signup.signup);

app.get('/getusers',getusers.getusers);
app.get('/getSessionData',sessions.getSessionData);
app.post('/isfriend',friend.isfriend);
app.post('/add',friend.add);
app.post('/accept',friend.accept);
app.post('/logout',signin.logout);
app.post('/add_interests',signup.add_interests);
app.post('/add_overview',signup.add_overview);
app.post('/add_work',signup.add_work);
app.post('/add_lives_in',signup.add_lives_in);
app.post('/add_from_place',signup.add_from_place);
app.post('/add_contact',signup.add_contact);
app.post('/add_life',signup.add_life);
app.get('/Newsfeed',signin.redirectToHomepage);
app.get('/fillvalues',signup.fillvalues);
app.post('/fill_abt_page',signup.fill_abt_page);
app.post('/getfriends',friend.getfriends);
app.post('/createGroup',group.createGroup);
app.post('/deleteGroup',group.deleteGroup);
app.post('/getGroups',group.getGroups);
app.post('/addToGroup',group.addToGroup);
app.post('/deleteFromGroup',group.deleteFromGroup);
app.post('/getMembers',group.getMembers);

mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
});
