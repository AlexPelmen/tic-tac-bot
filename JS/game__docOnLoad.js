var Model = new GameModel;
var View = new GameView;
var Control = new GameControl;

$( document ).ready( () => {
	View.createGameField( Model.gameW, Model.gameH );
	Control.documentLoad();
	Model.documentLoad();
})