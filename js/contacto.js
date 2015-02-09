$( document ).ready(function() {

	$("#Captcha > label").text("Escriba el texto:");
	/*PosicionarPie();
	$(window).resize(function(){
		PosicionarPie();
	});*/
	
});
function PosicionarPie () {
	var altoPie = (window.innerHeight - 186) + "px";
	$("#Pie").css ("top", altoPie).show();
	
	var altoCont = (window.innerHeight - 80 ) + "px";
	$("#Contenedor").height(altoCont);
}