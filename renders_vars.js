var http = require("http");
    fs = require("fs")

    http.createServer(function (req,res){
        fs.readFile("./renders.html", function(err,html){
            //convierte el cod. a string
            var htmlString = html.toString();
            //expresion regular que busca en el html donde haya {}
            var variable = htmlString.match(/[^\{\}]+(?=\})/g);
            var nom = "Israel Martin";

            for (var i = variable.length - 1; i>=0; i--) {
                //lo ejecutamos como codigo de java script para tener valor de dicha variable
                var value = eval(variable[i]);
                //reeemplaza el contenido con llaves por su valor correspondiente
                htmlString =  htmlString.replace("{"+ variable[i]+"}",value)
            }
            res.writeHead(200,{"Content-Type" : "text/html" });
            res.write(htmlString);
            res.end();
        });
    }).listen(8080);