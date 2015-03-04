// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  // console.log('json is:',json, typeof json);
  //something.search(regex) searches location of regex in something
  var sqOpen=json.search(/\[/);
  if (sqOpen===0){
  	// this is an array.
  	var sqClosed=json.search(/\]/);
  	var inside=json.slice(sqOpen+1,sqClosed);
  	// console.log(sqClosed-sqOpen,json[sqOpen],json[sqClosed]);
  	var done=false;
  	var array=[];
  	while (done===false){
  		console.log('inside',inside);
  		var comma=inside.search(/\,/);
  		console.log('cimma at',comma);
  		if (comma===-1){
  			value = parseInt(inside)===NaN ? inside : parseInt(inside);
  			array.push(value);
  			done=true;
  		}
  		else{
  			var value=inside.slice(0,comma);
  			value = parseInt(value)===NaN ? value : parseInt(value);
  			// console.log(value,inside);
  			array.push(value);
  			inside=inside.slice(comma+1);
  		}

  }
  // console.log( array);
  return array;
  	if (sqClosed-sqOpen===1){
  		return [];
  	}
  	else{
  		return [];
  	}
  }
  
};
