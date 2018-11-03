var Scanner = new GameScannner;

var Model = new GameModel;
var View = new GameView;
var Control = new GameControl;
var Bot = new GameBot;


$( document ).ready( () => {
	View.createGameField( Model.gameW, Model.gameH );
	Control.documentLoad();
	Model.documentLoad();

	View.updateCellsForWeightsDisplay();
	/*if( Bot.botFig == Model.whoPlays.char )
		Bot.makeMove();*/
})

//Keys (it's temporary)
$( document ).keydown( ( e )=>{
	var key = e.keyCode;
	switch( key ){
		case 84: 	//T

		break;
		case 67: 	//C
			console.clear();
	}		
})