var Model = new GameModel;
var View = new GameView;

$( document ).ready( () => {
	View.createGameField( Model.gameW, Model.gameH );
})