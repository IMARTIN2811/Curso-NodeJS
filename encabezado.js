var http = require("http");
    fs = require("fs");

    http.createServer(function(req,res){
        fs.readFile("./header.html",function(err,html){
            //Encabezados y el objeto response
            //recibe metodo writeHead y recibe un parametro status code
            //status code 200: Indica que todo salio bien
            //status code 300: Indica que lo que esta buscando ya se movio
            //status code 400: Indica que no encontro lo que se pidio
            //status code 404: Indica que no se encuentra algo
            //status code 500: Indica un error 
            /*
            res.writeHead(200, { "Content-Type" : "text/html" })
            res.write(html);
            */
            //Mandar respuestas tipo JSON
            res.writeHead(200, { "Content-Type" : "application/json" })
            res.write(JSON.stringify({nombre: "Israel", apellidos: "Martin Hernandez" }))
            res.end();
        });
    }).listen(8080);