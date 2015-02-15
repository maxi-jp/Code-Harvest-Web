$( document ).ready(function() {	
	// Creamos las imágenes
	arrayNombres = new Array();
	arrayNombres[arrayNombres.length] = "Maxi";
	arrayNombres[arrayNombres.length] = "Diego";
	arrayNombres[arrayNombres.length] = "Jaco";
	arrayNombres[arrayNombres.length] = "Dani";
	arrayNombres[arrayNombres.length] = "Javi";
	arrayNombres[arrayNombres.length] = "Guille";
	arrayNombres[arrayNombres.length] = "Fermonas";
	arrayNombres[arrayNombres.length] = "Fermar";
	arrayNombres[arrayNombres.length] = "Vortre";

	// Array de imagenes
	arrayImagenes = new Array();
	
	var aleatorio = Math.trunc(Math.random() * (9 - 1) + 1);
	var num = aleatorio;
	for (aleatorio; aleatorio < 9 + num; aleatorio++){
		CreaImagen(arrayNombres[aleatorio % 9]);
	}
	/*
	CreaImagen("Maxi");
	CreaImagen("Diego");
	CreaImagen("Jaco");
	CreaImagen("Dani");
	CreaImagen("Javi");
	CreaImagen("Guille");
	CreaImagen("Fermonas");
	CreaImagen("Fermar");
	CreaImagen("Vortre");	
	*/
	anchoImagen = arrayImagenes[0].width;
	altoImagen = arrayImagenes[0].height;
	anchoMax = window.innerWidth - anchoImagen;
	altoMax = $("#miCanvas").height() - altoImagen;	
	deltaTime = 1.0 / 60.0;
	nextMovement = 0;
	
	setTimeout(function () {
		//PosicionarPie();
		ColocarImagenesAleatorias();
	}
	, 100);
	
	$(window).resize(function(){
		//PosicionarPie();
		var canvas = document.getElementById('miCanvas');
		canvas.width = window.innerWidth;
		anchoMax = window.innerWidth - anchoImagen;
		altoMax = $("#miCanvas").height() - altoImagen;
		ColocarImagenesAleatorias();
	});
});

function Init () {
	// Se informa al navegador de que se va a hacer una animación
	window.requestAnimationFrame = (function (evt) {
		return window.requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, 17);
			};
	}) ();
	
	var canvas = document.getElementById('miCanvas');
	canvas.width = window.innerWidth;
	if (canvas.getContext) {
		// Se obtiene el contexto 2D del canvas
		context = canvas.getContext('2d');
		CargarImagenes ();
	}
	
}

function CreaImagen (nombre) {
	var srcI = "./img/creadores/"+ nombre + ".jpg";
	var imagen = 
	{
		nombre: nombre,
		src: srcI,
		img: new Image(),
		width: 203,
		height: 186,
		left: 0,
		top: 0,
		velocityX:1, 
		velocityY:1,
		zindex:100,
		Update: function () {
			
			var alfaX = 20;
			var alfaY = 10;
			
			var deltaX = 4;
			var deltaY = 4;
			
			var leftI = this.left;
			var topI  = this.top;
			var velocityX;
			var velocityY;
						
			if (nextMovement <= 0) {	
				var SumaORestaX = Math.random() * (1 - 0) + 0;//Math.floor((Math.random() * leftI + 1) + 0);
				var SumaORestaY = Math.random() * (1 - 0) + 0;//Math.floor((Math.random() * leftI + 1) + 0);

				if (SumaORestaX > 0.5)
					velocityX = deltaX * SumaORestaX;
				else
					velocityX = -deltaX * SumaORestaX;
				
				if (SumaORestaY > 0.5)
					velocityY = deltaY * SumaORestaY;
				else
					velocityY = -deltaY * SumaORestaY;
				
				this.velocityX = velocityX;
				this.velocityY = velocityY;
				
				leftI += velocityX;//Math.floor((Math.random() * leftI + velocityX) + leftI);
				topI += velocityY//Math.floor((Math.random() * topI + velocityY) + topI);

				nextMovement = 6;
			}
			else {
				velocityX = this.velocityX;
				velocityY = this.velocityY;
				leftI += velocityX;
				topI  += velocityY;
			}
			
			// Limites
			if (this.top + alfaY > altoMax && velocityY > 0 || this.top - alfaY < 0 && velocityY < 0)
				this.velocityY = -velocityY;
			
			if (this.left + alfaX > anchoMax && velocityX > 0 || this.left - alfaY < 0 && velocityX < 0)
				this.velocityX = -velocityX;
				
			this.left = leftI;
			this.top  = topI;
		},
		Draw: function () {	
			context.drawImage(this.img, this.left, this.top, this.width, this.height);
		}
	}
	
	arrayImagenes[arrayImagenes.length] = imagen;
}

function ColocarImagenesAleatorias () {

	arrayImagenes.forEach(function( entry ) {
		var left = Math.floor((Math.random() * anchoMax) + 0);
		var top  = Math.floor((Math.random() * altoMax ) + 0);
		var zindex = Math.floor((Math.random() * 1000 ) + 0);
		entry.left = left;
		entry.top =  top;
		entry.zindex =  zindex;
	});
}

function CargarImagenes () {

    arrayImagenes.forEach(function( entry, index) {
		entry.img.src = entry.src;
		entry.img.onload = function () {
			if (index == 8){
				requestAnimationFrame(Loop);
			}
		}
	});
}

function Loop () {
	requestAnimationFrame(Loop);
	Update ();
	Draw ();
}

function Update () {
	arrayImagenes.forEach( function (entry) {	
		nextMovement -= deltaTime;
		entry.Update();		
	});
}

function Draw () {
	context.strokeRect(0, 0, window.innerWidth, 511);
	//context.fillStyle = "#111111";
    context.fillStyle = "#000000";
    context.fillRect(0, 0, window.innerWidth, 511);
	
	arrayImagenes.forEach( function (entry) {
		entry.Draw();
	});
}

function PosicionarPie () {
	$("#Pie").css("top", $("#Cabecera").height() + $("#Contenedor").height()).show();
}