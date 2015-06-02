//function that handles reading of files
//and merging in files values into the string that gets displayed
var fs = require('fs');

function mergeValues(values, content){
	for(var key in values){
		content = content.replace('{{'+ key +'}}', values[key])
	}
	return content
}

function view(templetName, values, response){
	//read from template files
	var fileContents = fs.readFileSync('./views/'+templateName+'.html', {encoding: 'utf8'})
	//insert values into html content
	fileContents = mergeValues(values, fileContents)
	response.write(fileContents);
	})
}



module.exports.view = view;