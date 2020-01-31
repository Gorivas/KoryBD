"use strict";


function inicializar(){
    $("#confirmar").on( "click", function(event){

        let euros = $("#euros").val();
        let centimos = $("#centimos").val();

        let ok= true;
        let error= "";

        if(isNaN(Number(euros))){
            ok = false;
            error = error + "Euros no es un número."
        }
        else{
            if(Number(euros) < 0){
                ok = false;
                error = error + "Euros negativos."
            }
        }
        if(isNaN(Number(centimos))){
            ok = false;
            error = error + " Céntimos no es un número."
        }
        else{
            if(Number(centimos) > 99){
                ok = false;
                error = error + " Demasiados céntimos."
            }
            if(Number(centimos) < 0){
                ok = false;
                error = error + "Céntimos negativos."
            }
        }

        if(!ok){
            alert(error);
            event.preventDefault();
        }
        
    });
}

$(inicializar);