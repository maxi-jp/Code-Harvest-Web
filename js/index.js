$(document).ready(function() {

	CrearNoticias ();
	CrearReferencias ();	
	establecerVideo();
	
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
		//PosicionarPie();
		establecerVideo();
		// se ajusta el alto de la ul de las noticias
        SetNewsHeight();
	});
	
});

/* NOTICIAS */

var noticiasAMostrar = 5;
var numClicksMostrarMasN = 1;
var numeroDeNoticias = 0;
function CrearNoticias () {
	
	$.ajax({
		type: "GET",
		url: "./xml/UltimasNoticias.xml",
		dataType: "xml",
		success: function(xml) {
			var i = 0;
			var ultimasNoticias = [];
			
			$(xml).find('noticia').each(function(){
				var fechaT     = $(this).find('fecha').text();
				var imagenT    = $(this).find('imagen').text();
				var tituloT    = $(this).find('titulo').text();
				var subtituloT = $(this).find('subtitulo').text();
				var cuerpoT    = $(this).find('cuerpo');
				var cuerpoT = [];
				
				$(this).find('p').each( function () {
					cuerpoT.push($(this).text());
				});
				
				var noticia = {
					fecha:fechaT,
					imagen:imagenT,
					titulo:tituloT,
					subtitulo:subtituloT,
					cuerpo:cuerpoT
				};
				ultimasNoticias.push(noticia);
				i++;
				numeroDeNoticias++;
			});
			
			// Si hay más de 3 noticias se muestra el "mostrar más"
			if (i > 3)
				$("#MostrarMasNoticias").css("display", "block");
				
			var ultimasNoticiasJSON = $.parseJSON(JSON.stringify(ultimasNoticias));
			i = 0;			
			$.each(ultimasNoticiasJSON, function(arrayID, group) {
				RellenarNoticia(i, ultimasNoticiasJSON[i].fecha, ultimasNoticiasJSON[i].imagen, ultimasNoticiasJSON[i].titulo, ultimasNoticiasJSON[i].subtitulo, ultimasNoticiasJSON[i].cuerpo);
				i++;
			});
			
			setTimeout(function () {
				//PosicionarPie();
				// se ajusta el alto de la ul de las noticias
                SetNewsHeight();
			}
			, 100);
		},
		//other code
		error: function() {
			//alert("No se han podido cargar las últimas noticias.");
			$("#UltimasNoticias > ul").css("display", "none");
			$("#NewsError").css("display", "block");
		}
	});
}

function RellenarNoticia (i, fecha, imagen, titulo, subtitulo, cuerpo) {
    var strFecha = "<div class='fecha_noticia'>" + fecha + "</div>";
    var $divFecha = $(strFecha);

	//var strImagen = "<div class='imagen'> <img src='" + imagen + "'></div>";
    var strBgImg = "background-image: url(\""+ imagen +"\");"
    var strImagen = "<div class='imagen' style='" + strBgImg + "'></div>";
	var $divImagen = $(strImagen);

	var cuerpoP = "";
	var numP = cuerpo.length;
	for (j = 0; j < numP; j++) {
		cuerpoP += "<p>" + cuerpo[j] + "</p>";
	}
	
	if (i < 3) {
		var strTexto = "<div class='texto'><div class='titulo'><h1>" 
						+ titulo + "</h1></div><div class='subtitulo'><p>" 
						+ subtitulo + "</p></div><div style='display:none;' class='cuerpo'>" + cuerpoP + "</div>"
	}
	else {
		var strTexto = "<div class='titulo'><h1>"
						+ titulo + "</h1></div><div class='subtitulo'><p>" 
						+ subtitulo + "</p></div><div style='display:none;' class='cuerpo'>" + cuerpoP + "</div>"
	}
	var $divTexto = $(strTexto);
	
	// Hay que ver si es una noticia a mostrar o una oculta
	if (i == 0)
		var $liNoticia = $("<li class='activa' onclick='DesplegarNoticia(0);'></li>");
	else
		var $liNoticia = $("<li onclick='DesplegarNoticia(" + i + ");'></li>");
	
	if (i >= 3) {
		$liNoticia.hide();
		$divImagen.hide();
		//$liNoticia.css("width", "100%");
        
        // a las noticias pares secundarias se les pone un color de fondo diferente
        if ((i % 2) == 0)
            $liNoticia.addClass("noticias_sec_par");
        else
            $liNoticia.addClass("noticias_sec_impar");
	}
    $divFecha.appendTo($divImagen);
	$divImagen.appendTo($liNoticia);
	$divTexto.appendTo($liNoticia);
    if (i < 3)
        $liNoticia.appendTo("#NoticiasPrincipales");
    else
        $liNoticia.appendTo("#NoticiasSecundarias");
}

function DesplegarNoticia (noticiaId)
{
	var $noticiaSeleccionada = $($("#UltimasNoticias ul li")[noticiaId]);
	
	//var imagenN = "url('" + $noticiaSeleccionada.find("img").attr("src") + "')";
    var imagenN = $noticiaSeleccionada.find(".imagen").css('background-image');
	var tituloN = $noticiaSeleccionada.find(".titulo").text();
	var fechaN  = $noticiaSeleccionada.find(".fecha_noticia").text();
	var cuerpoN = $noticiaSeleccionada.find(".cuerpo").children();
	
    //$liNoticia.appendTo("#NoticiaDesplegada");
	$(".NoticiaDesplegada_Cabecera"                 ).css("background-image", imagenN);
	$(".NoticiaDesplegada_Cabecera > h1"            ).text(tituloN);
	$(".NoticiaDesplegada_Cabecera > fecha_noticia" ).text(fechaN);
	$(".NoticiaDesplegada_Cuerpo p"                 ).remove();
	$(".NoticiaDesplegada_Cuerpo"                   ).append(cuerpoN);
    
	$("#NoticiaDesplegadaBlock").css("display", "block");
	window.location.href="#flagNoticias";
}

function CerrarNoticia () {
    $("#NoticiaDesplegadaBlock").css("display", "none");
}

function MostrarMasNoticias () {
    var numNots = (noticiasAMostrar * numClicksMostrarMasN) + 3;
    numClicksMostrarMasN ++;
    if (numeroDeNoticias <= numNots)
        $("#MostrarMasNoticias").hide();
    $("#UltimasNoticias ul > li").each (function (index, element) {
        if (numNots > index)
            $(element).show();
    });
}
/* FIN NOTICIAS */

/* REFERENCIAS */
var referenciasAMostrar = 5;
var numClicksMostrarMasR = 1;
var numeroDeReferencias = 0;
function CrearReferencias () {
	
	$.ajax({
		type: "GET",
		url: "./xml/Referencias.xml",
		dataType: "xml",
		success: function(xml) {
			var i = 0;
			var ultimasReferencias = [];
			
			$(xml).find('referencia').each(function(){				
				var sitioT  = $(this).find('sitio').text();
				var tituloT      = $(this).find('titulo').text();
				var enlaceT      = $(this).find('enlace').text();
				var referencia = {
					sitio:sitioT,
					titulo:tituloT,
					enlace:enlaceT
				};
				ultimasReferencias.push(referencia);
                i++;
				numeroDeReferencias++;
			});
			
            // Si hay más de 3 referencias se muestra el "mostrar más"
			if (i > 5)
				$("#MostrarMasReferencias").css("display", "block");
                
			var ultimasReferenciasJSON = $.parseJSON(JSON.stringify(ultimasReferencias));
			i = 0;
			$.each(ultimasReferenciasJSON, function(arrayID, group) {
				RellenarReferencia(i, ultimasReferenciasJSON[i].sitio, ultimasReferenciasJSON[i].titulo, ultimasReferenciasJSON[i].enlace);
				i++;
			});
			
			setTimeout(function () {
				//PosicionarPie();
			}
			, 100);
		},
		//other code
		error: function() {
			alert("No se han podido cargar las referencias.");
		}
	});
}

function RellenarReferencia (i, sitio, titulo, enlace) {
    var strEnlace = "<a href='" + enlace + "'></a>";
    var $aEnlace = $(strEnlace);
    
	var strReferencia = "<div class='titulo'><h1>" + sitio + "</h1></div>";
	var $h1Referencia = $(strReferencia);
	
	//var aTitulo = "<a href='" + enlace + "'><div class='subtitulo'><p>" + titulo + "</p></div></a>";
    var aTitulo = "<div class='subtitulo'><p>" + titulo + "</p></div>";
	var $aTitulo = $(aTitulo);
	
	if (i == 0)
		var $liReferencia = $("<li class='activa'></li>");
	else
		var $liReferencia = $("<li></li>");
	
    // a las referencias pares se les pone un color de fondo diferente
    if ((i % 2) == 0)
        $liReferencia.addClass("noticias_sec_par");
    else
        $liReferencia.addClass("noticias_sec_impar");
            
	if (i >= referenciasAMostrar)
		$liReferencia.hide();
	//$h1Referencia.appendTo($liReferencia);
	//$aTitulo.appendTo($liReferencia);
	//$liReferencia.appendTo("#Referencias > ul");
    $h1Referencia.appendTo($aEnlace);
    $aTitulo.appendTo($aEnlace);
    $aEnlace.appendTo($liReferencia);
    $liReferencia.appendTo("#Referencias > ul");
}

function MostrarMasReferencias () {
    numClicksMostrarMasR ++;
    var numRefs = referenciasAMostrar * numClicksMostrarMasR;
    if (numeroDeReferencias <= numRefs)
        $("#MostrarMasReferencias").hide();
    $("#Referencias ul > li").each (function (index, element) {
        if (numRefs > index)
            $(element).show();
    });
}
/* FIN REFERENCIAS */

function establecerVideo () {
	if(window.innerWidth > 880) {
		$("#VideoLogo video").attr("src", "./videos/CH_Intro_1280x720.mp4");
	}
	else if(window.innerWidth > 800) {
		$("#VideoLogo video").attr("src", "./videos/CH_Intro_854x480.mp4");
	}
	else if(window.innerWidth > 660) {
		$("#VideoLogo video").attr("src", "./videos/CH_Intro_800x450.mp4");
	}
	else{
		$("#VideoLogo video").attr("src", "./videos/CH_Intro_640x360.mp4");
	}
}

function SetNewsHeight () {
    //var height = $('#UltimasNoticias > ul > li').css('height');
    //$('#UltimasNoticias > ul').css('height', height);
    
    // se adapta la altura del div .imagen
    var aux2 = /*(4 / 3)*/1.1 * $('#NoticiasPrincipales > li').width();
    $('.imagen').css('height', aux2 + 'px');
    
    // primero se busca el li con el subtítulo mal largo (con el alto más grande) y se pone este alto al ul y a todos los li
    var height = 0;
    $('#NoticiasPrincipales > li').each( function () {
        if (parseInt($(this).css('height')) > height)
            height = parseInt($(this).css('height'));
    } );
    //var height = $('#NoticiasPrincipales > li').css('height');
    $('#NoticiasPrincipales').css('height', height + 'px');
    
    // también se adapta el div .texto para que concida con el de mayor altura
    $('.texto').css('height', '');
    var aux = 0;
    $('#NoticiasPrincipales > li > .texto').each( function () {
        if (parseInt($(this).css('height')) > aux)
            aux = parseInt($(this).css('height'));
    } );
    $('.texto').css('height', aux + 'px');
    
}

function PosicionarPie () {
	$("#UltimasNoticias").css("height", $(".activa").height() + $("#UltimasNoticias ul").position().top + 60);
	$("#Pie").css ("top", $("#Cabecera").height() + $("#Contenedor").height()).show();
}