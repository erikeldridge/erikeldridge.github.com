//
// jsondump - a simple javascript function to dump a pretty printed json object
//
// http://code.google.com/p/jsondump/
//
// usage: 
//   var foo = {a: 1, b: "test", c: {d: true}};
//   jsondump(foo);
//
// Copyright (c) 2008, Doug Martin
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
//
//    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer
//      in the documentation and/or other materials provided with the distribution.
//    * Neither the name of Doug Martin nor the names of its contributors may be used to endorse or promote products derived
//      from this software without specific prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
// LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// (isn't it weird that the license is longer than the code?)
//

function jsondump(o, level) {
	level = level || 0;
	
	var spaces = []
	for (var i=0; i<level; i++)
		spaces.push("  ");
	var indent = spaces.join("");
	
	var items = [];
	for (var i in o) {
		var theType = typeof o[i];
		items.push([indent, "  ", i, ": ", (theType == "object" ? jsondump(o[i], level + 1) : (theType == "string" ? "\"" + o[i].replace(/"/g, "\\\"") + "\"" : value = o[i]))].join(""));
	}
	
	return ["{\n", items.join(",\n"), "\n", indent, "}"].join("");
}


var query = 'SELECT * FROM weather.forecast WHERE location=94089';
var url = "http://query.yahooapis.com/v1/public/yql?" 	
  + "q=" + encodeURIComponent( query )
  + '&format=json'
  + "&callback=callback";

var Y = new YUI();
Y.use('node', function(Y){
    Y.one('button').on('click', function(){
        Y.Get.script(url);
    });
  
});

function callback(response) {
  Y.one('#response').set('innerHTML', jsondump( response.query.results ) );
  sh_highlightDocument();
}