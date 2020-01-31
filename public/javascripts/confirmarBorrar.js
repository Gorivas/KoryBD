"use strict";


function inicializar(){
    $("#botonBorrar").on( "click", function(event){
        return confirm("El producto se eliminará de la base de datos de forma permanente.");
        
    });
}

$(inicializar);