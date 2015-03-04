// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  console.log('json is:',json, typeof json);
  //something.search(regex) searches location of regex in something
  var sqOpen=json.search(/\[/);
  if (sqOpen===0){
  	// this is an array.
  	var sqClosed=json.search(/\]/);
  	console.log(sqClosed-sqOpen,json[sqOpen],json[sqClosed]);
  	if (sqClosed-sqOpen===1){
  		return [];
  	}
  	else{
  		return [json.slice(sqOpen,sqClosed)];
  	}
  }
  
};
