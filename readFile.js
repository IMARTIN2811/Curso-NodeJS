//se crean los modulos
var http = require("http"),
    //se crea la var fs para comunicar los sistemas de archivos de la computador
    fs = require("fs");

//lee el archivo html, programacion sincrona Forma 1
//var html = fs.readFileSync("./index.html");
/**
//leer el archivo, programacion asincrona Forma 2
fs.readFile("./index.html",function(err,html){
    http.createServer(function(req,res){
        res.write(html);
        res.end();
   }).listen(8080); 
});
 */

//Leer archivo, programacion asincrona Forma 3
//se Ejecuta cada vez que recibe una peticion
http.createServer(function(req,res){
    fs.readFile("./index.html",function(err,html){
        res.write(html);
        res.end();
    });
}).listen(8080);

 /** 
//Programacion sincrona Forma 1
//se pasa la funcion y retorna el puerto a ejecutarse
http.createServer(function(req,res){
    //verifica si lee el archivo y lo muestra en el navegador
    res.write(html);
    res.end();
}).listen(8080);
*/