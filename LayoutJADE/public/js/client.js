//permite conectar el socket y ejecuta la funcion io de la libreria importada
var socket = io();

//Evento para un nuevo mensaje
socket.on("New image",function(data) {
    //convierte el img en JSON
    data = JSON.parse(data);
    console.log(data);
    var container = document.querySelector("#imagenes");
    //accede al contenido del template 
    var source = document.querySelector("#image-template").innerHTML;
    //compila el template
    var template = Handlebars.compile(source);
    //se agrega al contenedor el template ejecutado
    container.innerHTML += template(data)
    //muestra la imagenes en la primera fila
    //container.innerHTML = template(data) + container.innerHTML;
});