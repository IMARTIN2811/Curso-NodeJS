var http = require("http");
    fs = require("fs"),
    //se importa el script Exports.js
    parser = require("./Exports.js");
    var p = parser.parse;

    http.createServer(function(req,res){

        if(req.url.indexOf("favicon.ico") > 0){return;}

        fs.readFile("./Parametros.html", function(err,html){
            var htmlString = html.toString();
            var arregloParametros = [], parametros = {};
            var variables =  htmlString.match(/[^\{\}]+(?=\})/g);
            var nombre = "";
            var parametros = p(req);

            for (var i= variables.length - 1; i >=0; i--) {
                var variable = variables[i];
                htmlString = htmlString.replace("{"+variables[i]+"}",parametros[variable]);  
            };
            res.writeHead(200,{"Content-Type" : "text/html"});
            res.write(htmlString);
            res.end();
        });
    }).listen(8080);