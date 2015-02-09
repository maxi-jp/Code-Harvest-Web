$( document ).ready(function() {
	
	function PosicionarPie () {
		$("#UltimasNoticias").css("height", $(".activa").height() + $("#UltimasNoticias ul").position().top + 60);
		$("#Pie").css ("top", $("#Cabecera").height() + $("#Contenedor").height());
	}
	
	function RellenarNoticia (i, imagen, titulo, subtitulo) {
		var strImagen = "<div class='imagen'> <img src='" + imagen + "'></div>";
		var $divImagen = $(strImagen);
		
		var strTexto = "<div class='texto'><div class='titulo'><h1>" 
						+ titulo + "</h1></div><div class='subtitulo'><h1>" 
						+ subtitulo + "</h1></div></div>"
		var $divTexto = $(strTexto);
		
		if (i == 0)
			var $liNoticia = $("<li class='activa'></li>");
		else
			var $liNoticia = $("<li></li>");
			
		$divImagen.appendTo($liNoticia);
		$divTexto.appendTo($liNoticia);
		$liNoticia.appendTo("#UltimasNoticias>ul");
	}
	
	
	var novedad1 = {
			imagen:"./img/355x355/PSAwards_355x355.png",
			titulo:"Playstation Awards",
			subtitulo:"¡Estamos en la final!"
		};
	var novedad2 = {
			imagen:"./img/355x355/Sopra_355x355.png",
			titulo:"Ganadores de el 1er Premio Sopra",
			subtitulo:"¡Primera vez que gana un videojuego!"
		}
	var novedad3 = {
			imagen:"./img/355x355/PSAwards_355x355.png",
			titulo:"WAT!",
			subtitulo:"In Gallu we trust... óò"
		}
		
	var ultimasNoticias = [];
	ultimasNoticias.push(novedad1);
	ultimasNoticias.push(novedad2);
	ultimasNoticias.push(novedad3);
	
	var ultimasNoticiasJSON = $.parseJSON(JSON.stringify(ultimasNoticias));
	
	var numeroNovedades = ultimasNoticias.length;
	var i = 0;
	
	setTimeout(function () {
		PosicionarPie();
	}
	, 100);
	
	$.each(ultimasNoticiasJSON, function(arrayID, group) {
		RellenarNoticia(i, ultimasNoticiasJSON[i].imagen, ultimasNoticiasJSON[i].titulo, ultimasNoticiasJSON[i].subtitulo);
		i++;
	});
	
	$("#MasNoticia>img").click (function() {
		
		var i = $( "#UltimasNoticias > ul > li.activa" ).index();
		if (i != -1 && i < 2) {
			i = i + 2;
			$("#UltimasNoticias > ul > li.activa").removeClass('activa');
			var sigNoticia = "#UltimasNoticias > ul > li:nth-child(" + i + ")";
			$(sigNoticia).addClass("activa");
			if (i == 3)
				$(this).attr("src", "./img/icons/icon_right2.png");
			else if (i == 2)
				$("#MenosNoticia>img").attr("src", "./img/icons/icon_left.png");
		}
	});
	
	$("#MenosNoticia>img").click (function() {
		
		var i = $( "#UltimasNoticias > ul > li.activa" ).index();
		if (i != -1 && i > 0) {
			
			$("#UltimasNoticias > ul > li.activa").removeClass('activa');
			var sigNoticia = "#UltimasNoticias > ul > li:nth-child(" + i + ")";
			$(sigNoticia).addClass("activa");
			if (i == 1)
				$(this).attr("src", "./img/icons/icon_left2.png");
			else if (i == 2)
				$("#MasNoticia>img").attr("src", "./img/icons/icon_right.png");
		}
	});
	
	$(window).resize(function(){
		PosicionarPie();
	});
	
});
	
	/*<li>
		<div class="imagen">
			<img src="./img/screenshot01.jpg">
		</div>
		<div class="texto">
			<div class="titulo">
				<h1>Playstation Awards</h1>
			</div>
			<div id="subtitulo">
				<h1>¡Esperando el veredicto!</h1>
			</div>
		</div>
	</li> */
	
	/*$.ajax({
		type: "GET",
		url: "https://www.dropbox.com/s/lyazpxjua0xf8pm/UltimasNovedades.xml?dl=0",
		dataType: "xml",
		success: function(xml) {
			var i = 0;
			var novedadesAMostrar = 4;
			$(xml).find('novedad').each(function(){
				if (i<novedadesAMostrar){
					var imagen    = $(this).find('imagen').text();
					var titulo    = $(this).find('titulo').text();
					var subtitulo = $(this).find('subtitulo').text();
					
					var strImagen = "<div class='imagen'> <img src='" + imagen + "'></div>";
					var $divImagen = $(strImagen);
					
					var strTexto = "<div class='texto'><div class='titulo'><h1>" 
									+ titulo + "</h1></div><div id='subtitulo'><h1>" 
									+ subtitulo + "</h1></div></div>"
					var $divTexto = $(strTexto);
					
					$divTexto.appendTo($divImagen);
					$divImagen.appendTo("#UltimasNovedades>ul");
					
					i++;
				}
			});
		},
		//other code
		error: function() {
			alert("No se han podido cargar las últimas novedades.");
		}
	});*/