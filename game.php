<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Tic-tac</title>

		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="bootstrap-4.0.0/bootstrap.css" />
		
		<!-- jQuery first, then Tether, then Bootstrap JS. -->
		<script src="JS/jquery.js" ></script>
		<script src="bootstrap-4.0.0/bootstrap.min.js"></script>

		<!--JS-->
		<script src="JS/game__scanners.js" ></script>
		<script src="JS/game__class.js" ></script>
		<script src="JS/game__bot.js" ></script>
		<script src="JS/game__docOnLoad.js" ></script>
        <!-- Styles -->
        <link rel="stylesheet" href="CSS/style.css" />
	</head>
	<body>
		<div class = "menu" >
			<p class = "menu__text" >Ход: </p>
			<div class = "menu__figure figure figure-X" >×</div>
		</div>
		<div id = "gameSelector" ></div>
		<div id = "gameField" ></div>
		
	</body>
