function parse(req){
    var arregloParametros = [], parametros = {};   
         
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
        return parametros;       
}
//exporta la funcion parse
module.exports.parse = parse;
