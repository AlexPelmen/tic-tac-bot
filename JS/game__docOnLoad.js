var Scanner = new GameScannner;

var Model = new GameModel;
var View = new GameView;
var Control = new GameControl;



$( document ).ready( () => {
	View.createGameField( Model.gameW, Model.gameH );
	Control.documentLoad();
	Model.documentLoad();
})

//Keys (it's temporary)
$( document ).keydown( ( e )=>{
	var key = e.keyCode;
	switch( key ){
		case 84: 	//T
			Scanner.testCell( $( Model.selectedCell ) );
		break;
		case 67: 	//C
			console.clear();
	}		
})