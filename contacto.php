<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es" lang="es">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <meta name="description" content="Hardcore engineers harvesting code for gaming purposes." />
  <title>Code Harvest</title>
  <link href='http://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700' rel='stylesheet' type='text/css'>
  <link rel="shortcut icon" href="img/icon_32.png" type="image/png" />
  <link rel="stylesheet" type="text/css" href="./css/estilos.css"/>
  <link rel="stylesheet" type="text/css" href="./css/estilosResponsivos.css"/>
  <link rel="stylesheet" type="text/css" href="./css/fonts.css"/>
  <link href="./css/hovers/css/hover.css" rel="stylesheet" media="all">
  <!--<link rel="stylesheet" type="text/css" href="./css/animaciones.css"/>-->
  <link rel="stylesheet" type="text/css" href="./js/jquery.lightbox.css"/>
  <script type="text/javascript" src="./js/jquery.min.js"></script>
  <script type="text/javascript" src="./js/jquery.lightbox.js"></script>
  <script type="text/javascript" src="./js/validator.js"></script>
  <script type="text/javascript" src="./js/common.js"></script>
  <script type="text/javascript" src="./js/contacto.js"></script>
  <?php require_once './captcha/securimage.php'; ?>
</head>

<body>

  <div id="Cabecera">
    <a href="./index.html">
      <img id="ImagenCabecera" src="./img/logosenal_sinfondo_icono.ico">
    </a>
    <ul id="ListaCabecera">        
      <li class="celdaCabecera" style="left:20%;">
        <a href="./index.html">
          <span class="tituloCelda">Principal</span>
          <span class="barritaCelda"></span>
        </a>
      </li>
      
      <li class="celdaCabecera" style="left:37%;">
        <a href="./quienes_somos.html">
          <span class="tituloCelda">Quienes somos</span>
          <span class="barritaCelda"></span>
        </a>        
      </li>
      
      <li id="CeldaJuegos" class="celdaCabecera juegos" style="left:63%;">
        <a>
          <span class="tituloCelda">Juegos</span>
          <span class="barritaCelda"></span>
        </a>      
      </li>
      
      <li class="celdaCabecera" style="left:81%;">
        <a href="./contacto.php">
          <span class="tituloCelda">Contacto</span>
          <span class="barritaCelda"></span>
        </a>        
      </li>
    </ul>
    
    <div id="DivJuegos" class="juegos">
      <a href="http://mutantmeatcity.com" target="_blank">
        <img id="JuegoMMC" src="./img/Logo_MutantMeat.png">
      </a>
      <a href="http://www.projectchandra.co.nf" target="_blank">
        <img id="JuegoPC" src="./img/projectchandra_logo.png">
      </a>
    </div>    
  </div>
  
  <div id="Contenedor">

    <div class="ImagenCabecera">
      <img src="./img/LOGO_WEB_CH.jpg"/>
    </div>
    
    <div class="ContainerBlock">
      <div id="TituloUN">
        <h1 class="rotate">Formulario de Contacto</h1>
      </div>
      <div class="FormularioBlock">
      <p>No dude en contactar con nosotros ya sea pa decirnos que somos la caña o para decir que somos horrorosos</p>
      <?php 
		$image = new Securimage();
		if (isset($_POST['email']) && $image->check($_POST['captcha_code']) == true) {
				
			error_reporting(0); 
			$nombre = $_POST['nombre']; 
			$email = $_POST['email']; 
			$telef = $_POST['telef'];
			$asunto = $_POST['asunto'];
			$mensaje = $_POST['mensaje'];

			$header = 'From: ' . "formulario" . "\r\n" .
			  'X-Mailer: PHP/' . phpversion() . "\r\n" . 
			  "Content-Type: text/plain";

			$contacto = "Se ha recibido una consulta a través del formulario de contacto de la página web mueblesestebanmiranda.com :\r\n\n";
			$contacto .= "Nombre: " . $nombre . " \r\n";
			$contacto .= "E-mail: " . $email . " \r\n";
			$contacto .= "Teléfono: " . $telef . " \r\n";
			$contacto .= "Asunto: " . $asunto . " \r\n";
			$contacto .= "Mensaje: " . $mensaje . " \r\n\n";
			$contacto .= "Enviado el " . date('d/m/Y', time()); 

			$para = 'juventudperdia@gmail.com'; 
			$asunto = 'mueblesestebanmiranda.com formulario de contacto'; 

			mail($para, $asunto, utf8_decode($contacto), $header); 
			?>
			<p><strong>Mensaje enviado.</strong></p>
			
		<?php 
		} else {
			if (isset($_POST['email']))
				$_POST['hayCaptcha'] = 'false';
			else
				$_POST['hayCaptcha'] = 'true';
			?>
			<div class="CajaForm">
			  <form action="<?=$_SERVER['PHP_SELF']?>" method="post" class="Formulario" >
				<div>
				  <label>Nombre:</label><input id="nombre" name="nombre" type='text' class=':required' value='<?php if (isset($_POST['nombre'])) echo $_POST['nombre'];?>'>
				</div>
				<div>
				  <label>Email:</label><input id="email" name="email" type="text" class=":email" value='<?php if (isset($_POST['email'])) echo $_POST['email'];?>'/>
				</div>
				<div>
				  <label>Teléfono:</label><input id="telef" name="telef" type="text" class=":telef" value='<?php if (isset($_POST['telef'])) echo $_POST['telef'];?>'/>
				</div>
				<div>
				  <label>Asunto:</label><input id="asunto" name="asunto" type='text' class=':required' value='<?php if (isset($_POST['asunto'])) echo $_POST['asunto'];?>'/>
				</div>
				<div>
				  <label>Mensaje:</label><textarea rows='6' id='mensaje' name='mensaje' type='mensaje' class=':min_length;80'><?php if (isset($_POST['mensaje'])) echo $_POST['mensaje'];?></textarea>
				</div>
				<div id="Captcha">
					<?php echo Securimage::getCaptchaHtml() ?>
				</div>
				<p style="color: red;">
					<strong>
						<?php 
							if (isset($_POST['hayCaptcha']) && $_POST['hayCaptcha'] == 'false') 
								echo "Rellena el Captcha correctamente por favor"
						?>
					</strong>
					</p>
				<div id="botonform">
				  <input type='submit' id='submit' value='Enviar Mensaje'>
				</div>
			  </form>
			</div>
		    <?php
		}
		?>  
      </div>
    </div>

  <div id="Pie">
    <div class="wrapper">
      <a href="https://plus.google.com/u/0/101224919854733628513" target="_blank"  class="icon googleplus" href="#"><span class="CHSocial-googleplus"></span></a>
      <a href="https://www.facebook.com/codeharvest" target="_blank"  class="icon facebook" href="#"><span class="CHSocial-facebook"></span></a>
      <a href="https://twitter.com/Code_Harvest" target="_blank" class="icon twitter" href="#"><span class="CHSocial-twitter"></span></a>
      <!--<a href="https://twitter.com/Code_Harvest" target="_blank"  class="icon linkedin" href="#"><span class="CHSocial-linkedin"></span></a>-->
      <a href="https://www.youtube.com/channel/UCKvQHEDC4r9guyoTN1cYaUA" target="_blank"  class="icon youtube" href="#"><span class="CHSocial-youtube"></span></a>
      <a class="icon email" href="./contacto.php"><span class="CHSocial-email"></span></a> <!-- TODO -->
    </div>
    <div class="Copyright">
      <p>2015 © <span style="color: darkgoldenrod">Code Harvest</span>, All Rights Reserved</p>
    </div>
  </div>
  
</body>
</html>