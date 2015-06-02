var Profile = require('./profile.js');
var renderer = require('./renderer.js')

function home(request, response){
	if(request.url == '/'){
		response.writeHead(200, {'Content-Type': 'text/plain'});
		renderer.view('header', {}, response);
		renderer.view('search', {}, response);
		renderer.view('footer', {}, response);
		response.end();
	}
};
function user(request, response){
	var username = request.url.replace("/", "")
	if(username.length>0){
		response.writeHead(200, {'Content-Type': 'text/plain'});
		renderer.view('header', {}, response);
		
		//get JSON of username profile from treehouse API
		var studentProfile = new Profile(username);
		studentProfile.on('end', function (profileJSON){
			var values = {
				avatarUrl: profileJSON.gravatar.url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javascriptPoints: profileJSON.points.JavaScript
			}
			renderer.view('profile', values, response);
			renderer.view('footer', {}, response);
			response.end();
		})
	}
};
function error(request, response){
	if(request.url == '/error'){
		response.writeHead(200, {'Content-Type': 'text/plain'});
		rrenderer.view('header', {}, response);

		var studentProfile = new Profile(username);
		studentProfile.on('end', function(error){
			renderer.view('error',   {errorMessage: error.message}, response);
		renderer.view('search', {}, response);
		renderer.view('footer',  {}, response);
		response.end();
		}
	}
};



module.exports.home = home;
module.exports.user = user;
module.exports.error = error;