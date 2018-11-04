var Scanner = new GameScannner;

var Model = new GameModel;
var View = new GameView;
var Control = new GameControl;
var Bot = new GameBot( '○' );
var Bot2 = new GameBot( '×' );


$( document ).ready( () => {
	View.createGameField( Model.gameW, Model.gameH );
	Control.documentLoad();
	Model.documentLoad();

	View.updateCellsForWeightsDisplay();
})

//Keys (it's temporary)
$( document ).keydown( ( e )=>{
	var key = e.keyCode;
	switch( key ){
		case 84: 	//T
			var bl = $( Model.selectedCell ); 
			Scanner.testCell( bl )
		break;
		case 65: 	//A
			var bl = $( Model.selectedCell ); 
			var x = +bl.attr( "index-i" );
			var y = +bl.attr( "index-j" );
			console.dir( Scanner.getAttacks( x, y ) )
		break;
		case 67: 	//C
			console.clear();
		break;
		case 68:
			Bot2.makeMove();
		break;
		case 27:
			View.hideBotSettings();
	}		
})