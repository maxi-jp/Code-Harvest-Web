var Validador = { 

	// ultimo error de validacion
	error: null,

	// validadores; devuelven true si todo bien, y escriben en 'error' si no
	reglas: {
	    ":required": function(val) {
	        var ok = (val !== null && val.length > 0);
	        if ( ! ok) Validador.error = "campo obligatorio";
	        return ok;
	    },
	    ":email": function(val) {
	        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	        var ok = (Validador.reglas[":required"](val) && val.match(re));
	        if ( ! ok) Validador.error = "dirección inválida";
	        return ok;
	    },
	    ":min_length": function(val, args) {        
	        var ok = (Validador.reglas[":required"](val) && val.length >= args[1]);
	        if ( ! ok) Validador.error = "esperaba como mínimo " + args[1] 
	        	+ " caracteres";
            if ( ! ok) Validador.error = "<span class='error_mensaje'>esperaba como mínimo " + args[1] 
	        	+ " caracteres</span>";
	        return ok;
	    },
	},
	
	// valida un campo
	valida: function(campo) {
	    function anota(campo, valido, nota) {
	        $(campo).next(".mensaje_error").remove();
	        if (nota != null) {
	            $(campo).after("<span class='mensaje_error'>" + nota + "</span>");        
	        }
	        $(campo).toggleClass("_val_ok", valido);
	        $(campo).toggleClass("_val_err", !valido);
	        return valido;
	    }
		
		if ($(campo).attr("class") === undefined) {
		   return true;
		}
		
	    var classes = $(campo).attr("class").split(" ");
	    for (var i=0; i<classes.length; i++) {
	        var args = classes[i].split(";");
	        if (args[0] in Validador.reglas &&
	            ! Validador.reglas[args[0]]($(campo).val(), args, campo)) {
	            return anota(campo, false, Validador.error);
	        }
	    }
	    return anota(campo, true, null);
	},
	
	// valida todo un formulario
	validaFormulario: function (formulario) {
	    var errores = 0;
	    $(formulario).find("input,textarea,select").each(function() { 
          try {
			errores += (Validador.valida(this) ? 0 : 1); 
		  } catch (e) {
		    console.log(e);
		    errores ++;
		  }
	    });
	    return errores;
	},

	// asocia el validador a uno o más formularios
	asocia: function (formularios) {
		console.log(formularios);
		$(formularios).each(function() {
			console.log(this);
			$(this).find("input,textarea,select").bind("keyup focus change", function() { 
				Validador.valida(this);
			});
			$(this).submit(function(event) { 
				var errores = Validador.validaFormulario(this);
				if (errores) {
					event.preventDefault();
				}
			});
		});
	}
}

function validateForm(e)
{
	var errores = Validador.validaFormulario(e);
	if (!(window.confirm("Do you want to submit the form? " + errores))) 
     e.returnValue = false; 
}

$(document).ready(function(){
	/*$("form").submit(function(){
		return false;
	});*/
	Validador.asocia("form");
});