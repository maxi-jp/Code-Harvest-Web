$( document ).ready(function() {
	
	$( ".juegos" ).hover(
		function() {
			if ($("#DivJuegos.activo").length == 0) {
				$("#DivJuegos").addClass("activo");
				$("#CeldaJuegos").addClass("activo");
			}
		},
		function() {
			setTimeout( function () 
			{
				if ($("#DivJuegos.activo").length > 0 && !$("#DivJuegos").is(':hover') && !$("#CeldaJuegos").is(':hover')) {
					$("#DivJuegos").removeClass("activo");
					$("#CeldaJuegos").removeClass("activo");
				}
			}, 10);
		}
	);
	
	$(window).resize(function(){

	});
	
});