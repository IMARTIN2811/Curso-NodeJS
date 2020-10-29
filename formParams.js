var http = require("http");
    fs = require("fs");

    http.createServer(function(req,res){

        if(req.url.indexOf("favicon.ico") > 0){return;}

        fs.readFile("./formsParams.html", function(err,html){
            var htmlString = html.toString();
            var arregloParametros = [], parametros = {};
            var variables = htmlString.match(/[^\{\}]+(?=\})/g);
            var nombre = "";

            if(req.url.indexOf("?") > 0){
                // /?nombre=Uriel
                var url_data = req.url.split("?");
                var arregloParametros = url_data[1].split("&");
                // [nombre=Uriel,data=algo]
            }

            for (var i = arregloParametros.length - 1; i >=0; i--) {
                var parametro = arregloParametros[i];
                //nombre=Uriel
                var paramData = parametro.split("=");
                //[nombre,Uriel]
                parametros[paramData[0]] = paramData[1];
                //{nombre: Uriel}
            };

            for (var i = variables.length - 1; i >= 0; i--) {
                //[nombre,apellidos]
                var variable = variables[i];
                //parametros[variable]
                //parametros[nombre]
                //var value = eval(variable[i]);
                htmlString = htmlString.replace("{"+variables[i]+"}",parametros[variable]);
            };
            res.writeHead(200,{"Content-Type" : "text/html"});
            res.write(htmlString);
            res.end();
        });
    }).listen(8080);